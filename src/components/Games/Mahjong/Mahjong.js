import React, { useState, useEffect } from "react"
import { Container, Row, Col, ListGroup, Modal, Button } from "react-bootstrap"
import { useSpring, animated as a } from "react-spring"
import "./Mahjong.css"
import { saveScore, getPersonalScores, getAllScores } from "../../../api/mahjong"

export default function Mahjong() {

  const [personalScores, setPersonalScores] = useState([])
  const [allScores, setAllScores] = useState([])
  const [options, setOptions] = useState(null)

  let listItemColors = ["primary","success","warning","info","danger"]

  const listPersonalScores = personalScores.slice(0,5).map((element, index) =>
    <ListGroup.Item variant={listItemColors[index] || "dark"}>#{index+1} &nbsp; &nbsp; &nbsp; {element.time} seconds</ListGroup.Item>
  )

  const listAllScores = allScores.slice(0,5).map((element, index) =>
    <ListGroup.Item variant={listItemColors[index] || "dark"}>#{index+1} {element.user[0].username} | {element.time} seconds</ListGroup.Item>
  )

  useEffect(async () => {
    setOptions(12)

    setPersonalScores(await getPersonalScores(localStorage.getItem("token")))
    setAllScores(await getAllScores())
  },[])

  return (
    <div>
      <Container>
        <Row style={{marginTop:"10px"}}>
          <h5 id="timerel" style={{marginLeft:"40px"}}>Geçen Süre : 00:01</h5>
        </Row>
        <Row>
          <Col style={{marginTop:"5px"}}>
              {options ? (
                <MemoryGame
                  options={options}
                  setOptions={setOptions}
                />
              ) : (
                <h2>Yükleniyor</h2>
              )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 style={{textAlign:"center"}}>Personal Records</h5>
            <ListGroup>
              {listPersonalScores}
            </ListGroup>
          </Col>
          <Col>
            <h5 style={{textAlign:"center"}}>General Ranking</h5>
            <ListGroup>
              {listAllScores}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

function MemoryGame({options, setOptions, highScore, setHighScore}) {
  const [game, setGame] = useState([])
  const [flippedCount, setFlippedCount] = useState(0)
  const [flippedIndexes, setFlippedIndexes] = useState([])
  const [modalVisibility, setModalVisibility] = useState(false)
  const [time, setTime] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  function gameOver(){
    const promise = new Promise((resolve, reject) => {
        setTime(minute * 60 + second)
        let _time = (minute * 60 + second)
        console.log(_time)
        // servisle bilgileri gönder
        saveScore(_time, localStorage.getItem("token"))
        resolve("score saved")
    })

    promise.then(() => {
        setModalVisibility(true)
    })
}

  window.onload = function () {
    var twominutes = 0
    var x = document.querySelector("#timerel")
    startTimer(twominutes,x)
}

  function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds

    function timer() {
      diff = duration + (((Date.now() - start) / 1000) | 0)
      minutes = (diff / 60) | 0
      seconds = (diff % 60) | 0
      minutes = minutes < 10 ? "0" + minutes : minutes
      seconds = seconds < 10 ? "0" + seconds : seconds
      display.textContent = "The Passing Time: " + minutes + ":" + seconds

      setMinute(minutes)
      setSecond(seconds)
    }
    timer()
    setInterval(timer,1000)
}

  const colors = [
    '#ecdb54',
    '#e34132',
    '#6ca0dc',
    '#944743',
    '#dbb2d1',
    '#ec9787',
    '#00a68c',
    '#645394',
    '#6c4f3d',
    '#ebe1df',
    '#bc6ca7',
    '#bfd833',
  ]

  useEffect(() => {
    const newGame = []
    for (let i = 0; i < options / 2; i++) {
      const firstOption = {
        id: 2 * i,
        colorId: i,
        color: colors[i],
        flipped: false,
      }
      const secondOption = {
        id: 2 * i + 1,
        colorId: i,
        color: colors[i],
        flipped: false,
      }

      newGame.push(firstOption)
      newGame.push(secondOption)
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5)
    setGame(shuffledGame)
  }, [])

  useEffect(() => {
    const finished = !game.some(card => !card.flipped)
    if (finished && game.length > 0) {
      setTimeout(() => {
        const bestPossible = game.length
        let multiplier
  
        if (options === 12) {
          multiplier = 5
        } else if (options === 18) {
          multiplier = 2.5
        } else if (options === 24) {
          multiplier = 1
        }
  
        const pointsLost = multiplier * (0.66 * flippedCount - bestPossible)
  
        let score
        if (pointsLost < 100) {
          score = 100 - pointsLost
        } else {
          score = 0
        }
  
        if (score > highScore) {
          setHighScore(score)
          const json = JSON.stringify(score)
          localStorage.setItem('memorygamehighscore', json)
        }
  
        const newGame = 'You Win!, SCORE: ' + score + ' New Game?'
        if (newGame) {
          // oyun bitti
          gameOver()
        } else {
          setOptions(null)
        }
      }, 500)
    }
  }, [game])

  if (flippedIndexes.length === 2) {
    const match = game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId

  if (match) {
    const newGame = [...game]
    newGame[flippedIndexes[0]].flipped = true
    newGame[flippedIndexes[1]].flipped = true
    setGame(newGame)

    const newIndexes = [...flippedIndexes]
    newIndexes.push(false)
    setFlippedIndexes(newIndexes)
  } else {
    const newIndexes = [...flippedIndexes]
    newIndexes.push(true)
    setFlippedIndexes(newIndexes)
  }
  }

  if (game.length === 0) return <div>loading...</div>
  else {
    return (
      <div id="cardsz">
        {game.map((card, index) => (
          <div className="cardz" key={index}>
            <Card
              id={index}
              color={card.color}
              game={game}
              flippedCount={flippedCount}
              setFlippedCount={setFlippedCount}
              flippedIndexes={flippedIndexes}
              setFlippedIndexes={setFlippedIndexes}
            />
          </div>
        ))}
        <Modal show={modalVisibility} centered>
                <Modal.Header style={{justifyContent:"center"}}>
                    <h4>Congratulations!</h4>
                </Modal.Header>
                <Modal.Body>
                    <h5>The Passing Time: {time}</h5>
                    <Button onClick={() => window.location.reload()} variant="success" block>
                      Play Again
                    </Button>
                    <Button onClick={() => window.history.back()} variant="secondary" block>
                      Return to Games Page
                    </Button>
                </Modal.Body>
      </Modal>
      </div>
    )
  }
}

function Card({
  id,
  color,
  game,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
}) {
  const [flipped, set] = useState(false)
  const {transform, opacity} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  })

  useEffect(() => {
  if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
    setTimeout(() => {
      set(state => !state)
      setFlippedCount(flippedCount + 1)
      setFlippedIndexes([])
    }, 1000)
  } else if (flippedIndexes[2] === false && id === 0) {
    setFlippedCount(flippedCount + 1)
    setFlippedIndexes([])
  }
}, [flippedIndexes])

  const onCardClick = () => {
    if (!game[id].flipped && flippedCount % 3 === 0) {
      set(state => !state)
      setFlippedCount(flippedCount + 1)
      const newIndexes = [...flippedIndexes]
      newIndexes.push(id)
      setFlippedIndexes(newIndexes)
    } else if (
      flippedCount % 3 === 1 &&
      !game[id].flipped &&
      flippedIndexes.indexOf(id) < 0
    ) {
      set(state => !state)
      setFlippedCount(flippedCount + 1)
      const newIndexes = [...flippedIndexes]
      newIndexes.push(id)
      setFlippedIndexes(newIndexes)
    }
  }

  return (
    <div onClick={onCardClick}>
      <a.div
        className="c back"
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      />
      <a.div
        className="c front"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          background: color,
        }}
      />
    </div>
  )
}
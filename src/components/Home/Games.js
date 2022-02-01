import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import Calculator from "../../images/gameLogos/calculator.png"
import Mahjong from "../../images/gameLogos/mahjong.png"
import Maze from "../../images/gameLogos/maze.png"
import Seven from "../../images/gameLogos/seven.png"
import Lion from "../../images/gameLogos/lion.png"

export default function Games() {
    return (
        <div>
            <h1 class="display-4" style={{textAlign:"center",padding:"20px"}}>Games</h1>
            <CardGroup>
                <Card style={{cursor:"pointer"}} onClick={() => window.location.href="/home/math"}>
                    <Card.Img style={{padding:"50px"}} variant="top" src={Calculator} />
                    <Card.Body>
                        <Card.Title>Math Master</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{cursor:"pointer"}} onClick={() => window.location.href="/home/maze"}>
                    <Card.Img style={{padding:"50px"}} variant="top" src={Maze} />
                    <Card.Body>
                        <Card.Title>Escape From The Maze</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{cursor:"pointer"}} onClick={() => window.location.href="/home/mahjong"}>
                    <Card.Img style={{padding:"50px"}} variant="top" src={Mahjong} />
                    <Card.Body>
                        <Card.Title>Match The Cards</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{cursor:"pointer"}} onClick={() => window.location.href="/home/seven"}>
                    <Card.Img style={{padding:"50px"}} variant="top" src={Seven} />
                    <Card.Body>
                        <Card.Title>Find The Seven Differences</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{cursor:"pointer"}} onClick={() => window.location.href="/home/voice"}>
                    <Card.Img style={{padding:"50px"}} variant="top" src={Lion} />
                    <Card.Body>
                        <Card.Title>Recognize Sounds</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    )
}
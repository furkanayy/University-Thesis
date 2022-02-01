import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from "../components/Home/Navbar"
import Games from "../components/Home/Games"
import MathGame from "../components/Games/Math/Math"
import MazeGame from "../components/Games/Maze/Maze"
import MahjongGame from "../components/Games/Mahjong/Mahjong"
import SevenGame from "../components/Games/Seven/Seven"
import VoiceGame from "../components/Games/Voice/Voice"
import Profile from "../components/Home/Profile"
import About from "../components/Home/About"
import Error from "../pages/Error"

export default function Home() {
    return (
            <div>
                <Navbar/>
                <Switch>
                    <Route exact path="/home" component={Games} />
                    <Route path="/home/math" component={MathGame} />
                    <Route path="/home/maze" component={MazeGame} />
                    <Route path="/home/mahjong" component={MahjongGame} />
                    <Route path="/home/seven" component={SevenGame} />
                    <Route path="/home/voice" component={VoiceGame} />
                    <Route path="/home/profile" component={Profile} />
                    <Route path="/home/about" component={About} />
                    <Route path="*" component={Error} />
                </Switch>
            </div>
    )
}
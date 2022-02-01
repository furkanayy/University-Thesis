import React, { useState, useEffect } from 'react'
import { Carousel } from "react-bootstrap"
import Woods from "../../images/carouselImages/woods.jpg"
import Blue from "../../images/carouselImages/white.jpg"
import Orange from "../../images/carouselImages/orange.jpg"


export default function Carousello() {

    const [carouselHeight, setCarouselHeight] = useState("100vh")

    useEffect(() => {
        var devicePX = document.getElementById("appo").offsetHeight
        var navbarPX = document.getElementById("navbarro").offsetHeight
        var rate = 100 / devicePX
        var navbarVH = navbarPX * rate
        var carouselVH = 100 - navbarVH
        setCarouselHeight(carouselVH+"vh")
    },[])

    return (
        <div id="carousello">
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img
                        style={{height:carouselHeight}}
                        className="d-block w-100"
                        src={Woods}
                        alt="First slide"
                    />
                    <Carousel.Caption className="d-flex h-100 align-items-center justify-content-center">
                        <h3 style={{color:"black",fontFamily:"revert",fontWeight:"bold"}}>
                            Feel the Development of Intelligence at the Top!
                        </h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        style={{height:carouselHeight}}
                        className="d-block w-100"
                        src={Blue}
                        alt="Third slide"
                    />
                    <Carousel.Caption className="d-flex h-100 align-items-center justify-content-center">
                        <h3 style={{color:"black",fontFamily:"revert",fontWeight:"bold"}}>
                            Minimize Distraction!
                        </h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{height:carouselHeight}}
                        className="d-block w-100"
                        src={Orange}
                        alt="Third slide"
                    />
                    <Carousel.Caption className="d-flex h-100 align-items-center justify-content-center">
                        <h3 style={{color:"white",fontFamily:"revert",fontWeight:"bold"}}>
                            Reach the Limits of Your Imagination!
                        </h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
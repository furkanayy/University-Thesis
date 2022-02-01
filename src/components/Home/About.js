import React from 'react'
import { Image, Row } from "react-bootstrap"

export default function About() {
    return (
        <div>
            <h1 style={{textAlign:"center",padding:10,fontFamily:"cursive"}}>Who are we ? What are we aiming ?</h1>
            <Row>
            <Image width="420" roundedCircle style={{margin:"auto", display:"block"}} src="https://www.workingmother.com/sites/workingmother.com/files/styles/655_1x_/public/images/2017/11/little_girl_education.jpg?itok=EGIyuLMe&fc=50,50" />
            <Image width="420" roundedCircle style={{margin:"auto", display:"block"}} src="https://thehappyviolinist.com/wp-content/uploads/2017/06/mi21042-kids-electronic-violin-PRODUCT-b.jpg" />

            </Row>
            <p style={{padding:30,color:"black",fontWeight:"600"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis sapien in lectus fringilla bibendum. Quisque ultrices sodales mi, at vulputate nunc ultrices vel. Aenean nulla sapien, tristique eget ante lacinia, feugiat condimentum magna. Quisque ut sapien vehicula, aliquet lacus id, ornare tortor. Etiam congue lacus dui, ut ultrices sapien finibus vel. Fusce elementum est dictum nunc vulputate, non viverra purus tempus. Mauris ultrices ante id mauris fermentum, eu aliquam nibh tempor. Integer nec arcu sit amet risus suscipit varius non in ante.
            </p>
            <p style={{padding:30,color:"black",fontWeight:"600"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis sapien in lectus fringilla bibendum. Quisque ultrices sodales mi, at vulputate nunc ultrices vel. Aenean nulla sapien, tristique eget ante lacinia, feugiat condimentum magna. Quisque ut sapien vehicula, aliquet lacus id, ornare tortor. Etiam congue lacus dui, ut ultrices sapien finibus vel. Fusce elementum est dictum nunc vulputate, non viverra purus tempus. Mauris ultrices ante id mauris fermentum, eu aliquam nibh tempor. Integer nec arcu sit amet risus suscipit varius non in ante.
            </p>   
        </div>
    )
}
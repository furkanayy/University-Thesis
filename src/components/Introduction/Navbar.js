import React, { useState } from 'react'
import { signin } from "../../api/signin"
import { signup } from "../../api/signup"
import { sendMessage } from "../../api/contact"
import { Navbar, Nav, Form, Button, Modal } from "react-bootstrap"
import Brain from "../../images/appLogos/brain.png"

export default function NavBar() {
    
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    function clickSignin(){
        if(username === "" || password === ""){
            alert("Lütfen tüm boşlukları doldurun!")
        }
        else{
            signin(username, password)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    }

    function clickSignup(){
        if(
            name === "" || surname === "" || email === "" ||
            username === "" || password === ""
        ){
            alert("Lütfen tüm boşlukları doldurun!")
        }
        else{
            signup(name, surname, email, username, password)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    }

    function clickSendMessage(){
        if(
            name === "" || surname === "" || email === "" ||
            message === ""
        ){
            alert("Lütfen tüm boşlukları doldurun!")
        }
        else{
            sendMessage(name, surname, email, message)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
    }

    const [loginModalVisibility, setLoginModalVisibility] = useState(false)
    const [registerModalVisibility, setRegisterModalVisibility] = useState(false)
    const [contactModalVisibility, setContactModalVisibility] = useState(false)

    const handleLMClose = () => setLoginModalVisibility(false)
    const handleLMShow = () => setLoginModalVisibility(true)

    const handleRClose = () => setRegisterModalVisibility(false)
    const handleRShow = () => setRegisterModalVisibility(true)

    const handleCClose = () => setContactModalVisibility(false)
    const handleCShow = () => setContactModalVisibility(true)

    return (
        <div id="navbarro">
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <img
                    alt="Logo"
                    src={Brain}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                World of Brain Games
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={handleLMShow} active>Signin</Nav.Link>
                        <Nav.Link onClick={handleRShow} active>Signup</Nav.Link>
                        <Nav.Link onClick={handleCShow} active>Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={loginModalVisibility} onHide={handleLMClose} centered>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter Username" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                        </Form.Group>
                        <Button block variant="success" onClick={clickSignin}>
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={registerModalVisibility} onHide={handleRClose} centered>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="Enter First Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={e => setSurname(e.target.value)} type="text" placeholder="Enter Last Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter E-Mail" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter Username" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                        </Form.Group>
                        <Button block variant="primary" onClick={clickSignup}>
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={contactModalVisibility} onHide={handleCClose} centered>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="Enter First Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={e => setSurname(e.target.value)} type="text" placeholder="Enter Last Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter E-Mail" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Message</Form.Label>
                            <Form.Control onChange={e => setMessage(e.target.value)} type="text" placeholder="Enter Message" as="textarea" rows={3} />
                        </Form.Group>
                        <Button block variant="success" onClick={clickSendMessage}>
                            Send
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
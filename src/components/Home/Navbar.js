import React, { useState } from 'react'
import { signout } from "../../helpers/signout"
import { sendMessage } from "../../api/contact"
import { Navbar, Nav, Form, Button, Modal } from "react-bootstrap"
import Brain from "../../images/appLogos/brain.png"

export default function NavBar() {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const [contactModalVisibility, setContactModalVisibility] = useState(false)

    const handleCClose = () => setContactModalVisibility(false)
    const handleCShow = () => setContactModalVisibility(true)

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

    function clickSignout(){
        signout()
        window.location.reload()
    }

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
                        <Nav.Link href="/home/profile" active>{localStorage.getItem("username")}</Nav.Link>
                        <Nav.Link href="/home/about" active>About Us</Nav.Link>
                        <Nav.Link onClick={handleCShow} active>Contact</Nav.Link>
                        <Nav.Link onClick={clickSignout} active>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

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
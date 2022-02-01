import React, { useState, useEffect } from 'react'
import { Form, Button } from "react-bootstrap"
import { getProfileInfo, editProfile } from "../../api/user"

export default function Profile() {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(async () => {
        const user = await getProfileInfo(localStorage.getItem("token"))

        setName(user.name)
        setSurname(user.surname)
        setEmail(user.email)
        setUsername(user.username)
        setPassword(user.password)
    }, [])

    function updateMyInfo(){
        editProfile(localStorage.getItem("token"), name, surname, email, username, password)
    }

    return (
        <div>
            <Form style={{padding:100}}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder={name} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control onChange={e => setSurname(e.target.value)} type="text" placeholder={surname} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder={email} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder={username} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder={password} />
                </Form.Group>

                <Button onClick={updateMyInfo} variant="primary" className="center" block>
                    Update My Information
                </Button>
            </Form>
        </div>
    )
}
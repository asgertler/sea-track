import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Container, Divider, Form } from "semantic-ui-react"
import logo from "../../img/seaTrack_logo.png"
import video from "../../video/seaTrack_vid.mp4"
import "./Login.css"


export const Login = props => {
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://http://sea-track.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("seaTrack_user", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <>
            <main className="container--login">
                <dialog className="dialog dialog--auth" ref={existDialog}>
                    <div>User does not exist</div>
                    <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>

                <Container className="form--container" text={true}>
                    <Form className="form--login" onSubmit={handleLogin}>
                        <img src={logo} alt="Sea Track logo" className="loginLogo" />
                        <Divider className="globalDivide" />

                        <h1>Sea Track</h1>
                        <h2>Login</h2>

                        <Form.Field className="login--field">
                            <label> Email </label>
                            <input ref={email} type="email"
                                id="email"
                                className="email--input"
                                placeholder="Email address"
                                required autoFocus />

                            <Form.Button primary className="button--submit" type="submit">
                                Sign in
                        </Form.Button>
                        </Form.Field>
                    </Form>

                    <div className="link--register">
                        <Link to="/register">Not a member yet?</Link>
                    </div>
                </Container>
            </main>

            <video className="videoBg" autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
        </>
    )
}


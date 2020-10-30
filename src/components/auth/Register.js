import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { Container, Form } from "semantic-ui-react"
import video from "../../video/seaTrack_vid.mp4"
import "./Login.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const city = useRef()
    const state = useRef()
    const zip = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    const stateList = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS",
        "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",
        "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
        "WI", "WY"
    ]

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`,
                            city: city.current.value,
                            state: state.current.value,
                            zip: zip.current.value
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("seaTrack_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })

    }

    return (
        <>
            <main className="container--login" >

                <dialog className="dialog dialog--password" ref={conflictDialog}>
                    <div>Account with that email address already exists</div>
                    <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
                </dialog>

                <Container className="form--container" text={true}>
                    <Form className="form--login" onSubmit={handleRegister}>
                        <h2 className="h3 mb-3 font-weight-normal">Join Sea Track</h2>

                        <Form.Field>
                            <label htmlFor="firstName"> First Name </label>
                            <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />

                            <label htmlFor="lastName"> Last Name </label>
                            <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />

                            <label htmlFor="inputEmail"> Email address </label>
                            <input ref={email} type="email" name="email" className="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="Email address" required />

                            <label htmlFor="inputCity"> City </label>
                            <input ref={city} type="text" name="city" className="form-control" placeholder="City" required />

                            <label htmlFor="selectState"> State </label>
                            <select ref={state}>
                                {stateList.map(state => {
                                    return <option key={state} value={state}>{state}</option>
                                })}
                            </select>

                            <input ref={zip} type="text" name="zip" className="form-control" pattern="[0-9]{5}" maxLength="5" placeholder="Zipcode" required />

                            <Form.Group className="registrationBtns">
                                <Form.Button type="Form.Button" onClick={() => {
                                    history.push("/login")
                                }}> Cancel </Form.Button>
                                <Form.Button type="submit" primary> Register </Form.Button>
                            </Form.Group>
                        </Form.Field>
                    </Form>
                </Container>
            </main>

            <video className="videoBg" autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
        </>
    )
}


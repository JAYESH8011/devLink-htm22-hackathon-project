import React, { useState, useContext } from "react"
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common"
import { Link } from "react-router-dom"
import { signup } from "../../auth/index"
import { Marginer } from "../marginer"
import { AccountContext } from "./AccountContext"
import Base from "../../core/Base"

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    })
    const { name, email, password, error, success } = values
    const { switchToSignin } = useContext(AccountContext)
    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true,
                })
            }
        })
    }

    const SignupForm = () => {
        return (
            <BoxContainer>
                <FormContainer>
                    <Input
                        onChange={handleChange("name")}
                        value={name}
                        type="text"
                        placeholder="Full Name"
                    />
                    <Input
                        onChange={handleChange("email")}
                        value={email}
                        type="email"
                        placeholder="Email"
                    />
                    <Input
                        onChange={handleChange("password")}
                        value={password}
                        type="password"
                        placeholder="Password"
                    />
                    <Input type="password" placeholder="Confirm Password" />
                </FormContainer>
                <Marginer direction="vertical" margin={10} />
                <SubmitButton onClick={onSubmit} type="submit">
                    Signup
                </SubmitButton>
                <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#">
                    Already have an account?
                    <BoldLink href="#" onClick={switchToSignin}>
                        Signin
                    </BoldLink>
                </MutedLink>
            </BoxContainer>
        )
    }
    return <Base>{SignupForm()}</Base>
}
export default Signup

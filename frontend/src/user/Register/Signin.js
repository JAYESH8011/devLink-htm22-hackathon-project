import React, { useContext, useState } from "react"
import { Navigate } from "react-router-dom"

import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common"

import { Marginer } from "../marginer"
import { authenticate, isAuthenticated, signin } from "../../auth"
import Base from "../../core/Base"
import { AccountContext } from "./AccountContext"

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didNavigate: false,
    })

    const { email, password, error, loading, didNavigate } = values
    // const { user } = isAuthenticated();
    const { switchToSignup } = useContext(AccountContext)

    // const handleChange = (name) => (event) => {
    //   setValues({ ...values, error: false, [name]: event.target.value });
    // };

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didNavigate: true,
                        })
                    })
                }
            })
            .catch((e) => {
                console.log("signin request failed")
            })
    }
    // const performNavigate = () => {
    //   if (didNavigate) {

    //       return <Navigate to="/home"/>;
    //     }
    //     if (isAuthenticated()) {
    //       console.log("authenticate hua");
    //       return <Navigate to="/" />;
    //     }
    //   }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const LoginForm = () => {
        return (
            <BoxContainer>
                <FormContainer>
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                </FormContainer>
                <Marginer direction="vertical" margin={10} />
                <MutedLink href="#">Forget your password?</MutedLink>
                <Marginer direction="vertical" margin="1.6em" />
                <SubmitButton onClick={onSubmit} type="submit">
                    Signin
                </SubmitButton>
                <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#">
                    Don't have an account?{" "}
                    <BoldLink href="#" onClick={switchToSignup}>
                        Signup
                    </BoldLink>
                </MutedLink>
            </BoxContainer>
        )
    }

    return (
        <Base>
            {loadingMessage()}
            {errorMessage()}
            {LoginForm()}
            {/* performanceNavigate */}
        </Base>
    )
}

export default Signin

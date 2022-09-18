import { BrowserRouter } from "react-router-dom"
import Home from "./core/Home"
import Signin from "./user/Register/Signin"
import { SignupForm } from "./user/Register/signup"
import index from "./user/Register/index"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact component={index} />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes

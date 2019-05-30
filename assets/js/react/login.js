import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/js/dist/modal';
import "./index"
import { Functional } from "./src/Components/Functional"
import { Inputs } from "./src/Components/Inputs"
import { Labels } from "./src/Components/Labels"
import { onReloadToken_api } from './src/Components/POST2'
import Button from '@material-ui/core/Button'


class Login extends Component {
    constructor(props) {
        super(props)
        this.onLoginChange = this.onLoginChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            userName: "",
            passWord: "",
            bearer_token: ""
        }


    }
    onSubmit() {
        onReloadToken_api(this.state.userName,
            this.state.passWord,
            '/api/auth/login_check', //   url,
            "XMLHTTPREQUES"

        )

            // console.log(data)
            .then(data => {
                localStorage.setItem("bearer_token", data["token"]);
                //Для fetch()
                console.log(data)
                if (data["message"] === "Bad credentials") {

                    alert("Не верен логин и/или пароль...")
                }
                else if (data["token"] === null) {

                    alert("Ой!")
                }
                else {
                    alert("Успешно!")
                    this.props.history.push("/")
                }
                this.setState({
                    bearer_token: data["token"],
                    userName: "",
                    passWord: ""
                })
            })

    }
    onLoginChange() {
        this.setState({ userName: event.target.value });
    }
    onPasswordChange() {
        this.setState({ passWord: event.target.value });
    }
    render() {

        return (
            <header className="App-header">
                <div class="container">
                    <div class="row">
                        <Functional text="Пожалуйста, войдите" />
                    </div>
                </div>
                <form className="Login" onSubmit={this.onSubmit}>
                    <div class="container ">
                        <div class="row">
                            <Labels labeltext="Login:" />
                            <Inputs name="Login" value={this.state.userName} onChange={this.onLoginChange} type="text" />
                            {/* <Inputs name="FirstName" value={this.state.firstName} onChange={this.onFirstNameChange} /> */}
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <Labels labeltext="Password:" />
                            <Inputs name="Password" value={this.state.passWord} onChange={this.onPasswordChange} type="password" />
                            {/* <Inputs name="LastName" value={this.state.lastName} onChange={this.onLastNameChange} /> */}
                        </div>
                    </div>
                    <br />
                    <Button type="submit" variant="contained" color="primary" >
                        Ввод
                    </Button>
                </form>
            </header>

        );
    }
}
export default Login
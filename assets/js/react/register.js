import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/js/dist/modal';
import { Functional } from "./src/Components/Functional"
import { Inputs } from "./src/Components/Inputs"
import { Labels } from "./src/Components/Labels"
import { onRegister_api } from "./src/Components/POST3"
import Button from '@material-ui/core/Button'
class Register extends Component {
    constructor(props) {

        super(props)
        this.onLoginChange = this.onLoginChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            userName: "",
            passWord: "",
            email:"",
            bearer_token: ""
        }
    }
    onSubmit() {
        onRegister_api(this.state.userName,
            this.state.passWord,
            this.state.email,
            '/api/auth/register', //   url,
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
                    this.props.history.push("/login")
                }
                this.setState({
                    bearer_token: data["token"],
                    userName: "",
                    passWord: "",
                    email:""
                })
            })

    }
    onLoginChange() {
        this.setState({ userName: event.target.value });
    }
    onPasswordChange() {
        this.setState({ passWord: event.target.value });
    }
    onEmailChange() {
        this.setState({ email: event.target.value });
    }
    render() {

        return (
            <header className="App-header">
            <div class="container">
                <div class="row">
                    <Functional text="Пожалуйста, зарегистрируйтесь" />
                </div>
            </div>
            <form className="Register" onSubmit={this.onSubmit}>
                    <div class="container ">
                        <div class="row">
                            <Labels labeltext="E-mail:" />
                            <Inputs name="E-mail" value={this.state.email} onChange={this.onEmailChange} type="text"/>
                        </div>
                    </div>
                    <div class="container ">
                        <div class="row">
                            <Labels labeltext="Login:" />
                            <Inputs name="Login" value={this.state.userName} onChange={this.onLoginChange} type="text"/>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <Labels labeltext="Password:" />
                            <Inputs name="Password" value={this.state.passWord} onChange={this.onPasswordChange} type="password"/>
                        </div>
                    </div>
      <br/>
      <Button type="submit" variant="contained" color="primary">
            Ввод
          </Button>
            </form>
        </header>
        );
    }
}
export default Register
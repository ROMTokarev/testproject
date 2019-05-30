import React, { Component } from 'react';
import logo from './src/Components/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/js/dist/modal';
import { Functional } from "./src/Components/Functional"
import { Inputs } from "./src/Components/Inputs"
import { Labels } from "./src/Components/Labels"
import "./assets/css/index.css"
import {onGetUserList} from './src/Components/GET';
import {onSubmit_api} from './src/Components/PUT'
import {onDelete_api} from './src/Components/Delete'
import { onSaveChange_api } from './src/Components/POST';
import Button from '@material-ui/core/Button'
import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';  
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
class App extends Component {

  componentDidMount() {
    let promise = new Promise((resolve, reject) => {
      onGetUserList(
        this.state.request_api,
        // this.state.request_method,
        this.state.user_data,
        this.state.url,
        this.state.bearer_token
        )
        
      .then(user =>{       
        this.setState({user_data:user})
      })

      setTimeout(() => {
        // переведёт промис в состояние fulfilled с результатом "result"
        // resolve();
        if(this.state.user_data === 401){
          this.setState({ isOpen: true, isLoad: false })
        }else{
        this.setState({
          isOpen: false, isLoad: true})
        }
      }, 2000);

    });
    this.setState({ isOpen: true, isLoad: false })
    // promise.then навешивает обработчики на успешный результат или ошибку
    // promise
    //   .then(
    //     () => {
    //       // this.setState({
    //       //   isOpen: false, isLoad: true})
    //       // первая функция-обработчик - запустится при вызове resolve
    //     },
    //     error => {
    //       // вторая функция - запустится при вызове reject
    //       // alert("Rejected: " + error); // error - аргумент reject
    //       if (error === 401) {
    //       alert("Авторизуйтесь!")
    //       }
    //       console.log(error)
    //     }
    //   )

  }
  
  constructor(props) {

    super(props)
    this.onFirstNameChange = this.onFirstNameChange.bind(this)
    this.onLastNameChange = this.onLastNameChange.bind(this)
    this.onFatherNameChange = this.onFatherNameChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelate = this.onDelate.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onSaveChange = this.onSaveChange.bind(this)
    this.onCloseModWindow = this.onCloseModWindow.bind(this)
    
    this.state = {
      isOpen: false,
      isLoad: true,
      firstName: '',
      lastName: '',
      fatherName: '',
      list: [],
      index: 0,
      item: '',
      user_data: [],
      request_api:'XMLHTTPREQUEST',
      request_method:'PUT',
      url:'/api/client/',
      bearer_token:localStorage.getItem("bearer_token")
    }
  }
 
  onSubmit() {

    onSubmit_api(
      this.state.lastName,
      this.state.firstName,
      this.state.fatherName, 
      // this.state.request_api,
      "AXIOS",
      // this.state.url,
      `/api/client/`,
      this.state.bearer_token)
      .then(data =>{        //Для fetch()
        console.log(data)


        this.setState({
          user_data: [
            ...this.state.user_data,
            {
              firstName: data['firstName'],
              lastName: data['lastName'],
              fatherName: data['fatherName'],
              id:data['id']
            }
          ],
          firstName: "",
          lastName: "",
          fatherName: ""
        })


      }) //Для fetch()
  }
  onDelate() {
    let index = this.state.index
    this.setState({ user_data: this.state.user_data.filter((item, key) => item.id !== index)})
    onDelete_api(this.state.index,
                //  this.state.request_api,
                "XMLHTTPREQUES",
                //  this.state.url,
                `/api/client/${index}`,
                 this.state.bearer_token)

                 this.setState({
                  firstName: "",
                  lastName: "",
                  fatherName: ""
                })
     event.preventDefault()
     
   
  }
onEdit(item, index = null) {
  this.setState(item)

  if (index != null) {
    this.setState({
      index: index,
      item: item
    })
  }

}
onSaveChange() {
  let index = this.state.index
  this.setState({
    user_data:
      this.state.user_data.map((value, i) => {
        if (value["id"] === index) {
          return {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            fatherName: this.state.fatherName,
            id:this.state.index
          }
        }
        else {
          return value
        }
      }),
    firstName: "",
    lastName: "",
    fatherName: ""
  })
onSaveChange_api(this.state.firstName,
                 this.state.lastName,
                 this.state.fatherName,
                //  this.state.url,
                 `/api/client/${index}`,
                 this.state.index,
                //  this.state.request_api,
                "XMLHTTPREQUEST",
                 this.state.bearer_token)
}
onCloseModWindow() {
  this.setState({
    firstName: "",
    lastName: "",
    fatherName: ""
  })
}

onFirstNameChange(event) {
  this.setState({ firstName: event.target.value });
}

onLastNameChange(event) {
  this.setState({ lastName: event.target.value });
}

onFatherNameChange(event) {
  this.setState({ fatherName: event.target.value });
}

render() {

  return (

    <header className="App-header">
    <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="container">
        <div class="row">
          <Functional text="Пожалуйста, введите данные указанные ниже..." />
        </div>
      </div>
            <form onSubmit={this.onSubmit}>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12 labels">
                    <label>Фамилия:</label>
                  </div>
                  <div class="col-md-12"><input type="text" name="LastName" value={this.state.lastName}
                    onChange={this.onLastNameChange} />
                  </div>
                  <div class="col-md-12 labels">
                    <label>Имя:</label>
                  </div>
                  <div class="col-md-12"><input type="text" name="FirstName" value={this.state.firstName}
                    onChange={this.onFirstNameChange} />
                  </div>
                  <div class="col-md-12 labels">
                    <label>Отчество:</label>
                  </div>
                  <div class="col-md-12"><input type="text" name="FatherName" value={this.state.fatherName}
                    onChange={this.onFatherNameChange} />
                  </div>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" onClick={this.onCloseModWindow} class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                <button type="button" onClick={this.onSubmit} class="btn btn-primary" data-dismiss="modal">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      

        {this.state.isOpen && <section>
          {/* <div class="container">
            <div class="row">
              <div class="col-md-auto offset-md-5">
                <h1 className="load"><span class="badge badge-warning">Грузим...</span></h1>
              </div>
            </div>
          </div> */}
          <div class="container">
            <div class="row">
              <div class="col-xs-1 offset-xs-8 col-sm-6 offset-sm-2 col-md-6 offset-md-4 logo">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
            </div>
          </div>
        </section>}

        {this.state.isLoad && <Paper className="root container">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="col">#</TableCell>
              <TableCell component="th" scope="col">Фамилия</TableCell>
              <TableCell component="th" scope="col">Имя</TableCell>
              <TableCell component="th" scope="col">Отчество</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.user_data.map((item, index) => (
              <TableRow onClick={() => this.onEdit(item, item.id)}
                data-toggle="modal" data-target="#myModal">
                <TableCell component="th" scope="row">>{item.id}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.fatherName}</TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
        <br />
      <div class="container submitbut">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <Button type="button" variant="contained" color="primary" data-toggle="modal" data-target="#myModal2">
              Ввод
          </Button>
          </div>
        </div>
      </div>
      <br />
        </Paper>
        }
       

      {/* </form> */}



      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <form onSubmit={this.onSubmit}>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12 labels">
                    <label>Фамилия:</label>
                  </div>
                  <div class="col-md-12"><input type="text" name="LastName" value={this.state.lastName}
                    onChange={this.onLastNameChange} />
                  </div>
                  <div class="col-md-12 labels">
                    <label>Имя:</label>
                  </div>
                  <div class="col-md-12"><input type="text" name="FirstName" value={this.state.firstName}
                    onChange={this.onFirstNameChange} />
                  </div>
                  <div class="col-md-12 labels">
                    <label>Отчество:</label>
                  </div>
                  <div class="col-md-12"><input type="text" name="FatherName" value={this.state.fatherName}
                    onChange={this.onFatherNameChange} />
                  </div>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" onClick={this.onCloseModWindow} class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                <button type="button" onClick={this.onSaveChange} class="btn btn-primary" data-dismiss="modal">Сохранить</button>
                <button type="button" onClick={this.onDelate} class="btn btn-danger" data-dismiss="modal">Удалить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
}
//прописать логику страниц регистрации и авторизации, а так же JWT
export default App;
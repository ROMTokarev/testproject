import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/js/dist/modal';
import { onGetAuthList } from "./src/Components/GET2"
import { Functional } from "./src/Components/Functional"
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {onUserList_api} from "./src/Components/POSTFORUSERLIST"
import { Number } from 'core-js';



class Userlist extends Component {

  componentDidMount(){
    onGetAuthList(
      this.state.request_api,
      // this.state.request_method,
      this.state.user_data,
      "/api/auth/user",
      this.state.bearer_token)

      .then(user =>{        //Для fetch()
        this.setState({user_data:user})
        console.log(user)
        
      }) //Для fetch()
        
      
  }
    constructor(props) {
        super(props)
        this.onEdit = this.onEdit.bind(this)
        this.onRolesChange = this.onRolesChange.bind(this)
        this.onSaveChange = this.onSaveChange.bind(this)
        // this.onUserList_api = this.onUserList_api.bind(this)
        this.state = {
          index: 0,
          item: '',
          user_data: [],
          request_api:'XMLHTTPREQUEST',
          request_method:'PUT',
          url:'/api/client/',
          bearer_token:localStorage.getItem("bearer_token"),
          roles:"",
          enabled:"",
          username: "",
          email:"",
        }

    }

    onRolesChange(event) {
      this.setState({ roles: event.target.value });
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
      // let index = this.state.index
       this.setState({
        user_data:
          this.state.user_data.map((value, i) => {
            if (value["id"] === this.state.index) {
              // console.log(JSON.parse(value.roles))
              return {
                roles:this.state.roles,
                id:this.state.index,
                username:this.state.username,
                email:this.state.email,
              }
            }
            else {
              return value
            }
          }),
      })
      onUserList_api(
                    //  this.state.url,
                     `/api/auth/user/${this.state.index}`,
                     this.state.roles,
                     this.state.user_data,
                    //  this.state.request_api,
                    "XMLHTTPREQUES",
                     this.state.bearer_token)
    }
    
    render() {

        return (
            <header className="App-header">
                <div class="container">
                    <div class="row">
                        <Functional text="Тут вы можете изменить роли(только для Администраторов)   " />
                    </div>
                </div>
                {/* <form onSubmit={this.onSubmit}> */}
                <Paper className="root container">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="col">#</TableCell>
              <TableCell component="th" scope="col">Login</TableCell>
              <TableCell component="th" scope="col">Email</TableCell>
              {/* <TableCell component="th" scope="col">Активен?</TableCell>
              <TableCell component="th" scope="col">Активность</TableCell> */}
              <TableCell component="th" scope="col">Роли</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.user_data.map((item, index) => (
              
              <TableRow onClick={() => this.onEdit(item, item.id)}
                data-toggle="modal" data-target="#myModal">
                <TableCell component="th" scope="row">>{item.id}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                {/* <TableCell>{this.state.enabled}</TableCell>
                <TableCell>{item.last_login}</TableCell> */}
                <TableCell>{item.roles}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <br />
      <div class="container submitbut">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <Button type="button" variant="contained" color="primary" data-toggle="modal" data-target="#myModal2">
              Ввод
          </Button>
          </div>
        </div>
      </div>
      <br /> */}
        </Paper>
 
      {/* </form> */}



      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12 labels">
                    <label>roles:</label>
                  </div>
                  <div class="col-md-12"><input type="text" name="roles" value={this.state.roles}
                    onChange={this.onRolesChange} />
                  </div>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" onClick={this.onCloseModWindow} class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={this.onSaveChange} class="btn btn-primary" data-dismiss="modal">Save changes</button>
                <button type="button" onClick={this.onDelate} class="btn btn-danger" data-dismiss="modal">Delate</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
        );
    }
}
export default Userlist
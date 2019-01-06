import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import './App.css';
import './admin.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showadmin: true,
      checkEditOrRej: true,
      data: [],
      dataEdit: [],
      name: '',
      lastname: '',
      address: '',
      status: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }
  onChangeName(e) {
    var name = e.target.value
    this.setState({name: name});
  }
  onChangeAddress(e) {
    var address = e.target.value
    this.setState({address: address});
  }
  onChangeLastname(e) {
    var lastname = e.target.value
    this.setState({lastname: lastname});
  }
  onChangeStatus(e) {
    var status = e.target.value
    this.setState({status: status});
  }
  /////////////// Insert/////////////////
  onSubmit(e) {
    const url = 'http://localhost:8081/addUsers/'+this.state.name +'/'+this.state.lastname+'/'+this.state.address+'/'+this.state.status;
    axios({
      headers:{
        'Content-Type': 'text/plain'
      },
      method: 'POST',
      url: url
    }).then(response => {
      swal("Register","Register successfully", "success").then(function () {
        window.location = "/";
      })
      console.log(response.data)
    })
    console.log(this.state.name + ' : ' + this.state.lastname + ' : ' + this.state.address);
  }

  /////////////////// Delete////////////////
  deleteValue(event, index) {
    
    const url = 'http://localhost:8081/delUsers/' + index;
    axios({
      headers:{
        'Content-Type': 'text/plain'
      },
      method: 'DELETE',
      url: url
    }).then(response => {
      swal("Deleted!", "Deleted successfully", "success").then(function () {
        window.location = "/";
      })
      console.log(response.data)
    })
    console.log(index);
  }
  
  ///////////////////////////////////
  editValue(event,index) {
    this.setState({
      checkEditOrRej: false
    })
    const url = 'http://localhost:8081/getUsers/' + index;
    axios({
      headers:{
        'Content-Type': 'json/plain'
      },
      method: 'GET',
      url: url
    }).then(response => {
     // console.log(response.data)
     this.setState({
        dataEdit: response.data,
        name: response.data[0].name,
        lastname: response.data[0].lastname,
        address: response.data[0].address,
        status: response.data[0].status 
      });
    })
    console.log(this.state.dataEdit)
  }
  ////////////// Update /////////////////////

  updateValue(){
    const url = 'http://localhost:8081/updateUsers/'+this.state.dataEdit[0].adminID+'/'+this.state.name+'/'+this.state.lastname+'/'+this.state.address+'/'+this.state.status;
    console.log(url)
    axios({
      headers:{
        'Content-Type': 'text/plain'
      },
      method: 'GET',
      url: url
    }).then(response => {
      swal("Update!", "Update successfully", "success").then(function () {

        window.location = "/";
      })
    })
    console.log(this.state.dataEdit[0])
  }
  componentDidMount() {
    axios({
      headers:{
        'Content-Type': 'json/plain'
      },
      method: 'GET',
      url: 'http://localhost:8081/getUsers'
    }).then(response => {
      console.log(response.data)
      response.data.forEach(element => {
        this.state.data.push(element)
      });
      this.setState({
        data: this.state.data
      })
    })
  }
  render() {
    return (
      <div>
          <div className="topnav">
            <a href="/login">Login</a>
            {this.state.showadmin ? <a href="/admin">admin</a> : ''}
            <a className="active" href="/">Home</a>
            </div>
          <div className="container">
          <table className="w3-table-all">
          <thead>
            <tr className="w3-light-grey">
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Lastname</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, i) => (
              <tr key={i}>
                <td data-label="No">{i+1}</td>
                <td data-label="Due DateName">{item.name}</td>
                <td data-label="Lastname">{item.lastname}</td>
                <td data-label="Address">{item.address}</td>
                <td data-label="Address">{item.status}</td>
                <td data-label="delete"><button onClick={(e) => {this.deleteValue(e, item.adminID)}} className="button button1">Delete</button></td>
                <td data-label="delete"><button onClick={(e) => {this.editValue(e, item.adminID)}} className="button button2"> Edit </button></td>
              </tr>
            ))}
          </tbody>
        </table>
            <h1>Register</h1>
            <label htmlFor="email"><b>Name</b></label>
            <input onChange={this.onChangeName.bind(this)} value={this.state.name} type="text" placeholder="Name" name="name" required></input>
            <label htmlFor="psw"><b>Lasaname</b></label>
            <input onChange={this.onChangeLastname.bind(this)} value={this.state.lastname} type="text" placeholder="Enter Lasaname" name="lastname" required></input>
            <label htmlFor="psw-repeat"><b>Address</b></label>
            <input onChange={this.onChangeAddress.bind(this)} value={this.state.address} type="text" placeholder="Enter Address" name="address" required></input>
            <label htmlFor="psw-repeat"><b>Status</b></label>
            <input onChange={this.onChangeStatus.bind(this)} value={this.state.status} type="text" placeholder="Enter Status" name="Status" required></input>
            {this.state.checkEditOrRej ? <button onClick={this.onSubmit} type="submit" className="registerbtn">Register</button> : <button onClick={this.updateValue} type="submit" className="registerbtn">Edit</button>}
        </div>
      </div>
      
    );
  }
}

export default App;

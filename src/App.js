import React, { Component } from 'react';
import logo from './images/pic02.jpg';
import axios from 'axios';
import {Route,Link,Router,browserHistory} from 'react-router';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showadmin: true,
      data: [],
      dataEdit: [],
      name: '',
      lastname: '',
      address: ''
    };
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
      <div className="App">
      <div className="topnav">
        <a href="/login">Login</a>
        {this.state.showadmin ? <a href="/admin">admin</a> : ''}
        <a className="active" href="/">Home</a>
      </div>
			<section id="two" className="wrapper style3">
				<div className="inner">
					<header className="align-center">
						<p>Employees in the company</p>
						<h2>Employee List</h2>
					</header>
				</div>
			</section>
			<section id="one" className="wrapper style2">
				<div className="inner">
					<div className="grid-style">
            {this.state.data.map((item, i) => (
              <div key={i}>
							<div className="box">
								<div className="image fit">
									<img src={logo}></img>
								</div>
								<div className="content">
									<header className="align-center">
										<p>Name: {item.name}   {item.lastname}</p>
										<h2>Status: {item.status}</h2>
									</header>
									<p>Address: {item.address}</p>
									<footer className="align-center">
									</footer>
								</div>
							</div>
						</div>
            ))}
					</div>
				</div>
			</section>
			<footer id="footer">
				<div className="copyright">
					&copy; Mr.Sakran Aasanam <br></br>
          Email: sakran.asa@msu.ac.th <br></br>
          Phone: 0986960443 <br></br>
				</div>
			</footer>
      </div>
    );
  }
}

export default App;

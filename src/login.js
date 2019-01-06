import React, { Component } from 'react';
import logo from './images/img-01.png';
import './login.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showadmin: true,
        username: '',
        password: ''
    };
    this.onSubmin = this.onSubmin.bind(this);
  }
  onChangeUser(event){
    this.setState({
        username: event.target.value
    })
  }
  onChangePass(event){
    this.setState({
        password: event.target.value
    })
  }
  onSubmin(event){
    
  }
  render() {
    return (
        <div>
            <div className="limiter">
                <div className="topnav">
                    <a href="/login">Login</a>
                    {this.state.showadmin ? <a href="/admin">admin</a> : ''}
                    <a className="active" href="/">Home</a>
                </div>
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src={logo} alt="IMG"></img>
                    </div>
                    <div className="login100-form validate-form">
                        <span className="login100-form-title">
                            Member Login
                        </span>
                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" onChange={this.onChangeUser.bind(this)} name="email" placeholder="Username"></input>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Password is required">
                            <input className="input100" type="password" name="pass" onChange={this.onChangePass.bind(this)} placeholder="Password"></input>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>
                        
                        <div className="container-login100-form-btn">
                            <button onClick={this.onSubmin} className="login100-form-btn">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default App;

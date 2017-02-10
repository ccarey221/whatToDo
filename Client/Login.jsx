import React, {Component} from 'react';
import {history, Link} from 'react-router';
import FacebookLogin from 'react-facebook-login';

class Login extends React.Component {

        constructor(props) {
        super(props);
        this.state = {username: '', password: ''}
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

/*
    ***************************************************
     * @handleUsernameChange
     * Uses component state to update username on change
     * e = represents the event.
    *****************************************************
*/

    handleUsernameChange(e) {
      this.setState({username: e.target.value});
      console.log(this.state.username);
    }

    handlePasswordChange(e) {
      this.setState({password: e.target.value});
      console.log(this.state.password);
    }

    handleSubmit(e) {
      console.log('username: ', this.state.username, '\npassword: ', this.state.password);
      window.location = '/home';
    }

    handleSubmit(e) {
      console.log('username: ', this.state.username, '\npassword: ', this.state.password);
      var xhr = new XMLHttpRequest();
      var data = "data=" + JSON.stringify({username: this.state.username, password: this.state.password});
      xhr.withCredentials = false;
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (!!xhr.responseText) {
            console.log('req.sessionID from inside Login.jsx is', xhr.responseText);
            window.session = xhr.responseText;
            console.log('window.session is', window.session);
            window.location = '/home';
          } else {
            console.log('no redirect from sign in button');
          }
        }
      };
      xhr.open("POST", "http://198.199.95.16:3000/login");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
      window.location = '/home';
    }

    render() {
          return (
        <div>
          <div id="videoBackgroundContainer">
            <video id="videoBackground" autoPlay muted loop>
              <source src="./lib/video/slowmoheadla.mp4" type="video/mp4" />
              <source src="./lib/video/slowmoheadla.ogv" type="video/ogv" />
              Your browser doesn't support HTML5 video.
            </video>
          </div>
          <div id="loginForm" className="col-xs-10 col-xs-offset-1 col-sm-8
              col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
            <form className="form-horizontal col-xs-8 col-xs-offset-2">
              <fieldset>
                <button className='signIn btn btn-success' type='button'><Link to='/home'>Home</Link></button>
              </fieldset>
            </form>
          </div>
        </div>
      );
    }
}

export default Login;

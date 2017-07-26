import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome To Campus Recruitment System</h2>
        </div>

        <div>
          <Link to='/company/companylogin'><button className="btn-btn">Company Login</button></Link>
          <br/>
          <Link to='/student/studentlogin'><button className="btn-btn">Student Login</button></Link>
          <br/>
          {/*<Link to='/signup'><button className="btn-btn">Sign Up</button></Link>*/}
          <br/>
          {/*<Link to='/userpage'><button className="btn-btn">User Page</button></Link>*/}
        </div>
      </div>
    );
  }
}

export default App;

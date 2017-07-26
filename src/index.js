import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Admin from './adminlogin';
import * as firebase from 'firebase';

import StudentLogIn from './student/studentlogin';
import Studentinfo from './student/studentinfo';
import Studentprofil from './student/studentprofile'; 

import CompanyLogIn from './company/companylogin';
import Companyprofil from './company/companyprofile';
import Jobposted from './company/companyjobpost';
import Yourjobs from './company/checkjob';

import AdminDashboard from './admin/admindashboard';
// import Alljobs from './admin/alljobs';

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAWVk4ZBICj1K4Oo4pSKJXmL1DhiL4f1qA",
    authDomain: "news-project-a8cc8.firebaseapp.com",
    databaseURL: "https://news-project-a8cc8.firebaseio.com",
    projectId: "news-project-a8cc8",
    storageBucket: "news-project-a8cc8.appspot.com",
    messagingSenderId: "175621856403"
  };
  firebase.initializeApp(config);


ReactDOM.render(
    <Router>
        <div>
            <Route path='/' exact component={App}> </Route>

            <Route path='/bootstrapcompo' component={Admin}> </Route>

            <Route  path='/student/studentlogin' exact component={StudentLogIn}> </Route>
            
            <Route path='/student/studentinfo' component={Studentinfo}> </Route>

            <Route path='/student/studentprofile' component={Studentprofil}> </Route>
            
            <Route path='/company/companylogin' exact component={CompanyLogIn}> </Route>

            <Route path='/company/companyprofile' component={Companyprofil}> </Route>

            <Route path='/company/jobpost' component={Jobposted}> </Route>

            <Route path='/company/yourjobs' component={Yourjobs}> </Route>

            <Route path='/admin' exact component={AdminDashboard}> </Route>
        </div>
    </Router>, document.getElementById('root'));
    registerServiceWorker();
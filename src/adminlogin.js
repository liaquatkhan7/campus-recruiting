import React,{Component} from 'react';
import * as firebase from 'firebase';
import './App.css';
import { Button } from 'react-bootstrap';

class Admin extends Component {
        constructor(){
            super();
            this.state = {
                authsecess: false
            }
        }

    submit(e){
        e.preventDefault();
        let email = this.refs.email.value;
        let pass = this.refs.pass.value;
        firebase.auth().signInWithEmailAndPassword(email, pass).then((result) => {
            alert('Signin Sucessful');
            console.log(result);
        }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(errorMessage)
            // ...
        });
}

    render(){
        return (
            <div>
                
                <div className='header'>
                    <h1 style={{margin:'0px', width:'90%',float: 'left' }}> Header </h1>
                    <button className='btn-header'>SIGNOUT</button>

                </div>
                <div className='App'>
                        {/*<ButtonToolbar>*/}
                             <Button bsStyle="primary">Primary</Button>
                        {/*</ButtonToolbar>*/}
                </div>
            </div>
        )
    }
}

export default Admin;
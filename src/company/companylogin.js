import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../App.css';


class CompanySignIn extends Component {
    
    signi(e){
        e.preventDefault()
        let email = this.refs.email.value;
        let pass = this.refs.pass.value;
        firebase.auth().signInWithEmailAndPassword(email, pass).then( (result) => {
            alert('Signin Sucessful');
            console.log(result);
            this.props.history.push('/company/companyprofile');
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    render(){
        return (
            <div className='App'>
                <input className='input' type="email" ref='email' placeholder='Email' /><br/>
                <input className='input' type="password" ref='pass' placeholder='Password' /><br/>
                <input className='btn-btn' type="submit" onClick={this.signi.bind(this)} />
            </div>
        )
    }    
}


class CompanySignUp extends Component {
    signu (e) {
        e.preventDefault();
        let name = this.refs.name.value;
        let email = this.refs.email.value;
        let pass = this.refs.pass.value;
        let company = this.refs.company.value

        firebase.auth().createUserWithEmailAndPassword(email, pass).then((user) => {
            firebase.database().ref('company/' + firebase.auth().currentUser.uid ).set({
                username: name,
                company: company,
            }).then( (e) => { 
                this.props.history.push('/company/companyprofile'); 
            })
                console.log(user);
                alert('sucessfully singed up');
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage); 
    });
    }
    render(){
        return (
            <div className='App'>
                <input className='input' type="text" ref='name' placeholder='Name' /> <br />
                <input className='input' type="text" ref='company' placeholder='Company Name' /> <br />
                <input className='input' type="email" ref='email' placeholder='Email' /> <br />
                <input className='input' type="password" ref='pass' placeholder='Password' /> <br />
                <input className='btn-btn' type="submit" onClick={this.signu.bind(this)} />
            </div>
        )
    }    
}

class CompanyLogIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            showSignIn: false,
            showSignUp: false
        }
    }

    buttonpressi(){
        this.setState({showSignIn: true})
    }

    buttonpressu(){
        this.setState({showSignUp: true})
    }    

    singnout(){
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            }, function(error) {
            console.error('Sign Out Error', error);
            });
    }

    render(){
        if(this.state.showSignIn){
             return (
                <div className='App'>
                    <h1 className='whitecolor'>Welcome to Signin form</h1>
                    <CompanySignIn  {...this.props} />
                </div>
                )
        }

        else if (this.state.showSignUp){
            return (
                <div className='App'>
                    <h1 className='whitecolor'>Welcome to signup form</h1>
                    <CompanySignUp {...this.props} />
                </div>
                )
        }

        else{
        return(
            <div className='App'>
                <h1 className='whitecolor'>Welcome Company</h1>
                <div><button className='btn-btn' onClick={this.buttonpressi.bind(this)}> SIGNIN </button></div>             
                <button className='btn-btn' onClick={this.buttonpressu.bind(this)}> SIGNUP </button>
            </div>
        )}
    }
}

export default CompanyLogIn;
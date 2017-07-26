import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../App.css';
import Dropzone from 'react-dropzone';
// import request from 'superagent';

class Studentinfo extends Component {
    constructor(){
        super();
        this.state = {
            image:'',
            resume:'',
            fName: '',
            lName:'',
            email:'',
            userTel: ''
        }
    }

    submitData(e){
        e.preventDefault();
        // let image = this.refs.picture.value;
        // let resume = this.refs.cv.value;
        let name = this.refs.fname.value;
        let add = this.refs.add.value;
        let email = this.refs.email.value;
        let userTel = this.refs.usertel.value;
        let education = this.refs.edu.value;
        let employment = this.refs.emp.value;
        let yearExp = this.refs.yexperiance.value;
        
        const dbref = firebase.database().ref('student/' + firebase.auth().currentUser.uid ).set({
            userfname: name,
            adress: add,
            email: email,
            telephone: userTel,
            education: education,
            employment: employment,
            yearExp: yearExp
            // profile_picture : imageUrl
        }).then( (e) => { 
            this.props.history.push('/student/studentprofile'); 
        })
    };

    singnout(){
        firebase.auth().signOut().then((e) => {
            this.props.history.push('/');
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        })
    };

    // onImageDrop(e){
    //     console.log('fileuploaded')
    // }
       
    
    render(){
        return(
            <div className='App'>
                <h1 className='whitecolor'> Submit Your Details </h1>
                
                {/*<Dropzone style={{ position: 'absolute', top:'120', left: '20' ,background:'white', opacity:'.9', border: '2px dashed  grey', height:'200px', width:'20%'}}
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop.bind(this)}>
                    <p>Drop an image or click to select a file to upload.</p>
                </Dropzone> */}
                
                <input className='input' type="text" placeholder='Full Name' ref='fname' /><br/>
                <input className='input' type="text" placeholder='Adress' ref='add' /><br/>
                <input className='input' type="text" placeholder='Email' ref='email' /><br/>
                <input className='input' type="text" placeholder='Phone Number' ref='usertel' /><br/>
                <input className='input' type="text" placeholder='Current Eduction' ref='edu' /><br/>
                <input className='input' type="text" placeholder='Current Employment' ref='emp' /><br/>
                <p className='whitecolor'>How many years of Experiance <input type="number" ref='yexperiance' min="0" max='50'/></p>
                
                <button style={{marginRight: '20px'}} className='btn-btn' onClick={this.submitData.bind(this)}> Submit </button>
                <button className='btn-btn' onClick={this.singnout.bind(this)}> signout</button>
                

                {/*<input type="file" name="pic" accept="image/*" placeholder='upload picture' ref='picture'/><br/>*/}
                {/*<input type="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf" ref='cv'/><br/>*/}

            </div>
    
        )
    }
}
export default Studentinfo;

    

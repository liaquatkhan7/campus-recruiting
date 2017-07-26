import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../App.css';


class Jobposted extends Component{
    
    jobpost(e){
        e.preventDefault()
        let jobtitle = this.refs.title.value;
        let exp = this.refs.exp.value;
        let salary = this.refs.salary.value;
        let company = this.refs.company.value;
        let description = this.refs.description.value;
        
        let obj={
            uid: firebase.auth().currentUser.uid,
            jobtitle: jobtitle,
            experience: exp,
            salary: salary,
            company:company,
            description: description
        }
        
        console.log( obj.uid +  ' - ' + obj.jobtitle + ' - ' + obj.experience + ' - ' + obj.salary + ' - ' +  obj.company + ' - ' + obj.description )
        
        let reference = firebase.database().ref()
        reference.child("jobs").push(obj)
        
        alert('Job posted sucessfully')
    }

    back(){
            this.props.history.push('/company/companyprofile');
    };

    render(){
        return(
            <div className='App'>
                <h1 className='whitecolor'>Post Your Job Here</h1>
                <input className='input' type="text" ref='title' placeholder='Job Title'/><br/>
                <input className='input' type="text" ref='exp' placeholder='Experiance'/><br/>
                <input className='input' type="text" ref='salary' placeholder='Salary'/><br/>
                <input className='input' type="text" ref='company' placeholder='Company'/><br/>
                
                <textarea className='textarea' cols="30" rows="10" ref='description' placeholder='Enter Full Job Discription Here...'></textarea><br/>
                
                <button style={{marginRight: '5px'}} className='btn-btn' onClick={this.jobpost.bind(this)}>POST JOB</button>
                <button className='btn-btn' onClick={this.back.bind(this)}> BACK </button>
                <button className='btn-btn btn-hide'>Post Another Job</button><br/>
            </div>
        )
    }
}
export default Jobposted;
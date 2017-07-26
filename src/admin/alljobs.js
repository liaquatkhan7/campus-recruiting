import React,{Component} from 'react';
import * as firebase from "firebase";


class Alljobs extends Component{
        constructor(){  
        super()
        this.state = {
            username:'',
            email: '',
            adress:'',
            education: '',
            employment: '',
            telephone: '',
            experiance: '',
            
            arrs:[],
            data: '',
            keys: [],
            
        }}

componentDidMount() {
        firebase.database().ref('/jobs/').once('value').then(snap => {
            var mainObj = snap.val();
            var arrs = []
            var keys = []
            for(let a in mainObj){
                keys.push(a)
                arrs.push(mainObj[a])
            }
                this.setState({arrs,keys})
                console.log(this.state.arrs, this.state.keys)
        })}

    onDelete(ind){
        let studentNo = this.state.keys[ind]
        firebase.database().ref('student').child(studentNo).remove(
            function (error) {
                if (!error) {
                console.log("remove from firebase")
            }
            
            else{
                console.log('not removed')
            } 
        })}    

    render(){
        return (
        <div>
            <h1>ALL JOBS</h1>
                <ul>
                    {this.state.arrs.map((job,ind)=>(
                        <table key={job.userfname}>
                            <tbody>
                            <tr>
                                <th>Company</th>
                                <th>{job.company}</th>
                            </tr>
                            <tr>
                                <td>Job Title</td>
                                <td>{job.jobtitle}</td>
                            </tr>
                            <tr>
                                <td>Experiance</td>
                                <td>{job.experience}</td>
                            </tr>
                            <tr>
                                <td>Salary</td>
                                <td>{job.salary}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{job.description}</td>
                            </tr>
                            <tr>
                                <td><button onClick={this.onDelete.bind(this, ind)}> DELETE </button></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table> 
                        ))}    
                </ul>
                </div>
        )
    }
}

export default Alljobs;




























import React,{Component} from 'react';
import '../App.css';
import * as firebase from "firebase";
// import CVView from "../views/CVView";
// import Loading from "../Loading";

class Allstudents extends Component{

    constructor(){
        super();
        this.render.bind(this);
        this.componentDidMount.bind(this);
        this.state={
            arrs:[],
            data: '',
            keys: [],
            companyName: ''
        }
    }


    componentDidMount(){
        firebase.database().ref('/student/').once('value').then(snap => {
            var mainObj = snap.val();
            var arrs = []
            var keys = []

            for(let a in mainObj){
                keys.push(a)
                arrs.push(mainObj[a])
            }

                this.setState({arrs,keys});
                console.log(this.state.arrs, this.state.keys);
            })
            
            firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let userid = firebase.auth().currentUser;
                    console.log(userid.uid);
                    console.log(user);
                    firebase.database().ref('company/' + userid.uid).on('value', (snap) => {
                    let userObj = snap.val();
                    // this.setState({
                    //     companyName: userObj.company
                    // })
            })
                } else {
                // No user is signed in.
                console.log('sign In first')
            }
        });
    }

    onDelete(ind){
        let studentNo = this.state.keys[ind]
        // let uid = this.auth().currentUser.uid;
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
    return(
            <div className='App'>
                <h1 className='whitecolor'> Welcome Admin </h1>
                {/*<button className='btn-btn' onClick={this.jobpost.bind(this)}> Post a Job </button>*/}
                <h2 className='whitecolor'>All Students</h2>
                <ul>
                    {
                    this.state.arrs.map((stu,ind)=>(
                        <table key={stu.userfname} style={{marginBottom:'5px'}}>
                            <tbody>
                            <tr>
                                <th>Name</th>
                                <th>{stu.userfname}</th>
                            </tr>
                            <tr>
                                <td>Adress</td>
                                <td>{stu.adress}</td>
                            </tr>
                            <tr>
                                <td>Number</td>
                                <td>{stu.telephone}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{stu.email}</td>
                            </tr>
                            <tr>
                                <td>Education</td>
                                <td>{stu.education}</td>
                            </tr>
                            <tr>
                                <td>Employment</td>
                                <td>{stu.employment}</td>
                            </tr>
                            <tr>
                                <td>Education</td>
                                <td>{stu.education}</td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={this.onDelete.bind(this, ind)}>Delete</button>
                                </td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table> 
                        ))
                    }    
                </ul>
                {/*<button onClick={this.signout.bind(this)} className='btn-btn' style={{marginRight: '5px'}}>Signout</button>*/}
            </div>
    )}}







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
        <div className='App'>
            <h2 className='whitecolor'>ALL JOBS</h2>
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



class AdminDashboard extends Component{
    constructor(){
        super();
        this.state = {
            login: false,
            uid: ''
        }
    }

    signin(e){
        e.preventDefault();
        
        let email = this.refs.email.value;
        let pass = this.refs.pass.value;
        
        firebase.auth().signInWithEmailAndPassword(email, pass).then( (result) => {
            let uid = firebase.auth().currentUser.uid;
            let adminuid = 'J7BTOQ93APP5IYQyo1ZJ4ftVdtT2'
            if(uid == adminuid){
                alert('signinsucessfull')
                this.setState({
                    login: true
                })
            }
            else{
                alert("INCORRECT EMAIL OR PASSWORD")
            }
            console.log(result);
            
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    }

    signout(){
        firebase.auth().signOut().then((e) => {
            this.props.history.push('/');
            console.log('Signed Out sucessfull');
        }, (error) => {
             console.error('Sign Out Error', error);
        });
    }

    render(){
        
        if(this.state.login){
            return (
            <div>
                <Allstudents />
                <Alljobs/>
                <button onClick={this.signout.bind(this)}>SIGNOUT</button>
            </div>)
        }

        else{
            return(
            <div>
                <input type="text" ref='email' placeholder='EMAIL' />
                <input type="text" ref='pass' placeholder='PASSWORD' />
                <button onClick={this.signin.bind(this)}> SIGNIN </button>
            </div>)}        
        
    }
}

export default AdminDashboard;
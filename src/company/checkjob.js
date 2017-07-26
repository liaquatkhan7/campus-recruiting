import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../App.css';
import { ListGroup, PageHeader,ListGroupItem, Table } from 'react-bootstrap';

// class Applied extends Component {

//     // componentDidMount(){
//     //     firebase.auth().onAuthStateChanged( (e) => {
//     //         let userid = firebase.auth().currentUser.uid;
//     //         console.log(userid);

//     //         let refroo = firebase.database().ref().child('jobs').on("value", (snap) => {
//     //             let incoming = snap.val();
//     //         })
//     //     })
//     // }
    
//     componentDidMount(i){
//         // var uid = firebase.auth().currentUser.uid;
//         const rootRef= firebase.database().ref();
//         const speedRef = rootRef.child('jobs/');

//         speedRef.on('value',snap => {
//             var count = 0;
//             var userobj = snap.val();
//             var key = Object.keys(userobj);
//             console.log(key);
        
//         for(var i = 0; i < key.length; i++){
//             var k = key[i];
//             let applyJob = userobj[k].Apply; 
//             console.log(applyJob)
//         }
//     })}

//     render(){
//         return(
//             <h1>Applied</h1>
//         )
//     }
// }

class Yourjobs extends Component {
    constructor(){
        super();
        this.state = {
            arr: [],
            keys: [],
            applyval: [],
            applykey: []
        }
    }

    componentDidMount(){
    firebase.auth().onAuthStateChanged( (e) => {
        firebase.database().ref().child('jobs').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on("value", (snap)=>{
            var dataSnapshot = snap.val();
            var keys = Object.keys(dataSnapshot)
            var vals = [];
            
            for(var i in dataSnapshot){ 
                vals.push(dataSnapshot[i])
            }
            
            let apply = vals[0].Apply;
            let applykey = Object.keys(apply);
            let applyvals = [];

            for(var a in apply){
                applyvals.push(apply[a])
            }
            
            this.setState({
                arr:vals, 
                keys,
                applyval: applyvals,
                applykey
            })
            console.log(this.state.arr)
            console.log(this.state.applyval)
            
        })
        });
    }

    back(e){
        this.props.history.push('/company/companyprofile');
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
        return(
            <div className='App'>
                <h1 className='whitecolor'>Your Jobs</h1>
                
                {this.state.arr.map((jobs, index) => (
                    <div key={index}>
                        <ListGroup>
                            <ListGroupItem bsStyle="info" header="Company"> {jobs.company} </ListGroupItem>
                            <ListGroupItem bsStyle="info" header="Title"> {jobs.jobtitle}</ListGroupItem>
                            <ListGroupItem bsStyle="info" header="Salary"> {jobs.salary}</ListGroupItem>
                            <ListGroupItem bsStyle="info" header="Experiance"> {jobs.experience}</ListGroupItem>
                            <ListGroupItem bsStyle="info" header="Description"> {jobs.description}</ListGroupItem>
                        </ListGroup>
                        <h4 className='whitecolor'>Applied by</h4>    
                        {this.state.applyval.map( (val, indx) => {
                        return (
                            <div key={indx}>
                            <p style={{fontWeight:"bold", color:'white'}}>{indx+1}</p>
                            <p style={{fontWeight:"bold",color:'white', letterSpacing:'1'}}>name: {val.userfname}</p>
                            <p style={{fontWeight:"bold",color:'white', letterSpacing:'1'}}>Phone: {val.telephone}</p>
                            <p style={{fontWeight:"bold",color:'white', letterSpacing:'1'}}>Email: {val.email}</p>                                
                            </div>
                            )
                    })}
                    </div>
                ))}
                

                <button className='btn-btn' style={{marginRight:'5'}} onClick={this.back.bind(this)}> BACK </button>
                <button className='btn-btn' onClick={this.signout.bind(this)}> SIGNOUT </button>
            </div>
        )
    }
}

export default Yourjobs; 
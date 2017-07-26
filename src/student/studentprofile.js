import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../App.css';
import { 
    Button, 
    Grid, 
    Row, 
    Col, 
    Table, 
    Image, 
    Thumbnail, 
    PageHeader, 
    Navbar,
    NavItem,
    Nav,
    ListGroup,
    ListGroupItem } from 'react-bootstrap';
import Thumbnailimage from '../Placeholder_person.png';

class Studentprofil extends Component {
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
            
        }
    }

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
        })


    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let userid = firebase.auth().currentUser;
                
                console.log(userid.uid);
                console.log(user);
                
                firebase.database().ref('student/' + userid.uid).on('value', (snap) => {
                let userObj = snap.val();
                
                this.setState({
                    username: userObj.userfname,
                    email: userObj.email,
                    adress: userObj.adress,
                    education: userObj.education,
                    employment: userObj.employment,
                    telephone: userObj.telephone,
                    experiance: userObj.yearExp
                })
        })
            } else {
            // No user is signed in.
            console.log('sign In first')
        }
    });

}

    Apply(index){
     var currentUser = firebase.auth().currentUser;
     console.log("Current user " + currentUser);

     var currentId = firebase.auth().currentUser.uid;
     console.log("Current ID "+currentId);
        
        var rootRef = firebase.database().ref();
        
        const speedRef = rootRef.child("student/" + currentId);
        
        speedRef.on("value",snap=>{
        
        var values = snap.val();
        
        let obj = (snap.val() || {
        
        name: values.userfname,
        
        email: values.email,
        
        UserId:currentId
        
    });
    
    console.log("values.name" + values.userfname);
    
    console.log("value.Email" + values.email);
    
    // var rootRef = firebase.database().ref();

    const speedRef = rootRef.child( "jobs/" + this.state.keys[index] + "/Apply/" + currentId).set(obj)
          
    })
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
        return (<div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Campus Recrument</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    
                    <Nav pullRight>
                        <NavItem  pullRight eventKey={1} href="#" onClick={this.signout.bind(this)}>Sign out</NavItem>
                    </Nav>
                </Navbar>

                <PageHeader className="whitecolor">Welcome <small>{this.state.username}</small></PageHeader>

                <Grid>
                    <Row className='show-grid'>
                        <Col xs={6} md={3}>
                            <Thumbnail href="#" alt="171x180" src={Thumbnailimage}>
                                <h2>{this.state.username}</h2>
                            </Thumbnail>

                            <ListGroup>
                                <ListGroupItem href='#'>Name: <b> {this.state.username}</b></ListGroupItem>
                                <ListGroupItem href='#'>Email: <b> {this.state.email}</b></ListGroupItem>
                                <ListGroupItem href='#'>Adress: <b> {this.state.adress}</b></ListGroupItem>
                                <ListGroupItem href='#'>Education: <b> {this.state.education}</b></ListGroupItem>
                                <ListGroupItem href='#'>Employment: <b> {this.state.employment}</b></ListGroupItem>
                                <ListGroupItem href='#'>Telephone: <b> {this.state.telephone}</b></ListGroupItem>
                                <ListGroupItem href='#'>Experiance: <b> {this.state.experiance}</b></ListGroupItem>
                            </ListGroup>
                        </Col>

                        <Col xs={12} md={9}>
                            {this.state.arrs.map((job,ind)=>(
                                <Table key={job.company} responsive striped bordered condensed hover>
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
                                        <td><button onClick={this.Apply.bind(this, ind)} > Apply </button></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </Table>
                                ))}    
                        </Col>
                    {/*<button className='btn-btn' onClick={this.signout.bind(this)}>Signout</button>*/}
                </Row>
                </Grid>
            </div>
        ) 
    }
}
export default Studentprofil;
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
    Nav } from 'react-bootstrap';
import Thumbnailimage from '../Placeholder_person.png';

class Companyprofil extends Component {
    // constructor(){  
    //     super()
    //     this.state = {
    //         adress: [],
    //         education: [],
    //         email: [],
    //         employment: [],
    //         telephone: [],
    //         userfname: [],
    //         yearExp: [],
    //         userdata: []
    //     }
    // }

    // componentWillMount() {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             let userid = firebase.auth().currentUser;
    //                 console.log(userid.uid);
    //                 console.log(user);
    //                 firebase.database().ref('student/' + userid.uid).on('value', (snap) => {
    //                 let userObj = snap.val();
    //                 console.log(userObj);
    //                 console.log(userObj.userfname);
    //                 console.log(userObj.email);
    //                 console.log(userObj.adress);
    //                 console.log(userObj.education);    
    //                 console.log(userObj.employment);
    //                 console.log(userObj.telephone);       
    //                 console.log(userObj.yearExp);
    //         })
    //             } else {
    //             // No user is signed in.
    //             console.log('sign In first')
    //         }
    //     });
    // }

    constructor(){
        super();
        this.render.bind(this);
        this.componentDidMount.bind(this);
        this.state={
            arrs:[],
            data: '',
            keys: [],
            companyName: '',
            username: ''
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
                    // console.log(userid.uid);
                    // console.log(user);
                    firebase.database().ref('company/' + userid.uid).on('value', (snap) => {
                    let userObj = snap.val();
                    this.setState({
                        companyName: userObj.company,
                        username: userObj.username
                    })
                    // console.log(this.state.companyName)
            })
                } else {
                // No user is signed in.
                console.log('sign In first')
            }
        });
}

    jobpost(e){
        this.props.history.push('/company/jobpost');
    }
    
    signout(){
        firebase.auth().signOut().then((e) => {
            this.props.history.push('/');
            console.log('Signed Out sucessfull');
        }, (error) => {
             console.error('Sign Out Error', error);
        });
    }

    myjobs(e){
        this.props.history.push('/company/yourjobs')
    }

render(){
        return(
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Campus Recrument</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    
                    <Nav>
                        <NavItem eventKey={2} href="#" onClick={this.jobpost.bind(this)}> Post Job </NavItem>
                        <NavItem eventKey={2} href="#" onClick={this.myjobs.bind(this)}> Posted Jobs </NavItem>                        
                    </Nav>
                    <Nav pullRight>
                        <NavItem  pullRight eventKey={1} href="#" onClick={this.signout.bind(this)}>Sign out</NavItem>
                    </Nav>
                </Navbar>
                
                <PageHeader className="whitecolor">Welcome <small>{this.state.companyName}</small></PageHeader>  
                
                <Grid>
                <Row className='show-grid'>
                    <Col xs={6} md={3}>
                       
                        <Thumbnail href="#" alt="171x180" src={Thumbnailimage}>
                            <h2>{this.state.username}</h2>
                        </Thumbnail>
                        <button className='btn-btn' onClick={this.jobpost.bind(this)}> Post a Job </button>
                    </Col>
                
                
                    <Col xs={12} md={9}>
                    {
                    this.state.arrs.map((stu,ind)=>(
                        <Table key={stu.userfname} responsive striped bordered condensed hover>
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
                            </tbody>
                        </Table> 
                        ))
                    }    
                
                        <button onClick={this.signout.bind(this)} className='btn-btn' style={{marginRight: '5px'}}>Signout</button>
                        <button onClick={this.myjobs.bind(this)} className='btn-btn'>My Posted</button>
                    </Col>
            </Row>
            </Grid>
            </div>
        )
}}
export default Companyprofil;
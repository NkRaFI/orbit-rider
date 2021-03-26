import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';
import firebaseConfig from './firebase.config';
import './Login.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import fbImg from '../../images/fb.png';
import googleImg from '../../images/google.png';
import Header from '../Header/Header';
import { LoggedInUserContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one
  }

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    photo:'',
    password:'',
    error: '',
    success: false,
  })

  const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
  console.log(loggedInUser)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      history.replace(from);
    })
    .catch(err => console.log(err.message))
  }

  const handleFbSignIn = () => {
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const {displayName, email, photoURL} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      history.replace(from);
    })
    .catch((error) => console.log(error.message));
  }

  const handleSubmit = e => {
      if(newUser && user.email && user.password){
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          updateUserName(user.name);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUser = {...user};
          newUser.success = false;
          newUser.error = error.message;
          setUser(newUser);
        });
      }

      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUser = {...user};
          newUser.success = false;
          newUser.error = error.message;
          setUser(newUser);
        });
      }
      e.preventDefault();
  }

  const [confirmPassword, setConfirmPassword] = useState("");
  const handleBlur = (e) => {
    // console.log(e.target.name, e.target.value)
    let isFiledValid = true;
    if(e.target.name === "email"){
      isFiledValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === "password"){
      isFiledValid = /^(?=.*\d).{6,}$/.test(e.target.value);
    }
    if(isFiledValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
    if(e.target.name === "confirmPassword"){
        e.target.value === user.password ? setConfirmPassword(false) : setConfirmPassword(true);
    }
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then((res)=> {
      console.log("user name successfully added to firebase")
    }).catch((error)=> {
      console.log(error);
    });
  }

  return (
    <div className="container">
        <Header></Header>
        <div>
            <div className="d-flex justify-content-center my-5">
                <div>
                    <p className="text-center" style={{color: 'red'}}>{user.error}</p>
                    {
                        user.success && <p className="text-center" style={{color: 'green'}}> Successfully {newUser ? "created account, Please login" : "logged in"}</p>
                    }
                    <form className="loginForm px-4 py-3" onSubmit={handleSubmit}>
                        <h3>Login</h3>
                        {newUser && <input className="form-control" type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>}
                        <br/>
                        <input className="form-control" type="email" name="email" onBlur={handleBlur} placeholder="Your Email" required/>
                        <br/>
                        <input className="form-control" type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
                        <br/>
                        {
                            newUser &&
                            <div>
                                <input className="form-control" type="password" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm Password" required/>
                                <br/>
                                {confirmPassword && <p className="text-center text-danger"><small>Password didn't matched, retype and click outside the filed</small></p>}
                            </div>
                        }
                        {
                            !newUser &&
                            <div className="d-flex justify-content-between my-2">
                                <div>
                                    <input className="mr-2" type="checkbox" name="" id="rememberMe"/>
                                    <label htmlFor="rememberMe">Remember me</label>
                                </div>
                                <Link to="/login" className="text-danger">Forgot Password</Link>
                            </div>
                        }
                        <input disabled={newUser ? confirmPassword : false} className="form-control bg-danger text-white" type="submit" value={newUser ? "Create an account" : "Login"}/>

                        <div className="d-flex justify-content-center createAccount">
                            <p>{newUser ? "Already have an account?" : "Don't have an account?"}</p>
                            <p onClick={()=> setNewUser(!newUser)} className="text-danger"><u>{newUser ? "Login":"Create an account"}</u></p>
                        </div>
                    </form>

                    <div className="my-3">
                        <p className="text-center">Or</p>
                        <hr/>
                        <button className="loginBtn" onClick={handleSignIn}><img className="btnImgGG" src={googleImg} alt=""/>Continue with google</button>
                        <br/>
                        <button className="loginBtn" onClick={handleFbSignIn}><img className="btnImgFB" src={fbImg} alt=""/> Continue with Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
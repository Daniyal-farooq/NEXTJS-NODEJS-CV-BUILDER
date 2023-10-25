import React from 'react'
import styles from '../styles/signup.module.css'
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import { useState , useEffect } from 'react';
import Router from 'next/router';
import { Roboto, Montserrat, Poppins } from 'next/font/google'
import axios from 'axios';
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'],
  style: ['normal'],
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['800', '600'],
  style: ['normal'],
});
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import the library
import { library } from '@fortawesome/fontawesome-svg-core';

// import your icons

import { faCode, faHighlighter } from '@fortawesome/free-solid-svg-icons';

import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { log } from 'console';
import { toast } from "react-toastify";


const signup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const userAuth= async() =>{
    let tokenid
    tokenid= await localStorage.getItem("token")
    if (tokenid) {
      const headers = {
        Authorization: `Bearer ${tokenid}`
      }
      await axios.post('http://localhost:8000/authorization',{} , { headers} )
      .then((response)=>{
        if(response.data.status = "success"){
          console.log("User = " , response.data.user);
          Router.push("/latest")
        }
        else{
          alert(response.data.message)
        }
      })
    } else {
        
    //   Router.push("/signup")
    }
    
  }

useEffect(() => {
    userAuth();
  }, [])

  const onCreateHandler = async () => {
    try {
      if (!email || !password || !firstName || !lastName) {
        console.log("ENTER ALL FIELDS");
        toast.warn( "Please fill all the fields.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

      } else {
       
        const user = {
          firstName,
          lastName,
          email,
          password,
        }
        const serverResponse = await axios.post('http://localhost:8000/createUser', user)
        console.log("Response is : ", serverResponse.data);
        if (serverResponse.data.success == true) {
          toast.success( serverResponse.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          Router.push('/login')
        }else{
          toast.warn( serverResponse.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }

      }

    } catch (error) {
      console.log("--------------");
      console.log(error);
      console.log("--------------");

    }
  }
  return (


    <>
      <main className={styles.image}>
       
        <div className="container">
          <div className="row">
            <div className={`col-12 ${styles.cont}`} >
              <div className="row" style={{ marginBottom: "0px" }}>
                <p style={{ textAlign: "center", fontSize: "35px", margin: "0px 0px 0px 0px" , padding:"0px 0px 0px 0px"  }}>LOGO</p>
                <p style={{ textAlign: "center", fontSize: "15px",margin: "0px 0px 0px 0px" , padding:"0px 0px 0px 0px" }}>Start for free</p>
                <p style={{ textAlign: "center", fontSize: "35px", color: "#2578AC", margin: "0px 0px 0px 0px" , padding:"0px 0px 0px 0px" , lineHeight:"1"}}>Create new Account</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <form action="">
                      <div className={`form-group ${styles.first}`} >
                        <label style={{ display: "inline-block", padding: "none" }} className={`  ${styles.font15px}`} >First name</label>
                        <input style={{ height: "30px", marginTop: "5px" }} onChange={(e) => { setFirstName(e.target.value) }} type="email" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter first name" />
                      </div>
                      <div className={`form-group ${styles.first}`} style={{ marginTop: "10px" }}>
                        <label style={{ display: "inline-block", padding: "none" }} className={`${styles.font15px}`} >Email address</label>
                        <input style={{ height: "30px", marginTop: "5px" }} onChange={(e) => { setEmail(e.target.value) }} type="email" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <form action="">
                      <div className={`form-group ${styles.second}`} >
                        <label style={{ display: "inline-block", padding: "none" }} className={`  ${styles.font15px}`} >Last name</label>
                        <input style={{ height: "30px", marginTop: "5px" }} onChange={(e) => { setLastName(e.target.value) }} type="email" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter last name" />
                      </div>
                      <div className={`form-group ${styles.second}`} style={{ marginTop: "10px" }}>
                        <label style={{ display: "inline-block", padding: "none" }} className={`${styles.font15px}`}>Password</label>
                        <input style={{ height: "30px", marginTop: "5px" }} onChange={(e) => { setPassword(e.target.value) }} type="email" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter password" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-4"></div>
                <div className="col-md-4" style={{ alignItems: "center", }}><div className={styles.btndiv} style={{ margin: "auto" }}><button onClick={onCreateHandler} className={styles.btnInDiv} style={{ width: "70%", backgroundColor: "#2578AC", border: "none", color: "white" }} >Create Account</button></div></div>
                <div className="col-4"></div>
              </div> */}


              <div className="row ">
                <div className="col-4"></div>
                <div className="col-md-4 " style={{ marginTop:"10px"}}>
                  <div onClick={onCreateHandler} className={styles.CreateBtn} style={{color:"white"  , height:"40px" , margin:"auto" , padding:"8px 0px 0px 0px" , borderRadius:"5px" , fontSize:"15px"  ,verticalAlign:"center", textAlign:"center" , backgroundColor: "#2578AC",}}>Create Account</div>
                </div>

                <div className="col-4"></div>
              </div>


              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-md-6">
                  <div>
                    <form action="">

                      <div className={`form-group ${styles.first}`} >
                        <div style={{ width: "100%", textAlign:"center" }}><div className={styles.login} style={{ margin: "auto", border: "1px solid black", borderRadius: "6px" , width:"100%" , height:"40px" }}><FontAwesomeIcon style={{ width: "20px"   }} icon={faGoogle} /><span  style={{position:"relative",top:"1px" , left:"5px" ,fontSize:"20px"  }}  >Login with Google</span></div></div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <form action="">

                      <div className={`form-group ${styles.second}`} >
                        <div style={{ width: "100%", textAlign:"center" }}><div className={`${styles.login} `}  style={{ margin: "auto", border: "1px solid black", borderRadius: "6px", width:"100%" , backgroundColor:"blue" , height:"40px" }}><FontAwesomeIcon style={{ width: "20px", color: "white" }} icon={faFacebook} /><span className={styles.method} style={{position:"relative",top:"1px" , left:"5px" ,fontSize:"20px",color:'white' }}>Login with FaceBook</span></div></div>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
              <div onClick={() => { Router.push("/login") }} className={`container ${styles.container2} animate-bounce pb-3 pt-3`} style={{ marginTop: "10px", marginBottom: "10px" }}>
                <span  style={{ fontSize: "10px", lineHeight: "5px" }}>Already have an account?</span>
                <span  style={{ fontSize: "10px", lineHeight: "5px", fontWeight: "800", color: "#2578AC" }}>Sign in</span>
              </div>

            </div>
          </div>
        </div>

      </main>
    </>
  )
}

export default signup
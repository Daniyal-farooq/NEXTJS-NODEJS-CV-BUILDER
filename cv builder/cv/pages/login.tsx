import React, { useState, useEffect } from 'react'
import styles from '../styles/welcome.module.css'
import Button from 'react-bootstrap/Button';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
// import your icons
import { faCode, faHighlighter } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import Router from 'next/router';
import { toast } from 'react-toastify';

const welcomeBack = () => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loginError, setLoginError] = useState("")


    const userAuth = async () => {
        let token
        token = await localStorage.getItem("token")
        if (token) {
            const headers = {
                Authorization: `Bearer ${token}`
            }
            await axios.post('http://localhost:8000/authorization', {}, { headers })
                .then((response) => {
                    if (response.data.status = "success") {
                        console.log("User = ", response.data.user);
                        Router.push("/latest")
                    }
                    else {
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



    const onLogInHandler = async () => {
        if (!password || !email) {
            setError("Enter both Fields")
            console.log("Enter both Fields");
            toast.error("Enter both Fields", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } else {
            try {

                await axios.post("http://localhost:8000/login", { password, email }).then((response) => {
                    // console.log("res :::" , response);
                    // console.log("response.data.status" ,response.data.status );
                    if (response.data.success == true) {
                        toast.success('Welcome back!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        console.log("token", response.data.token);
                        localStorage.setItem("token", response.data.token)
                        Router.push('/latest')
                    } else  {
                        // console.log("status", response.data.status);
                        toast.warn(response.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                       
                    }

                    // const user = {
                    //     email,
                    //     password,
                    // }
                    // if (response.data.status == "success") {
                    //     console.log("token", response.data.token);
                    //   localStorage.setItem("token", response.data.token)
                    //     Router.push('/latest')
                    // } else if (response.data.status == "Failed") {
                    //     setLoginError(response.data.message)
                    //     toast.warn('Wrong credentials!', {
                    //         position: "top-right",
                    //         autoClose: 5000,
                    //         hideProgressBar: false,
                    //         closeOnClick: true,
                    //         pauseOnHover: true,
                    //         draggable: true,
                    //         progress: undefined,
                    //         theme: "dark",
                    //         });
                    // } else {
                    //     setLoginError("someting went wrong at server please try again")
                    // }
                });
            } catch (error) {
                console.log("--------------");
                console.log(error);
                console.log("--------------");
            }

        }
    }

    return (
        <>      <main className={styles.image}>
            <div className='container'>
                <div className="row" >
                    <div className={`col-12 ${styles.cont}`}>
                        <div style={{ width: "70%", margin: "auto" }}>
                            <div className="row" style={{ marginBottom: "0px" }}>
                                <p style={{ textAlign: "center", fontSize: "35px", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px" }}>LOGO</p>
                                <p style={{ textAlign: "center", fontSize: "35px", color: "#2578AC", margin: "0px 0px 0px 0px", padding: "0px 0px 0px 0px", lineHeight: "1" }}>Create new Account</p>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div>
                                        <form action="">
                                            <div className={`form-group ${styles.first}`} >
                                                <label style={{ display: "inline-block", padding: "none", fontSize: "15px", paddingBottom: "0px" }} className={`  ${styles.font15px}`}  >Email</label>
                                                <input style={{ height: "30px", marginTop: "0px" }} placeholder='Enter email here...' onChange={(e) => { setEmail(e.target.value) }} type="email" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                            <div className={`form-group ${styles.first}`} style={{}}>
                                                <label style={{ display: "inline-block", padding: "none", fontSize: "15px", paddingBottom: "0px" }} className={`${styles.font15px}`} >Password</label>
                                                <input style={{ height: "30px", marginTop: "0px" }} placeholder='Enter password here...' onChange={(e) => { setPassword(e.target.value) }} type="text" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                            <div className="row ">
                                <div className="col-4"></div>
                                <div className="col-md-4 " style={{ marginTop: "10px" }}>
                                    <div className={styles.CreateBtn} onClick={onLogInHandler} style={{ color: "white", height: "40px", margin: "auto", padding: "8px 0px 0px 0px", borderRadius: "5px", fontSize: "15px", verticalAlign: "center", textAlign: "center", backgroundColor: "#2578AC", }}>Sign in</div>
                                </div>

                                <div className="col-4"></div>
                            </div>


                            <div className="row" style={{ marginTop: "10px", marginBottom: "10px" }}>
                                <div className="col-md-6 mt-2">
                                    <div className='hover:cursor-pointer'>
                                        <form action="">


                                            <div className='w-full border-[1px] border-black rounded-md text-center pt-2 pb-2'><FontAwesomeIcon style={{ width: "20px" }} icon={faGoogle} />Sign in with Google</div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <div>
                                        <form action="">


                                            <div className='w-full border-[1px] border-black rounded-md text-center pt-2 pb-2 text-white bg-blue-600'><FontAwesomeIcon style={{ width: "20px", color: "white" }} icon={faFacebook} />Sign in with Meta</div>

                                        </form>
                                    </div>

                                </div>
                                <div onClick={() => { Router.push("/signup") }} className={`container ${styles.container2} hover:cursor-pointer animate-bounce`} style={{ marginTop: "10px", marginBottom: "10px", textAlign: "center" }}>
                                    <span style={{ fontSize: "10px", lineHeight: "5px" }}>Don't have an account?</span>
                                    <span style={{ fontSize: "10px", lineHeight: "5px", fontWeight: "800", color: "#2578AC" }} className='animate-bounce'>Sign up</span>
                                </div>
                            </div>

                        </div>

                    </div></div>





                {/* <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <p style={{ fontSize: "50px", fontWeight: "bold", textAlign: "center" }}>LOGO</p>
                            <p style={{ fontSize: "20px", fontWeight: "bolder", textAlign: "center", color: "#2578AC" }}>Welcome Back</p>
                            <div className={styles.inner}>
                                <div className="row">
                                    <div className="col-12">
                                        <label >Email</label>
                                    </div>
                                    <div className="col-12"> <input  className={styles.inpt} type='text' /></div>
                                    <div className="col-12" style={{ marginTop: "20px" }}>
                                        <label >Password</label>
                                    </div>
                                    <div className="col-12"> <input onChange={(e) => { setPassword(e.target.value) }} className={styles.inpt} type='text' /></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-md-4"> <Button onClick={onLogInHandler} style={{ margin: "30px 0px 30px 0px" }} className={styles.btn} variant="primary">Sign in</Button>{' '}</div>
                        <div className="col-4"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mx-auto" style={{ margin: "0px 0px 30px 0px", backgroundColor: "white", textAlign: "center", borderRadius: "10px", border: "1px solid black", padding: "5px" }}><FontAwesomeIcon style={{ width: "40px" }} className={styles.icn} icon={faGoogle} />Signin with Google</div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mx-auto" style={{ margin: "0px 0px 30px 0px", backgroundColor: "#0039CD", textAlign: "center", borderRadius: "10px", border: "1px solid black", padding: "5px", color: "white" }}><FontAwesomeIcon style={{ width: "40px", color: "white" }} className={styles.icn} icon={faFacebook} />Signin with Facebook</div>
                    </div> */}
            </div>
        </main>
        </>
    )
}

export default welcomeBack
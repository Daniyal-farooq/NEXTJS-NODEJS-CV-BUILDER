import React from 'react'
import Image from 'next/image';
import styles from "../styles/latest.module.css"
import { Roboto, Montserrat, Poppins } from 'next/font/google'
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600'],
  style: ['normal'],
});

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect , useState } from 'react';
import axios from 'axios';
import Router from 'next/router';


 

const logOutHandler = ()=>{
  localStorage.removeItem('token');
  Router.push("/login")
}


const latest = () => {
  const router = useRouter();
  const ViewAllHandler=()=>{
    router.push('/Viewall');
  }
useEffect(() => {
  userAuth();
}, [])

  const userAuth= async() =>{
    let tokenid
    tokenid=  localStorage.getItem("token")
    if (tokenid) {
      const headers = {
        Authorization: `Bearer ${tokenid}`
      }
      await axios.post('http://localhost:8000/authorization',{} , { headers} )
      .then((response)=>{
        if(response.data.status = "success"){
          console.log("User = " , response.data.user);
           setLogOut(true)
        }
        else{
          alert(response.data.message)
        }
      })
    } else {
      router.push("/signup")
    }
    
  }
  
  const [logOut , setLogOut] = useState(false)

  return (
    <>
      <main>
        <div >
          <div  >
            <Navbar expand="md" style={{ backgroundColor: "#4FA9E3" }}>
              <Container style={{ backgroundColor: "#4FA9E3" }} >
                <Navbar.Brand href="#home" style={{ color: "white" ,fontFamily:"Montserrat"}}>Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home" style={{ color: "white" , fontFamily:"Montserrat" }}>Home</Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#features" style={{ color: "white" , fontFamily:"Montserrat"  }}>About</Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#pricing" style={{ color: "white" , fontFamily:"Montserrat"  }}>Template</Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#pricing" style={{ color: "white" , fontFamily:"Montserrat" }}>Feedback</Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    <Nav.Link href="#home"></Nav.Link>
                    {logOut && <>  <Nav.Link href="#pricing" style={{ color: "white" , fontFamily:"Montserrat" }} onClick={logOutHandler}>Logout</Nav.Link></>}
                   
                  </Nav>
                </Navbar.Collapse>
                <Image
                  src="/bot.jpg"
                  width={30}
                  height={30}
                  alt="Picture of the author"
                  style={{ borderRadius: "20px" }}
                />
              </Container>
            </Navbar>
          </div>
          <section>
            {/* <button onClick={userAuth}>token checker</button> */}
            <div className={`container-fluid ${styles.section}`}>
              <div className="row">
                <div className="col-1"></div>
                <div className="col-md-5">
                  <p style={{ fontSize: "20px", color: "color: #000000" }}>Unlock your Dream Job</p>
                  {/* <p className={styles.heading} style={{fontSize:"40px" , color:"#2578AC" , fontWeight:"bold"}}>Design your Future</p> */}
                  <p className={styles.heading} style={{ fontSize: "40px", color: "#2578AC", fontWeight: "bold" , fontFamily:"Montserrat"  }}>Design your Future<br />With your CV Builder!</p>
                  <button className={styles.btn} onClick={()=>{router.push('/form2')}}>Create Resume</button>
                </div>
                <div className="col-md-5"><Image
                  src="/file.png"
                  width={626}
                  height={418}
                  alt="Picture of the author"
                  layout='responsive'
                  style={{ borderRadius: "30px" }}
                /></div>
                <div className="col-1"></div>

              </div>
            </div>

          </section>
          <section className={`${styles.spacer}`}>
            <div className={`container`} style={{ paddingTop: "100px" }}>
              <h3 style={{ textAlign: "center", color: "white",fontFamily:"Montserrat" }}>Check the Latest Jobs</h3>
            </div>


          </section>

          <section>
            <div className="container" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
              <div className="row">
                <p style={{ textAlign: "center", color: "#111827", fontSize: "40px" , fontFamily:"Montserrat"  }}>Show your Skills and Personality</p>
                <div style={{ margin: "auto", width: "auto" }}>
                  <span style={{ color: "#111827", fontSize: "40px" , fontFamily:"Montserrat"  }} >with</span><span style={{ color: "#2578AC", fontSize: "40px" , fontFamily:"Montserrat"  }} > our Collection</span></div>

              </div>
              <div className="row">
                <div className="col-2 offset-10"><button onClick={ViewAllHandler} className={styles.btn2}>View all</button></div>
              </div>

              <div className={`row ${styles.r}`}>
                <div className="col-sm-4" >
                  <div className={styles.c1}><Image
                    src="/Cream Blue Aesthetic Business CV Resume 7.jpg"
                    width={626}
                    height={418}
                    alt="Picture of the author"
                    layout='responsive'
                    style={{}}
                  /></div>
                </div>
                <div className="col-sm-4" >
                  <div className={styles.c2}><Image
                    src="/Cream Blue Aesthetic Business CV Resume 7.jpg"
                    width={626}
                    height={418}
                    alt="Picture of the author"
                    layout='responsive'
                    style={{ height: "100%" }}
                  /></div>
                </div>
                <div className="col-sm-4" >
                  <div className={styles.c3}><Image
                    src="/Cream Blue Aesthetic Business CV Resume 7.jpg"
                    width={626}
                    height={418}
                    alt="Picture of the author"
                    layout='responsive'
                    style={{}}
                  /></div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className={`container-fluid `} style={{ marginBottom: "100px" }}>
              <div className={`row justify-content-evenly ${styles.blue}`}>
                <div className="col-xl-5" style={{ padding: "15px", borderRadius: "10px", backgroundColor: "#2578AC" }}>
                  <div style={{ border: "3px solid white", padding: "10px", borderRadius: "10px", height: "100%" }}>
                    <h3 style={{ color: "white", marginTop: "20px" , fontFamily:"Montserrat"  }}>About Us</h3>
                    <p style={{ color: "white", font: "15px" , fontFamily:"Montserrat"  }}>Welcome to [CV Builder Website Name], where we believe
                      in the power of a well-crafted CV. Our user-friendly platform
                      offers a seamless experience for creating professional resumes
                      that help you stand out in today's competitive job market.
                      With our customizable templates and expert guidance,
                      we're here to support you on your journey to career success.
                      Start building your standout CV with us today.</p>
                  </div>
                </div>
                <div className="col-xl-5" style={{ border: "5px solid #2578AC", borderRadius: "10px", padding: "15px" }}>
                  <Image
                    src="/Rectangle 4195.jpg"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    layout='responsive'
                    style={{ border: "1px solid #2578AC", borderRadius: "10px" }}
                  />
                </div>
              </div>
            </div>


          </section>
          <section>
            <div className="container">
              <div className="row">
                <div className="col-md-6" >
                  <div className={`${styles.columnContent1} `}  >
                    <div>
                      <div ><h3>Why choose our Platform</h3>
                        <p>Discover the power of our CV builder platform and unlock your professional potential. With an easy and intuitive
                          interface, professional templates tailored to various industries, and extensive customization options, creating a
                          standout CV has never been easier. Our real-time template customization feature allows you to visualize and adjust your
                          CV as you enter your information. Rest assured that your data is securely stored in our database, and our admin control
                          ensures up-to-date job postings and information. We value your feedback and continuously strive to improve our platform.
                          Best of all, our platform is completely free and conveniently accessible across all devices. Choose our platform
                          and take the first step towards a successful career.</p></div>
                    </div>
                  </div>
                  
                </div>
                <div className="col-md-6">
                  <div className={`${styles.columnContent2}`} >
                    <div className={styles.subox}>
                      <h3>Professional Templates:</h3>
                      <p>Our platform offers a wide selection of professionally designed templates tailored to various industries and job roles. Each template
                        is carefully crafted to showcase your skills and experiences effectively. With our templates, you can create a visually appealing CV that
                        stands out to potential employers.</p>
                    </div>

                    <div className={styles.subox}>
                      <h3> User Feedback:</h3>
                      <p>We value your feedback and continuously strive to improve our platform. We provide a dedicated user feedback section where you can share
                        your
                        thoughts, suggest enhancements, and report any issues you may encounter. Your feedback helps us make the platform even better.</p>
                    </div>
                  
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className={`${styles.columnContent1}`} style={{ marginRight: "0px" }} >
                    <div className={styles.subox}>
                      <h3>Easy Inituitive:</h3>
                      <p>Our CV builder platform is designed with simplicity in mind. We understand that creating a CV can
                        be a daunting task, so we've developed an intuitive interface that guides you through the process step by step. No technical expertise
                        is required, making it accessible to users of all backgrounds.</p> </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={`${styles.columnContent2}`} >

                    <div className={styles.subox}>
                      <h3> Responsive Design: </h3>
                      <p>Our platform is designed to be responsive and optimized for different devices, including desktops, laptops, tablets, and mobile phones.
                        You can access and work on your CV anytime, anywhere, with a seamless user experience across all devices.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.b}>
            <div className="container">
              <div className={`row ${styles.bottomHeading}`}>
                <h3>Voice Your Experience: Help Us Shape a Better Platform</h3>
                <p>We value your feedback and continuously strive to improve our platform.</p>
              </div>
            </div>
            
            
            
            
            <div className="container">
            <div className="row" style={{paddingBottom:"40px"}}>
              <div className="col-lg-6 m-auto" style={{ border: "1px solid white", borderRadius: "10px",padding:"60px"}}>
                <div className="row">
                  <div className="col-lg-6" style={{  }}>
                    <div className={styles.bottomForm1}>
                      <form>
                        <div className="mb-3">
                          <label className="form-label" style={{color:" #FFFFFF",fontSize:"15px",fontWeight:"500"}}>First Name</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" style={{color:" #FFFFFF",fontSize:"15px",fontWeight:"500"}}>Last Name</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6" style={{ }}>
                    <div className={styles.bottomForm2}>
                      <form>
                        <div className="mb-3">
                          <label className="form-label" style={{color:" #FFFFFF",fontSize:"15px",fontWeight:"500"}}>Email address</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" style={{color:" #FFFFFF",fontSize:"15px",fontWeight:"500"}}>Phone Number</label>
                          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mx-auto" style={{  }}>
                    <div className="mb-3">
                      <label  className="form-label" style={{color:" #FFFFFF",fontSize:"15px",fontWeight:"500"}}>Feedback</label>
                      <textarea className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            </div>





          </section>
        </div>
      </main>
    </>
  )
}

export default latest
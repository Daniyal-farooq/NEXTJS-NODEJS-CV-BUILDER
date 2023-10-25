import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import styles from '../styles/viewall.module.css'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
// import your icons
import { faCode, faHighlighter, faPhone, faLocation, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

import TEMP1 from './../components/temp1'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import View from './pdfview';
import axios from 'axios';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { Font } from '@react-pdf/renderer';

Font.register({ family: "Rondal", src: "/assets/RondalRegular-K7ORW.otf" })
Font.register({ family: "Rondal-Bold", src: "/assets/RondalBold-2O4lW.otf" })
Font.register({ family: "Montaners", src: "/assets/Montaners-3zpML.otf" })


const Viewall = () => {
    const [localStorageData, setLocalStorageData] = useState('');
    // const imageData = localStorage.getItem('imageData');
    // const [imageData, setImageData] = useState(null);
    const [cvData, setCvData] = useState(null);

    const [selected, setSelected] = useState(false)
    const values = ['md-down',];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const [auth , setAuth] = useState(false)

    const logOutHandler = ()=>{
        localStorage.removeItem('token');
        Router.push("/welcomeBack")
      }
      

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
              setAuth(true)
              setLogOut(true)
            }
            else{
              alert(response.data.message)
            }
          })
        } else {
            setAuth(false)
          Router.push("/signup")
        }
        
      }

    useEffect(() => {
        userAuth();
      }, [])
      
        



    
    const onClickT1handler = () => {
        setSelected(true)
        Router.push('/pdfview')
    }

    const onClickT2handler = () => {
        setSelected(true)
        Router.push('/pdfview2')
    }

    useEffect(() => {
        // const storedImageData = localStorage.getItem('imageData');
        // if (storedImageData) {
        //   setImageData(storedImageData);
        // }
        //     const img = localStorage.getItem('draft2');
        //     setCvData( img)
        //    console.log(cvData);

        const draftData = localStorage.getItem("draft2");
        if (draftData) {
            const parsedData = draftData ? JSON.parse(draftData) : null;
            setCvData(parsedData);
            console.log(cvData);
        }

        //    const img = localStorage.getItem('imageData');
        //    setImageData(img)

    }, []);
    useEffect(() => {
        const data = localStorage.getItem('imageData');
        setLocalStorageData(data);
    }, []);
    const person = {
        name: "Roma Mitchell",
        contact: "123-456-7890",
        email: "sample@gmail.com",
        profession: "MARKETING MANAGER",
        address: "123 Anywhere St.roads",
        skills: ["Web Design", "Design thinking", "Wireframe Creation", "Front-End coding", "Problem solving"],
        education: [{ level: "SECONDARY SCHOOL", name: "Really Great High School", year: "2010-2014" },
        { level: "Bachelor Of Technology", name: "Really Great High School", year: "2010-2014" }],
        languages: ["English", "Spanish", "German"],
        objective: "Results-driven marketing manager with a proven track record of delivering strategic marketing initiatives and achieving business growth. Seeking a challenging position that allows me to leverage my expertise in developing and executing comprehensive marketing strategies, managing cross-functional teams, and driving measurable results. I aim to utilize my strong analytical skills, creativity, and consumer insights to contribute to the success and profitability of an innovative organization in the marketing industry.",
        experience: [{ job: "APPLICATION DEVELOPER", name: "Really Great Application", duration: "2016 - present", tasks: ["Database administration and website", "Build a logic for a streamlined ad-serving platform", "Educational institutions"] },
        { job: "ALALYSIS CONTENT", name: "Really Great Application", duration: "2010 - 2014", tasks: ["Database administration and website", "Build a logic for a streamlined ad-serving platform", "Educational institutions"] }]

    }

    const [logOut , setLogOut] = useState(false)
    return (
        <> {auth &&  <main>
            <div>
                <div>
                    <Navbar expand="md" style={{ backgroundColor: "#4FA9E3" }}>
                        <Container style={{ backgroundColor: "#4FA9E3" }} >
                            <Navbar.Brand href="#home" style={{ color: "white", fontFamily: "Montserrat" }}>Navbar</Navbar.Brand>
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
                                    <Nav.Link href="#home" style={{ color: "white", fontFamily: "Montserrat" }}>Home</Nav.Link>
                                    <Nav.Link href="#home"></Nav.Link>
                                    <Nav.Link href="#home"></Nav.Link>
                                    <Nav.Link href="#features" style={{ color: "white", fontFamily: "Montserrat" }}>About</Nav.Link>
                                    <Nav.Link href="#home"></Nav.Link>
                                    <Nav.Link href="#home"></Nav.Link>
                                    <Nav.Link href="#pricing" style={{ color: "white", fontFamily: "Montserrat" }}>Template</Nav.Link>
                                    <Nav.Link href="#home"></Nav.Link>
                                    <Nav.Link href="#home"></Nav.Link>
                                    <Nav.Link href="#pricing" style={{ color: "white", fontFamily: "Montserrat" }}>Feedback</Nav.Link>
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
                <header>
                    <div>
                        <h1 className={styles.heading1}>Discover Unique CV Templates That Tell Your Tale</h1>
                        <p className={styles.text1}>Choose one of our most liked templates</p>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className={`col-sm-6 ${styles.resTemp} ${styles.firstTemplate}`} onClick={onClickT1handler} style={{backgroundColor:"whitesmoke"  }}>
                            <div style={{border:"1px solid black"}}>
                            <section style={{ fontFamily: "Monsterrat" }}>
                                <div className="container" style={{  paddingBottom: "30px" }}>
                                    <div className={`row `}>
                                        <div className={`col-4 ${styles.triangle}`}></div>
                                    </div>
                                    <div className={`row `} style={{ backgroundColor: " #AFDDFF" }}>
                                        <div className="col-6" style={{ marginTop: "-20px" }}>


                                            <Image className="img-fluid ml-9" alt='yourpic' width={200} height={200} src={localStorageData} style={{ marginLeft: "30px", borderRadius: "150px", height: "70px", width: "70px", border: "1px solid black" }} />
                                            {cvData && <>

                                                <p style={{ fontSize: "8px", marginBottom: "0px" }}><Image height={100} width={100} alt='email' src="/email4.png" style={{ height: "10px", width: "10px", marginTop: "0px" }} /><span >{cvData.email}</span></p>
                                                <p style={{ fontSize: "8px", marginBottom: "0px" }}><Image height={100} width={100} alt='phone' src="/phone.png" style={{ height: "10px", width: "10px" }} /><span >{cvData.contact}</span></p>
                                                <p style={{ fontSize: "8px", marginBottom: "0px" }}><Image height={100} width={100} alt='address' src="/location.png" style={{ height: "10px", width: "10px" }} /><span >{cvData.address}</span></p>
                                            </>}
                                            {cvData && cvData.skill && <><div>
                                                <div style={{ backgroundColor: "blue", borderRadius: "5px", textAlign: "center", marginTop: "5px", fontSize: "10px", marginBottom: "0px" }}><p style={{ marginBottom: "5px" }}>SKILLS</p></div>
                                                {cvData.skill.map(({ name, level }) => (
                                                    <div key={name} >
                                                        {name && level && (
                                                            <>
                                                                <p className={styles.fontStyle}>{name} ({level})</p>

                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div></>}

                                            {cvData && cvData.education && cvData.education.length > 0 && <><div>
                                                <div style={{ backgroundColor: "blue", borderRadius: "5px", textAlign: "center", marginTop: "5px", fontSize: "10px", marginBottom: "5px" }}><p style={{ marginBottom: "5px" }}>Education</p></div>
                                                {cvData.education.map(({ degree, year, field, institutionName }) => (
                                                    <div key={degree} style={{ fontSize: "15px", marginTop: "0px", marginBottom: "0px" }} >
                                                        {degree && year && (
                                                            <>
                                                                <p className={styles.fontStyle} style={{ fontWeight: "bold" }}>{degree}</p>
                                                                <p className={styles.fontStyle}>{institutionName}</p>
                                                                <p className={styles.fontStyle}  >{field}</p>
                                                                <p className={styles.fontStyle} >{year}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div></>}

                                            {/* Language */}

                                            {cvData && cvData.language && cvData.language.length > 0 && <>
                                                <div style={{ fontSize: "15px" }}>
                                                    <div >
                                                        <p style={{ backgroundColor: "blue", borderRadius: "5px", textAlign: "center", marginTop: "5px", marginBottom: "5px", fontSize: "10px" }} >LANGUAGES</p>
                                                    </div>
                                                    {cvData.language.map((languageName) => (
                                                        <div key={languageName} >
                                                            {languageName && (
                                                                <p className={styles.fontStyle}  >{languageName}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div></>
                                            }
                                            {/* Language */}




                                        </div>
                                        <div className="col-6" style={{ paddingLeft: "0px" }}>
                                            <div style={{ width: "100%", border: "1px solid black", height: "100%" }}>
                                                {cvData && cvData.name && <>
                                                    <p style={{ fontSize: "20px", color: "blue", margin: "0px" }}>{cvData.name}</p></>}
                                                {cvData && cvData.designation && <>
                                                    <p style={{ fontSize: "10px", color: "black", fontWeight: "bold", margin: "0px" }}>{cvData.designation}</p></>}
                                                {cvData && cvData.objective && <>
                                                    <p style={{ fontSize: "7px", color: "black", margin: "0px" }}>{cvData.objective}</p></>}

                                                {/* EXPERIENCE */}
                                                {cvData && cvData.experience && cvData.experience.length > 0 && <>
                                                    <div>
                                                        <div >
                                                            <p style={{ backgroundColor: "blue", borderRadius: "5px", textAlign: "center", marginTop: "5px", fontSize: "10px", marginBottom: "5px" }} >EXPERIENCE</p>
                                                        </div>
                                                        {cvData.experience.map(({ jobTitle, companyName, experienceStarting, experienceEnding }) => (
                                                            <div key={jobTitle} >
                                                                {jobTitle && companyName && experienceStarting && experienceEnding && (
                                                                    <>
                                                                        <p className={styles.fontStyle}><p className={styles.fontStyle} style={{ fontWeight: "bold" }}>{jobTitle}</p><p className={styles.fontStyle}> at {companyName}</p></p>
                                                                        <p className={styles.fontStyle}>{experienceStarting} TO {experienceEnding}</p>

                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>}
                                                {/* EXPERIENCE */}
                                                {/* CERTIFICATES */}
                                                {cvData && cvData.certificate && cvData.certificate.length > 0 && <>
                                                    <div>
                                                        <div  >
                                                            <p style={{ backgroundColor: "blue", borderRadius: "5px", textAlign: "center", marginTop: "5px", fontSize: "10px", marginBottom: "5px" }} >CERTIFICATES</p>
                                                        </div>
                                                        {cvData.certificate.map(({ name, date, organisation  }) => (
                                                            <div key={name} >
                                                                {name && date && organisation && (

                                                                    <div style={{ fontSize: "15px" }}>
                                                                        <p className={styles.fontStyle} style={{ fontWeight: "bold" }} >{name}</p>
                                                                        <p className={styles.fontStyle}>{organisation}</p>
                                                                        <p className={styles.fontStyle}>{date}</p>
                                                                    </div>)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>}
                                                {/* CERTIFICATES */}
                                                {/* REFERENCE */}
                                                {cvData && cvData.reference && <>
                                                    <div>
                                                        <div >
                                                            <p style={{ backgroundColor: "blue", borderRadius: "5px", textAlign: "center", marginTop: "5px", fontSize: "10px", marginBottom: "5px" }}>REFERENCES</p>
                                                        </div>
                                                        <p className={styles.fontStyle}>{cvData.reference}</p>

                                                    </div>
                                                </>}
                                                {/* REFERENCE */}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                            </div>
                        </div>









                        <div className={`col-sm-6 ${styles.resTemp}`} onClick={onClickT2handler} style={{ border: "1px solid black" ,  fontFamily: "Montaners" , backgroundColor:"whitesmoke"   }}>
                            {/* #d69d0d #36322a  */}
                            <>
                                                    
                                <div className="container" style={{ fontFamily: "Montaners" }}>
                                    <div className="row">
                                        <div className='col-7' style={{ position: "relative", marginTop: "20px" }}>
                                            {/* Image */}
                                            <Image src={localStorageData} alt='useImage' height={100} width={100} style={{ position: "absolute", top: 0, left: 0, zIndex: "2", borderRadius: "100px" , border:"5px solid black" }} />

                                            {/* Div underneath the image */}
                                            <div className={styles.picBox} style={{  }}>
                                            {cvData && <>
                                                <p  style={{color:"white" , fontSize:"15px" , marginBottom:"0px" , marginTop:"10px" , fontWeight:"bold" , textAlign:"center", zIndex: "1"  , position:"relative" , top:"-5px"}}>{cvData.name}</p>
                                                <p  style={{color:"white" , marginTop:"0px" , fontSize:"10px"  , textAlign:"center", zIndex: "1", position:"relative" , top:"-10px"}}>{cvData.designation}</p>
                                                </>}
                                            </div>

                                            {/* Rest of the content underneath the div */}
                                            {/* Add your other content here */}
                                            <section>

                                                <div style={{ }}>
                                                    {cvData && <>
                                                    <p style={{margin: "100px  0px 0px 0px" , padding:"0px" , fontSize:"7px" , color:"black" }}>{cvData.objective}</p>
                                                    </>}
                                                    {/* euducation start */}
                                                    {cvData && cvData.education && cvData.education.length > 0 && <><div style={{ }}>
                                                        <div style={{ backgroundColor: "#d69d0d", textAlign: "center", marginTop: "5px", fontSize: "10px", marginBottom: "5px" }}><p style={{ marginBottom: "5px" }}>Education</p></div>
                                                        {cvData.education.map(({ degree, year, field, institutionName }) => (
                                                            <div key={degree} style={{ fontSize: "15px", marginTop: "0px", marginBottom: "0px" }} >
                                                                {degree && year && (
                                                                    <>
                                                                        <div className="row">
                                                                            <div className="col-6" style={{ }}>
                                                                                <div className="row">
                                                                                    <div className="col-1" style={{  }}><div style={{ height: "5px", width: "5px", backgroundColor: "#d69d0d", marginTop: "5px" }}></div></div>
                                                                                    <div className="col-7" style={{  padding: "0px" }}><p style={{ fontSize: "7px", paddingLeft: "0px", margin: "0px", fontWeight: "bold" }}>{year}</p><p style={{ fontSize: "7px", padding: "0px", margin: "0px", fontWeight: "bold" }}>{degree}</p></div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6" style={{paddingLeft: '0px' }}>
                                                                                <p style={{ fontSize: "7px", paddingLeft: "0px", margin: "0px" }}>{institutionName}</p>
                                                                                <p style={{ fontSize: "7px", paddingLeft: "0px", margin: "0px" }}>{field}</p>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div></>}
                                                    {/* Education end */}

                                                    {/* Experience start */}
                                                    {cvData && cvData.experience && cvData.experience.length > 0 && <><div style={{ marginTop: "0px" }}>
                                                        <div style={{ backgroundColor: "#d69d0d", textAlign: "center", marginTop: "5px", fontSize: "10px", marginBottom: "5px" }}><p style={{ marginBottom: "5px" }}>Experience</p></div>
                                                        {cvData.experience.map(({ jobTitle, companyName, experienceStarting, experienceEnding }) => (
                                                            <div key={experienceStarting} style={{  fontSize: "15px", marginTop: "0px", marginBottom: "0px" }} >
                                                                {jobTitle && experienceStarting && (
                                                                    <>
                                                                        <div className="row">
                                                                            <div className="col-6" style={{ }}>
                                                                                <div className="row">
                                                                                    <div className="col-1" style={{ }}><div style={{ height: "5px", width: "5px", backgroundColor: "#d69d0d", marginTop: "5px" }}></div></div>
                                                                                    <div className="col-7" style={{  padding: "0px" }}><p style={{ fontSize: "7px", paddingLeft: "0px", margin: "0px", fontWeight: "bold" }}>{experienceStarting}</p><p style={{ fontSize: "7px", padding: "0px", margin: "0px", fontWeight: "bold" }}>{experienceEnding}</p></div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6" style={{  paddingLeft: '0px' }}>
                                                                                <p style={{ fontSize: "7px", paddingLeft: "0px", margin: "0px" }}>{jobTitle}</p>
                                                                                <p style={{ fontSize: "7px", paddingLeft: "0px", margin: "0px" }}>{companyName}</p>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div></>}
                                                    {/* Experience end */}

                                                    {/* Certificates start */}
                                                    {cvData && cvData.certificate && cvData.certificate.length > 0 && <><div style={{ marginTop: "0px" }}>
                                                        <div style={{ backgroundColor: "#d69d0d", textAlign: "center", marginTop: "5px", fontSize: "10px", marginBottom: "5px" }}><p style={{ marginBottom: "5px" }}>Certificates</p></div>
                                                        {cvData.certificate.map(({ name, date, organisation}) => (
                                                            <div key={name} style={{  fontSize: "15px", marginTop: "0px", marginBottom: "0px" }} >
                                                                {name && date && (
                                                                    <>
                                                                        <div className="row">
                                                                            <div className="col-6" style={{ }}>
                                                                                <div className="row">
                                                                                    <div className="col-1" style={{ }}><div style={{ height: "5px", width: "5px", backgroundColor: "#d69d0d", marginTop: "5px" }}></div></div>
                                                                                    <div className="col-7" style={{  padding: "0px" }}><p style={{ fontSize: "7px", paddingLeft: "0px", margin: "0px", fontWeight: "bold" }}>{date}</p></div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-6" style={{  paddingLeft: '0px' }}>
                                                                                <p style={{ fontSize: "7px", paddingLeft: "0px", margin: "0px" }}>{name}</p>
                                                                                <p style={{ fontSize: "7px", paddingLeft: "0px", margin: "0px" }}>{organisation}</p>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div></>}
                                                    {/* Certificates end */}
                                                    
                                                </div>
                                            </section>
                                        </div>


                                        <div className="col-5" style={{ border: "1px solid black", backgroundColor: "#36322a", color: "white" }}>
                                            <div style={{ width: "90%", margin: "auto", marginTop: "100px" }}>
                                                
                                                {/* contact me start */}
                                                <div>
                                                <div style={{ width: "100%", border: "1px solid #d69d0d", fontSize: "7px", padding: "4px 0px 4px 0px", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>Contact Me</div>
                                                {cvData && <>
                                                    <p style={{ fontSize: "8px", fontWeight: "bold", marginBottom: "0px", marginLeft: "15px" }}>Address</p>
                                                    <p style={{ fontSize: "7px", marginBottom: "0px" }}><Image height={100} width={100} alt='address' src="/location.png" style={{ height: "10px", width: "10px", marginRight: "5px" }} /><span >{cvData.address}</span></p>
                                                    <p style={{ fontSize: "8px", fontWeight: "bold", marginBottom: "0px", marginLeft: "15px" }}>Phone</p>
                                                    <p style={{ fontSize: "7px", marginBottom: "0px" }}><Image height={100} width={100} alt='contact' src="/phone.png" style={{ height: "10px", width: "10px", marginRight: "5px" }} /><span >{cvData.contact}</span></p>
                                                    <p style={{ fontSize: "8px", fontWeight: "bold", marginBottom: "0px", marginLeft: "15px" }}>Email</p>
                                                    <p style={{ fontSize: "7px", marginBottom: "0px" }}><Image height={100} width={100} alt='email' src="/email4.png" style={{ height: "10px", width: "10px", marginTop: "0px", marginRight: "5px" }} /><span >{cvData.email}</span></p>


                                                </>}
                                                </div>
                                                {/* contact me end */}
                                            { /* skills */ }
                                                <div style={{ width: "100%", border: "1px solid #d69d0d", fontSize: "7px", padding: "4px 0px 4px 0px", textAlign: "center", marginTop: "10px", marginLeft: "auto", marginRight: "auto" }}>Pro Skills</div>
                                                {cvData && cvData.skill && (
                                                    <>
                                                        <div>
                                                            {cvData.skill.map(({ name, level }) => (
                                                                <div key={name}>
                                                                    {name && level && (
                                                                        <>
                                                                            <p className={styles.fontStyle}>{name}</p>

                                                                            {/* Use optional chaining (?.) to check if level is defined */}
                                                                            {level === "Beginner" && (
                                                                                <div style={{ border: "1px solid #d69d0d", height: "10px", width: "100%" }}>
                                                                                    <div style={{ backgroundColor: "#d69d0d", height: "100%", width: "25%" }}></div>
                                                                                </div>
                                                                            )}
                                                                            {level === "Intermediate" && (
                                                                                <div style={{ border: "1px solid #d69d0d", height: "10px", width: "100%" }}>
                                                                                    <div style={{ backgroundColor: "#d69d0d", height: "100%", width: "50%" }}></div>
                                                                                </div>
                                                                            )}
                                                                            {level === "Expert" && (
                                                                                <div style={{ border: "1px solid #d69d0d", height: "10px", width: "100%" }}>
                                                                                    <div style={{ backgroundColor: "#d69d0d", height: "100%", width: "90%" }}></div>
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </div>

            </div>

        </main>}
            

        </>
    )
}

export default Viewall



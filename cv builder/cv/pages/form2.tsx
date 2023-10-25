import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import styles from '../styles/form2.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
// import your icons
import { faCode, faHighlighter, faPhone, faLocation, faEnvelope, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { storage } from '../database'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import Router from 'next/router';
import { Font } from '@react-pdf/renderer';

Font.register({ family: "Rondal", src: "/assets/RondalRegular-K7ORW.otf" })
Font.register({ family: "Rondal-Bold", src: "/assets/RondalBold-2O4lW.otf" })
import styled from 'styled-components';
// import Router from 'next/router';
type Education = {
    degree: string;
    field: string;
    institution: string;
    year: string;
};

type Experience = {
    jobTitle: string;
    companyName: string;
    starting: Date;
    ending: Date;
    ongoing: boolean;
    // tasks: string[];
};
type Certificate = {
    organisation: string;
    nameOfCertificate: string;
    issueDate: Date;
}
type Skill = {
    title: string,
    level: string,
}
type Language = {
    languageName: string,
}

type Person = {
    imageURL: string,
    name: string;
    contact: string;
    email: string;
    designation: string;
    linkedin: string;
    address: string;
    objective: string;
    education: Education[];
    experience: Experience[];
    certificate: Certificate[];
    skills: Skill[];
    languages: Language[];
    reference: string;
};
const form2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen);
    const [skillName, setSkillName] = useState("");
    const [skillLevel, setSkillLevel] = useState("Beginner");
    const [theSkillForms, setTheSkillForms] = useState([]); // Initialize with an empty array
    const [editSkillIndex, setEditSkillIndex] = useState(-1);
    const [isSkillEditing, setIsSkillEditing] = useState(false);
    const [certificateName, setCertificateName] = useState("");
    const [certificateOrganisation, setCertificateOrganisation] = useState("");
    const [certificateDate, setCertificateDate] = useState("");
    const [theCertificateForms, setTheCertificateForms] = useState([]); // Initialize with an empty array
    const [editCertificateIndex, setEditCertificateIndex] = useState(-1);
    const [isCertificateEditing, setIsCertificateEditing] = useState(false);
    const [uploadError, setUploadError] = useState(false)
    const [imageURL, setImageURL] = useState("")
    const [URL, setURL] = useState("")
    const [imageData, setImageData] = useState(null);
    const [name, setName] = useState("");
    const [link, setlink] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [objective, setObjective] = useState("");


    const [reference, setReference] = useState("")
    //
    const [language, setLanguage] = useState('');
    const [languages, setLanguages] = useState([]);
    //
    const [languageForms, setLanguageForms] = useState([
        {
            languageName: "",
        }
    ])


    const [educationForms, setEducationForms] = useState([
        {
            institution: "",
            year: "",
            degree: "",
            field: "",
        }
    ]);

    const [experienceForms, setExperienceForms] = useState([
        {
            jobTitle: "",
            companyName: "",
            experienceStarting: "",
            experienceEnding: "",
        }
    ])
    const [certificateForms, setCertificateForms] = useState([
        {
            nameOfCertificate: "",
            organisation: "",
            issueDate: "",
        }
    ])
    const [skillForms, setSkillForms] = useState([
        {
            title: "",
            level: "",
        }
    ])


    //token verification
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
            Router.push("/signup")
          }
          
        }
    //toek nverification
    const [logOut , setLogOut] = useState(false)
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const dataURL = reader.result;
            setImageData(dataURL);
            localStorage.setItem('imageData', dataURL);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const logOutHandler = ()=>{
        localStorage.removeItem('token');
        Router.push("/welcomeBack")
      }
      

    const [skillCheck, setSkillCheck] = useState(false)


    //final skills satrt
    const addSkillHandler = () => {
        if (skillName.trim() !== "") {
            const newSkill = {
                name: skillName,
                level: skillLevel,
            };
            setTheSkillForms([...theSkillForms, newSkill]);
            setSkillName("");
            setSkillLevel("Beginner");
            setIsSkillEditing(false);
        }
    };

    const editSkillHandler = (index) => {
        const selectedSkill = theSkillForms[index];
        setSkillName(selectedSkill.name);
        setSkillLevel(selectedSkill.level);
        setEditSkillIndex(index);
        setIsSkillEditing(true);
    };

    const saveSkillHandler = () => {
        if (skillName.trim() !== "") {
            const updatedSkillForms = [...theSkillForms];
            if (isSkillEditing) {
                updatedSkillForms[editSkillIndex] = { name: skillName, level: skillLevel };
            } else {
                updatedSkillForms.push({ name: skillName, level: skillLevel });
            }
            setTheSkillForms(updatedSkillForms);
            setSkillName("");
            setSkillLevel("Beginner");
            setIsSkillEditing(false);
        }
    };

    useEffect(() => {
        const storedSkills = localStorage.getItem("skills");
        if (storedSkills) {
            setTheSkillForms(JSON.parse(storedSkills));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("skills", JSON.stringify(theSkillForms));
    }, [theSkillForms]);
    // final skills finish

    //final certificate start
    const addCertificateHandler = () => {
        if (certificateName.trim() !== "") {
            const newCertificate = {
                name: certificateName,
                date: certificateDate,
                organisation: certificateOrganisation,
            };
            setTheCertificateForms([...theCertificateForms, newCertificate]);
            setCertificateName("");
            setCertificateDate("");
            setCertificateOrganisation("");
            // setSkillLevel("Beginner");
            setIsCertificateEditing(false);
        }
    };

    const editCertificateHandler = (index) => {
        const selectedCertificate = theCertificateForms[index];
        setCertificateName(selectedCertificate.name);
        setCertificateDate(selectedCertificate.date);
        setCertificateOrganisation(selectedCertificate.organisation)
        setEditCertificateIndex(index);
        setIsCertificateEditing(true);
    };

    const saveCertificateHandler = () => {
        if (certificateName.trim() !== "") {
            const updatedCertificateForms = [...theCertificateForms];
            if (isCertificateEditing) {
                updatedCertificateForms[editCertificateIndex] = { name: certificateName, date: certificateDate, organisation: certificateOrganisation };
            } else {
                updatedCertificateForms.push({ name: certificateName, date: certificateDate, organisation: certificateOrganisation });
            }
            setTheCertificateForms(updatedCertificateForms);
            setCertificateName("");
            setCertificateDate("")
            setCertificateOrganisation("")
           
            setIsCertificateEditing(false);
        }
    };

    useEffect(() => {
        const storedCertificate = localStorage.getItem("certificate");
        if (storedCertificate) {
            setTheCertificateForms(JSON.parse(storedCertificate));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("certificate", JSON.stringify(theCertificateForms));
    }, [theCertificateForms]);

    //final certificate finish
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!name || !address || !email || !contact) {
            console.log("Enter name, address, email, contact and objective");
            setUploadError(true);

        } else {
            setUploadError(false)

            const person = {
                // imageURL: Url,
                name: name,
                link: link,
                address: address,
                designation: designation,
                email: email,
                contact: contact,
                language: languageForms.map((form) => ({
                    languageName: form.languageName,
                })),
                objective: objective,
                education: educationForms.map((form) => ({
                    degree: form.degree,
                    field: form.field,
                    year: form.year,
                    institutionName: form.institution,
                })),
                experience: experienceForms.map((form) => ({
                    jobTitle: form.jobTitle,
                    companyName: form.companyName,
                    experienceStarting: form.experienceStarting,
                    experienceEnding: form.experienceEnding,
                }))
              
                ,
                certificate: certificateForms.map((form) => ({
                    nameOfCertificate: form.nameOfCertificate,
                    issueDate: form.issueDate,
                    organisation: form.organisation,
                })),
               
                skill: skillForms.map((form) => ({
                    title: form.title,
                    level: form.level,
                })),
                reference: reference,
            };
           

            try {
                if (!imageData) {
                    // Check if imageData exists, you can handle the error accordingly
                    console.log("image did'nt upload");

                    return;
                }
                else {
                    // Generate a dynamic file name based on the current date and time
                    const date = new Date();
                    const fileName = `${date.getTime()}.jpg`;

                    // Create a reference to the Firebase storage bucket
                    const storageRef = ref(storage, 'images/' + fileName);

                    // Convert the data URL to a Blob
                    const response = await fetch(imageData);
                    const blob = await response.blob();

                    // Upload the image to Firebase Storage
                    await uploadBytes(storageRef, blob);

                    // Get the download URL of the uploaded image
                    const downloadURL = await getDownloadURL(storageRef);
                    const url: string = downloadURL;
                    setImageURL(url)
                    setURL(url)
                    // console.log("url in state : ", url);


                    // Log the download URL or store it in the state, etc.
                    // console.log('Image uploaded successfully!', url);

                    // console.log('Image uploaded successfully!');
                    const person2 = {
                        // imageURL: localStorage.getItem('formimage'),
                        imageURL: url,
                        name: name,
                        link: link,
                        address: address,
                        designation: designation,
                        email: email,
                        contact: contact,
                        language: languages,
                        objective: objective,
                        education: educationForms.map((form) => ({
                            degree: form.degree,
                            field: form.field,
                            year: form.year,
                            institutionName: form.institution,
                        })),
                        experience: experienceForms.map((form) => ({
                            jobTitle: form.jobTitle,
                            companyName: form.companyName,
                            experienceStarting: form.experienceStarting,
                            experienceEnding: form.experienceEnding,
                        })),

                        certificate: theCertificateForms,

                        skill: theSkillForms,
                        reference: reference,
                    };

                    // console.log("urllllll : ", url);
                    const serverResponse = await axios.post("http://localhost:8000/generate", person2)
                    console.log(serverResponse.data.message);
                    const personString2 = JSON.stringify(person2);
                    localStorage.setItem("draft2", personString2);
                    const draftData = localStorage.getItem("draft2");
                    const parsedData = draftData ? JSON.parse(draftData) : null;
                    // console.log("draft2 : ", parsedData);
                    // console.log(theSkillForms);
                    // console.log("skills : ", person2.skill);
                    Router.push('/Viewall')
                }


            } catch (error) {
                console.error('Error uploading image:', error);
            }



        }


    };

    const educationIncrementHandler = () => {
        setEducationForms([...educationForms, { institution: "", year: "", degree: "", field: "" }]);
    };

    const educationChangeHandler = (index, field, value) => {
        const updatedEducationForms = [...educationForms];
        updatedEducationForms[index] = {
            ...updatedEducationForms[index],
            [field]: value
        };
        setEducationForms(updatedEducationForms);

        // Save educationForms to local storage
        localStorage.setItem('educationForms', JSON.stringify(updatedEducationForms));
    };
    // experience
    const experienceIncrementHandler = () => {
        setExperienceForms([...experienceForms, { jobTitle: "", companyName: "", experienceStarting: "", experienceEnding: "" }]);
    };

    const experienceChangeHandler = (index, field, value) => {
        const updatedExperienceForms = [...experienceForms];
        updatedExperienceForms[index] = {
            ...updatedExperienceForms[index],
            [field]: value
        };
        setExperienceForms(updatedExperienceForms);
        // Save educationForms to local storage
        localStorage.setItem('experienceForms', JSON.stringify(updatedExperienceForms));
    };
 
    useEffect(() => {
        (async()=>{
            const serverResponse = await axios.post("http://localhost:8000/getDraft", localStorage.getItem("token"))
            console.log(serverResponse.data.status);
            
        })
        
       
        
        const LastData = localStorage.getItem("draft2");
        if (LastData) {
            const parsedData = LastData ? JSON.parse(LastData) : null;
            const LastName = parsedData.name;
            const LastEmail = parsedData.email;
            const LastContact = parsedData.contact;
            const LastLink = parsedData.link;
            const LastDesignation = parsedData.designation;
            // const LastLanguage = parsedData.language;
            const LastAddress = parsedData.address;
            const LastObjective = parsedData.objective;
            setName(LastName);
            setEmail(LastEmail);
            setContact(LastContact);
            setlink(LastLink);
            setDesignation(LastDesignation);
            setAddress(LastAddress);
            // setLanguageForms(LastLanguage);
            setObjective(LastObjective)
            setImageData(localStorage.getItem("imageData"))

            const storedEducationForms = localStorage.getItem('educationForms');
            // If there are stored educationForms, update the state with the retrieved data
            if (storedEducationForms) {
                setEducationForms(JSON.parse(storedEducationForms));
            }

            const storedExperienceForms = localStorage.getItem('experienceForms');
            // If there are stored experienceForms, update the state with the retrieved data
            if (storedExperienceForms) {
                setExperienceForms(JSON.parse(storedExperienceForms));
            }

            const storedCertificateForms = localStorage.getItem('certificateForms');
            // If there are stored certificateForms, update the state with the retrieved data
            if (storedCertificateForms) {
                setCertificateForms(JSON.parse(storedCertificateForms));
            }

         
            const storedLanguages = localStorage.getItem('languages');
            if (storedLanguages) {
                setLanguages(JSON.parse(storedLanguages));
            }
            //
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('languages', JSON.stringify(languages));
    }, [languages]);
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleLanguageAdd = () => {
        if (language.trim() !== '') {
            setLanguages([...languages, language]);
            setLanguage('');
        }
    };

    const handleLanguageRemove = (index) => {
        const updatedLanguages = [...languages];
        updatedLanguages.splice(index, 1);
        setLanguages(updatedLanguages);
    };

    const onReferenceChange = (e) => {
        const value = e.target.value;
        setReference(value);
        localStorage.setItem('reference', value);
    };
    useEffect(() => {
        const storedReference = localStorage.getItem('reference');
        if (storedReference) {
            setReference(storedReference);
        }
    }, []);
    /////
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const storedImage = localStorage.getItem('selectedImage');
        if (storedImage) {
            setSelectedImage(storedImage);
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const dataURL = reader.result;
            setImageData(dataURL);
            localStorage.setItem('imageData', dataURL);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    
   const tokenchecker = async()=>{
    const token:string = localStorage.getItem("token")
    console.log("t : " , token);
    
        const serverResponse = await axios.post("http://localhost:8000/getDraft", token)
        // console.log(serverResponse.data.status);
        // console.log(localStorage.getItem("token"));
        
        
    }
    return (

        <>
            <main >
                {/* <button onClick={tokenchecker}>send token </button> */}
                <div style={{ backgroundColor: "#CCE5FF" }}>
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
                        <div style={{ padding: "10px 0 10px 0" }}>

                            <h3 style={{ textAlign: "center", fontFamily: "monospace" }}>From Data to Design:</h3>
                            <h3 style={{ textAlign: "center", fontFamily: "monospace" }}>Craft Your Perfect CV in a Few Clicks</h3>
                        </div>
                        {/* PERSONAL/BASIC INFO FORM SECTION */}
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className={`col-12 mx-auto ${styles.backgroundColor}`} >
                                        <div className="container">
                                            <div className="row">

                                                <div className="col-md-4" >
                                                    <h3 style={{ color: "white", fontSize: "20px", textAlign: "center" }}>Basic information</h3>
                                                    <div className={styles.inner}>
                                                        {imageData ? <Image src={imageData} alt="Selected Image" height={150} width={150} style={{ borderRadius: "100px" }} /> : <Image
                                                            src="/white-color-solid-background-1920x1080.png"
                                                            width={150}
                                                            height={150}
                                                            alt="Picture of the author"
                                                            style={{ borderRadius: "100px" }}
                                                        />}
                                                        <div >
                                                            <label htmlFor="imageInput" style={{ borderRadius: "6px", fontSize: "15px", cursor: 'pointer', display: 'inline-block', padding: '5px', backgroundColor: '#003366', color: 'white' }}>
                                                                <FontAwesomeIcon icon={faUpload} className={styles.icon} style={{ color: "white" }} />Upload Image
                                                            </label>
                                                            <input type="file" id="imageInput" style={{ display: 'none' }} onChange={handleImageChange} /></div>
                                                     
                                                    </div>
                                                    <div >


                                                    </div>
                                                </div>

                                                <div className="col-md-8" >
                                                    <div style={{ width: "90%", margin: "auto" }}>
                                                        <div className="row">
                                                            <div className="col-md-6" >
                                                                <div className={styles.inner2}>
                                                                    <form> <div >
                                                                        <div>
                                                                            <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`}>Name</label>
                                                                            <input style={{ height: "30px", marginTop: "0px" }} value={name} placeholder='Name here...' onChange={(e) => { setName(e.target.value) }} type="text" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                            {uploadError && <p className={styles.required}>Name required</p>}
                                                                        </div>
                                                                        <div style={{ marginTop: "3px" }}>
                                                                            <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`}>LinkedIn Profile Link</label>
                                                                            <input style={{ height: "30px" }} value={link} placeholder='Link here...' onChange={(e) => { setlink(e.target.value) }} type="text" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                        </div>
                                                                        <div style={{ marginTop: "3px" }}>
                                                                            <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`}>Address</label>
                                                                            <input style={{ height: "30px" }} value={address} placeholder='Address here...' onChange={(e) => { setAddress(e.target.value) }} type="text" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                            {uploadError && <p className={styles.required}>Address required</p>}
                                                                        </div>
                                                                    </div></form>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6" >
                                                                <div className={styles.inner2}>
                                                                    <form> <div >
                                                                        <div >
                                                                            <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`}>Designation</label>
                                                                            <input style={{ height: "30px" }} value={designation} placeholder='Designation here...' onChange={(e) => { setDesignation(e.target.value) }} type="text" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                        </div>
                                                                        <div style={{ marginTop: "3px" }}>
                                                                            <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`}>Email address</label>
                                                                            <input style={{ height: "30px" }} value={email} placeholder='Email here...' onChange={(e) => { setEmail(e.target.value) }} type="email" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                            {uploadError && <p className={styles.required}>Email required</p>}</div>
                                                                        <div style={{ marginTop: "3px" }}>
                                                                            <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`}>Contact</label>
                                                                            <input style={{ height: "30px" }} value={contact} placeholder='Contact here...' onChange={(e) => { setContact(e.target.value) }} type="text" className={`form-control ${styles.placeHolder}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                            {uploadError && <p className={styles.required}>Contact required</p>}</div>
                                                                    </div></form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12" >

                                                                <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`}>Objective</label>
                                                                <input style={{ height: "30px" }} placeholder='Objective here...' type="text" className={`form-control ${styles.placeHolder}`} value={objective} onChange={(e) => { setObjective(e.target.value) }} id="exampleFormControlTextarea1" />

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                        {/* EDUCATION */}
                        <section >
                            {educationForms.map((educationForm, index) => (
                                <div key={index} style={{ marginTop: "10px" }}>
                                    <div className="container">
                                        <div className="row">
                                            <div className={`col-12 mx-auto ${styles.backgroundColor}`} >
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <p style={{ color: "white", fontSize: "20px", textAlign: "center", padding: "none", display: "inline", marginLeft: "15px" }}>Education</p>
                                                    </div>
                                                </div>

                                                <div className="container" style={{}}>
                                                    <div className="row">

                                                        <div className="col-md-6" >
                                                            <div style={{ width: "100%", margin: "auto" }}>
                                                                <form> <div >
                                                                    <div >
                                                                        <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`} htmlFor={`degree${index}`}>Degree:</label>
                                                                        <input style={{ height: "30px" }} placeholder='Degree here...' type="text" className={`form-control ${styles.placeHolder}`} aria-describedby="emailHelp"

                                                                            id={`degree${index}`}
                                                                            value={educationForm.degree}
                                                                            onChange={(e) =>
                                                                                educationChangeHandler(index, "degree", e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div style={{ marginTop: "3px" }}>
                                                                        <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`} htmlFor={`institution${index}`}>Institution:</label>
                                                                        <input style={{ height: "30px" }} placeholder='Institution here...' type="text" className={`form-control ${styles.placeHolder}`} aria-describedby="emailHelp"

                                                                            id={`institution${index}`}
                                                                            value={educationForm.institution}
                                                                            onChange={(e) =>
                                                                                educationChangeHandler(index, "institution", e.target.value)
                                                                            }
                                                                        /></div>

                                                                </div></form>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6" >
                                                            <div style={{ width: "100%", margin: "auto" }}>
                                                                <form> <div >
                                                                    <div>
                                                                        <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`} htmlFor={`field${index}`}>Field:</label>
                                                                        <input style={{ height: "30px" }} type="text" placeholder='Field here...' className={`form-control ${styles.placeHolder}`} aria-describedby="emailHelp"

                                                                            id={`field${index}`}
                                                                            value={educationForm.field}
                                                                            onChange={(e) =>
                                                                                educationChangeHandler(index, "field", e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div style={{ marginTop: "3px" }}>
                                                                        <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`} htmlFor={`year${index}`}>Year:</label>
                                                                        <input style={{ height: "30px" }} placeholder='Completion date here...' type="date" className={`form-control ${styles.placeHolder}`} aria-describedby="emailHelp"

                                                                            id={`year${index}`}
                                                                            value={educationForm.year}
                                                                            onChange={(e) =>
                                                                                educationChangeHandler(index, "year", e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div></form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row ">
                                                        <div className="col-md-2"><div style={{ width: "100%" }}>
                                                            <button type="button" onClick={educationIncrementHandler} style={{ marginTop: "3px", width: "100%" }} className={styles.animatedBtn}>
                                                                <span className={styles.transition}></span>
                                                                <span className={styles.gradient}></span>
                                                                <span className={styles.label}>Add Education </span>
                                                            </button>
                                                        </div></div>


                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                        {/* dynamic experience certificates */}
                        <section style={{ marginTop: "10px" }}>
                            {experienceForms.map((experienceForm, index) => (
                                <div key={index} style={{ marginTop: "10px" }}>
                                    <div className="container">
                                        <div className="row">
                                            <div className={`col-12 mx-auto ${styles.backgroundColor}`} >

                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <p style={{ color: "white", fontSize: "20px", textAlign: "center", padding: "none", display: "inline", marginLeft: "15px" }}>Experience</p>
                                                    </div>
                                                </div>


                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-6" >
                                                            <div style={{ width: "100%", margin: "auto" }}>
                                                                <form> <div >
                                                                    <div>
                                                                        <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`} htmlFor={`title${index}`}>Job title</label>
                                                                        <input style={{ height: "30px" }} placeholder='Job title here...' type="text" className={`form-control ${styles.placeHolder}`} aria-describedby="emailHelp"

                                                                            id={`jobTitle${index}`}
                                                                            value={experienceForm.jobTitle}
                                                                            onChange={(e) =>
                                                                                experienceChangeHandler(index, "jobTitle", e.target.value)
                                                                            }
                                                                        /></div>
                                                                    <div style={{ marginTop: "3px" }}>
                                                                        <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`} htmlFor={`companyName${index}`}>Company name:</label>
                                                                        <input style={{ height: "30px" }} placeholder='Company here...' type="text" className={`form-control ${styles.placeHolder}`} aria-describedby="emailHelp"

                                                                            id={`companyName${index}`}
                                                                            value={experienceForm.companyName}
                                                                            onChange={(e) =>
                                                                                experienceChangeHandler(index, "companyName", e.target.value)
                                                                            }
                                                                        /></div>

                                                                </div></form>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6" >
                                                            <div style={{ width: "100%", margin: "auto" }}>
                                                                <form> <div >
                                                                    <div>
                                                                        <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`} htmlFor={`experienceStarting${index}`}>Started at:</label>
                                                                        <input style={{ height: "30px" }} placeholder='Initiation date here...' type="date" className={`form-control ${styles.placeHolder}`} aria-describedby="emailHelp"

                                                                            id={`experienceStarting${index}`}
                                                                            value={experienceForm.experienceStarting}
                                                                            onChange={(e) =>
                                                                                experienceChangeHandler(index, "experienceStarting", e.target.value)
                                                                            }
                                                                        /></div>
                                                                    <div style={{ marginTop: "3px" }}>
                                                                        <label style={{ display: "inline-block", padding: "none" }} className={` text-white ${styles.font15px}`} htmlFor={`experienceEnding${index}`}>Completed at:</label>
                                                                        <input style={{ height: "30px" }} placeholder='Completion date here...' type="date" className={`form-control ${styles.placeHolder}`} aria-describedby="emailHelp"

                                                                            id={`experienceEnding${index}`}
                                                                            value={experienceForm.experienceEnding}
                                                                            onChange={(e) =>
                                                                                experienceChangeHandler(index, "experienceEnding", e.target.value)
                                                                            }
                                                                        /></div>
                                                                </div></form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row ">
                                                        <div className="col-md-2"><div style={{ width: "100%" }}>
                                                            <button type="button" onClick={experienceIncrementHandler} style={{ marginTop: "3px", width: "100%" }} className={styles.animatedBtn}>
                                                                <span className={styles.transition}></span>
                                                                <span className={styles.gradient}></span>
                                                                <span className={styles.label}>Add Experience </span>
                                                            </button>
                                                        </div></div>


                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </section>


                        {/* final certificate start*/}
                        <section style={{ marginTop: "10px" }}>
                            <div className="container">
                                <div className="row">
                                    <div className={`col-12 mx-auto ${styles.backgroundColor}`}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p
                                                    style={{
                                                        color: "white",
                                                        fontSize: "20px",
                                                        textAlign: "center",
                                                        padding: "none",
                                                        display: "inline",
                                                        marginLeft: "15px",
                                                    }}
                                                >
                                                    CERTIFICATE
                                                </p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-4" style={{}}>
                                                    <input
                                                        style={{ height: "30px", marginTop: "5px" }}
                                                        placeholder="Certificate name here..."
                                                        type="text"
                                                        className={`form-control ${styles.placeHolder}`}
                                                        id="certificateName"
                                                        value={certificateName}
                                                        onChange={(e) => setCertificateName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-2" style={{}}>
                                                    <input
                                                        style={{ height: "30px", marginTop: "5px" }}
                                                        placeholder="Certificate date here..."
                                                        type="date"
                                                        className={`form-control ${styles.placeHolder}`}
                                                        id="certificateDate"
                                                        value={certificateDate}
                                                        onChange={(e) => setCertificateDate(e.target.value)}
                                                    />

                                                </div>
                                                <div className="col-md-4">
                                                    <input
                                                        style={{ height: "30px", marginTop: "5px" }}
                                                        placeholder="Organisation name here..."
                                                        type="text"
                                                        className={`form-control ${styles.placeHolder}`}
                                                        id="certificateOrganisation"
                                                        value={certificateOrganisation}
                                                        onChange={(e) => setCertificateOrganisation(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-2" style={{}}>
                                                    {isCertificateEditing ? (
                                                        <div
                                                            className={styles.saveGroup}
                                                            style={{ display: "flex", justifyContent: "space-between" }}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={saveCertificateHandler}
                                                                style={{ marginTop: "3px", marginRight: "10px" }}
                                                                className={`${styles.animatedBtn} ${styles.btns} `}
                                                            >
                                                                <span className={styles.transition}></span>
                                                                <span className={styles.gradient}></span>
                                                                <span className={styles.label}>Save</span>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="col-12 d-flex justify-content-end">
                                                            <button
                                                                type="button"
                                                                onClick={addCertificateHandler}
                                                                style={{ marginTop: "3px" }}
                                                                className={`${styles.animatedBtn} ${styles.addSkillBtn}`}
                                                            >
                                                                <span className={styles.transition}></span>
                                                                <span className={styles.gradient}></span>
                                                                <span className={styles.label}>Add Certificate</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div>
                                                    {theCertificateForms.map((certificate, index) => (
                                                        <div key={index} style={{ display: "inline", marginRight: "5px" }}>
                                                            <button style={{ marginRight: "0px" }}
                                                                className={`${styles.customBtn} ${styles.btn1}`}
                                                                onClick={() => editCertificateHandler(index)}
                                                            >
                                                                {certificate.name} - {certificate.date}
                                                            </button>
                                                            <button
                                                                style={{ paddingBottom: "10px", border: "1px solid black", fontSize: "12px", backgroundColor: "#73B5DD", borderRadius: "15px", padding: "2px", height: "20px", width: "20px" }}
                                                                className={`${styles.customBtn} ${styles.crossBtn}`}
                                                                onClick={() => setTheCertificateForms(theCertificateForms.filter((_, i) => i !== index))}
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* final certificate end */}

                        {/* The Skill */}
                        <section style={{ marginTop: "10px" }}>
                            <div className="container">
                                <div className="row">
                                    <div className={`col-12 mx-auto ${styles.backgroundColor}`}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p
                                                    style={{
                                                        color: "white",
                                                        fontSize: "20px",
                                                        textAlign: "center",
                                                        padding: "none",
                                                        display: "inline",
                                                        marginLeft: "15px",
                                                    }}
                                                >
                                                    SKILLS
                                                </p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6" style={{}}>
                                                    <input
                                                        style={{ height: "30px", marginTop: "5px" }}
                                                        placeholder="Skill name here..."
                                                        type="text"
                                                        className={`form-control ${styles.placeHolder}`}
                                                        id="skillName"
                                                        value={skillName}
                                                        onChange={(e) => setSkillName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-4" style={{}}>
                                                    <select
                                                        className={styles.slct}
                                                        style={{ fontFamily: "Rondal", height: "30px" }}
                                                        id="skillLevel"
                                                        value={skillLevel}
                                                        onChange={(e) => setSkillLevel(e.target.value)}
                                                    >
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Expert">Expert</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-2" style={{}}>
                                                    {isSkillEditing ? (
                                                        <div
                                                            className={styles.saveGroup}
                                                            style={{ display: "flex", justifyContent: "space-between" }}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={saveSkillHandler}
                                                                style={{ marginTop: "3px", marginRight: "10px" }}
                                                                className={`${styles.animatedBtn} ${styles.btns} `}
                                                            >
                                                                <span className={styles.transition}></span>
                                                                <span className={styles.gradient}></span>
                                                                <span className={styles.label}>Save</span>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="col-12 d-flex justify-content-end">
                                                            <button
                                                                type="button"
                                                                onClick={addSkillHandler}
                                                                style={{ marginTop: "3px" }}
                                                                className={`${styles.animatedBtn} ${styles.addSkillBtn}`}
                                                            >
                                                                <span className={styles.transition}></span>
                                                                <span className={styles.gradient}></span>
                                                                <span className={styles.label}>Add Skill</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div>
                                                    {theSkillForms.map((skill, index) => (
                                                        <div key={index} style={{ display: "inline", marginRight: "5px" }}>
                                                            <button style={{ marginRight: "0px" }}
                                                                className={`${styles.customBtn} ${styles.btn1}`}
                                                                onClick={() => editSkillHandler(index)}
                                                            >
                                                                {skill.name} - {skill.level}
                                                            </button>
                                                            <button
                                                                style={{ paddingBottom: "10px", border: "1px solid black", fontSize: "12px", backgroundColor: "#73B5DD", borderRadius: "15px", padding: "2px", height: "20px", width: "20px" }}
                                                                className={`${styles.customBtn} ${styles.crossBtn}`}
                                                                onClick={() => setTheSkillForms(theSkillForms.filter((_, i) => i !== index))}
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* The skills */}

                        {/* new lang */}
                        <section style={{ marginTop: "10px" }}>
                            <div className="container">
                                <div className="row">
                                    <div className={`col-12 mx-auto ${styles.backgroundColor}`}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p style={{ color: "white", fontSize: "20px", textAlign: "center", padding: "none", display: "inline", marginLeft: "15px" }}>LANGUAGES</p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-10">
                                                    <input style={{ height: "30px", marginTop: "5px" }} type="text" className={`form-control ${styles.placeHolder}`}

                                                        placeholder="Enter language name here..."
                                                        value={language}
                                                        onChange={handleLanguageChange}

                                                    />
                                                </div>
                                                <div className="col-md-2">


                                                    <button type="button" style={{ width: "100%" }} className={styles.animatedBtn} onClick={handleLanguageAdd}>
                                                        <span className={styles.transition}></span>
                                                        <span className={styles.gradient}></span>
                                                        <span className={styles.label}>Add Language</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-12">


                                                    {languages.map((lang, index) => (<>
                                                        <div style={{ display: "inline-block" }}>

                                                            <button key={index} onClick={() => handleLanguageRemove(index)} className={styles.noselect}><span className={styles.text}>{lang}</span><span className={styles.icon}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>

                                                        </div>

                                                    </>
                                                    ))}



                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div></section>

                        {/* REFERENCE */}
                        <section style={{ marginTop: "10px" }}>
                            <div className="container">
                                <div className="row">
                                    <div className={`col-12 mx-auto ${styles.backgroundColor}`} >
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p style={{ color: "white", fontSize: "20px", textAlign: "center", padding: "none", display: "inline", marginLeft: "15px" }}>References</p>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row">

                                                <div className="col-md-12" >
                                                    <div style={{ margin: "auto" }}>
                                                        <form> <div className="mb-3">
                                                            <input
                                                                style={{ height: '30px', marginTop: '5px' }}
                                                                type="text"
                                                                className={`form-control ${styles.placeHolder}`}
                                                                placeholder="Reference here..."
                                                                value={reference}
                                                                onChange={onReferenceChange}
                                                                id="exampleFormControlTextarea1"
                                                            />
                                                        </div></form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section style={{ marginTop: "10px" }}>
                            <div className="container" style={{ paddingBottom: "10px" }}>

                                <div className="row">
                                    <div className="col-md-6"><div style={{}}>
                                        <button onClick={onSubmitHandler} className={styles.bottomBtns} style={{ marginLeft: "auto" }}>
                                            <span>View resume</span>
                                        </button></div></div>


                                    <div className="col-md-6"><div style={{}}>
                                        <button className={`${styles.bottomBtns} ${styles.lastBtn}`} style={{ marginRight: "auto" }}>
                                            <span>Cancel</span>
                                        </button></div></div>
                                </div>
                            </div>
                        </section>


                    </div>
                </div>
            </main>
        </>
    )
}

export default form2
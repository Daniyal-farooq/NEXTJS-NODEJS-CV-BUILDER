import React, { useEffect, useState } from 'react';
import Image from 'next/image'
// import styles from '../styles/template1.module.css'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCode, faHighlighter, faPhone, faLocation, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Router from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
// import html2pdf from 'html2pdf.js';
import html2pdf from 'html2pdf.js';


const sectionStyle = {
    backgroundColor: 'rgb(11, 79, 205)',
    borderRadius: '5px',
    paddingLeft: '30px',
  };


const template1 = () => {
    const [cvData, setCvData] = useState(null);

    // const generatePDF = async () => {
    //     try {
    //       document.getElementById("downloadButton").innerHTML = "Currently downloading, please wait";
    
    //       const downloading = document.getElementById("templateContent");
    
    //       const opt = {
    //         margin: 0,
    //         filename: 'Document.pdf',
    //         image: { type: 'jpeg', quality: 1 },
    //         html2canvas: { scale: 2 },
    //         jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    //       };
    
    //       await html2pdf().set(opt).from(downloading).save();
    
    //       document.getElementById("downloadButton").innerHTML = "Click to download";
    //     } catch (error) {
    //       console.error("Error generating PDF:", error);
    //     }
    //   };
      
      

    const onDownloadHandler = async(html) => {
        if (!html) {
            console.error('HTML is null');
            return;
        }

        console.log("download btn clicked");

        try {
            const response = await axios.post('http://localhost:8000/download', { html: htmlContent }, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted.pdf');
            document.body.appendChild(link);
            link.click();
          } catch (error) {
            console.error('Error generating PDF:', error);
          }
    };


    useEffect(() => {
        const draftData = localStorage.getItem("draft");
        const parsedData = draftData ? JSON.parse(draftData) : null;
        setCvData(parsedData);
        // console.log(parsedData);
        // console.log(parsedData.skill);
        // console.log(parsedData.language);
        // console.log(parsedData.certificate);
        // console.log(parsedData.reference);
    }, []);
    return (
        <div >
            <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
            </Head>
            <style>

            </style>
            <div >
                <div style={{ textAlign: "center", fontSize: "40px", fontFamily: "Roboto" }} >Your Selected Template</div>
                    <div id="templateContent">
                {cvData && (
                    <div className={`container `} style={{border : "1px solid black"}}>
                        <div className="row" style={{border : "1px solid black"}}>
                            <div className="col-xl-6" >
                                <div  style={{}}>
                                    <svg style={{ backgroundColor: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                        <path fill="#0099ff" fillOpacity="1" d="M0,224L34.3,197.3C68.6,171,137,117,206,128C274.3,139,343,213,411,213.3C480,213,549,139,617,112C685.7,85,754,107,823,101.3C891.4,96,960,64,1029,64C1097.1,64,1166,96,1234,128C1302.9,160,1371,192,1406,208L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
                                    </svg>
                                    <div className="container">
                                        <div className="row" style={{ backgroundColor: "white" }}>
                                            <div className="col-6">
                                                <div style={{ marginRight: "20px" }}>
                                                    <Image
                                                        src={cvData.imageURL}
                                                        width={150}
                                                        height={150}
                                                        alt="Picture of the author"
                                                        
                                                        style={{ borderRadius: "50%", marginTop: "1rem", marginLeft: "10px" }}
                                                    />

                                                    <div style={{ marginTop: "20px", paddingLeft: "30px" }}>
                                                        <p style={{ textAlign: "justify", fontSize: "15px", fontFamily: "Roboto" }}><FontAwesomeIcon style={{  color: "blue", width: "20px",  marginRight: "10px"}} icon={faPhone}  />{cvData.contact}</p>
                                                        <p style={{ textAlign: "justify",fontSize: "15px", fontFamily: "Roboto" }}><FontAwesomeIcon style={{  color: "blue", width: "20px",  marginRight: "10px"}} icon={faEnvelope}  />{cvData.email}</p>
                                                        <p style={{ textAlign: "justify",fontSize: "15px", fontFamily: "Roboto" }}><FontAwesomeIcon style={{  color: "blue", width: "20px",  marginRight: "10px"}} icon={faLocation}  />{cvData.address}</p>
                                                    </div>

                                                    <section>
                                                        {cvData.skill && cvData.skill.length > 0 && cvData.skill[0].title && cvData.skill[0].level && (
                                                            <div>
                                                                <div style ={{ backgroundColor: "rgb(11, 79, 205)" ,borderRadius: "5px", paddingLeft:"30px"}}>
                                                                    <p style={{ fontSize: "20px"  , fontFamily: "Roboto" }}>SKILLS</p>
                                                                </div>
                                                                {cvData.skill.map(({ title, level }) => (
                                                                    <div key={title} style={{ paddingLeft: "30px", fontFamily: "Roboto" }}>
                                                                        {title && level && (
                                                                            <>
                                                                                <p style={{ fontWeight: "bold", fontFamily: "Roboto" }}>{title}</p>
                                                                                <p style={{ fontFamily: "Roboto", fontSize: "15px" }}>{level}</p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </section>

                                                    <section>
                                                        {cvData.certificate && cvData.certificate.length > 0 && cvData.certificate[0].nameOfCertificate && cvData.certificate[0].issueDate && cvData.certificate[0].organisation && (
                                                            <div>
                                                                <div  style ={{ backgroundColor: "rgb(11, 79, 205)" ,borderRadius: "5px", paddingLeft:"30px"}}>
                                                                    <p  style={{ fontSize: "20px" ,fontFamily: "Roboto"  }}>CERTIFICATES</p>
                                                                </div>
                                                                {cvData.certificate.map(({ nameOfCertificate, issueDate, organisation }) => (
                                                                    <div key={issueDate} style={{ paddingLeft: "30px", fontFamily: "Roboto" }}>
                                                                        {nameOfCertificate && issueDate && organisation && (
                                                                            <div className="row">
                                                                                <div className="col-6">
                                                                                    <p style={{ fontWeight: "bold", fontSize: "15px" }}>{organisation}</p>
                                                                                    <p style={{ fontSize: "15px" }}>{nameOfCertificate}</p>
                                                                                    <p style={{ fontSize: "15px" }}>{issueDate}</p>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </section>

                                                    <section>
                                                        {cvData.education && cvData.education.length > 0 && cvData.education[0].degree && cvData.education[0].year && cvData.education[0].field && cvData.education[0].institutionName && (
                                                            <div>
                                                                <div  style={sectionStyle}>
                                                                    <p   style={{ fontSize: "20px" ,fontFamily: "Roboto"}}>EDUCATION</p>
                                                                </div>
                                                                {cvData.education.map(({ degree, year, field, institutionName }) => (
                                                                    <div key={degree} style={{ paddingLeft: "30px", fontFamily: "Roboto" }}>
                                                                        {degree && year && field && institutionName && (
                                                                            <>
                                                                                <p style={{ fontWeight: "bold", fontSize: "15px" }}>{institutionName}</p>
                                                                                <p style={{ fontSize: "15px" }}><span>{degree}</span> in <span>{field}</span></p>
                                                                                <p style={{ fontSize: "15px", fontWeight: "bold" }}>{year}</p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </section>
                                                </div>
                                            </div>
                                            <div className="col-6" style={{ marginTop: "0px" }}>
                                                <h1 style={{ fontSize: "40px", color: "rgb(11, 79, 205)" ,fontFamily: "Roboto" }}>{cvData.name}</h1>
                                                <p  style={{ fontSize: "25px", fontWeight: "bold" ,fontFamily: "Roboto" }}>{cvData.designation}</p>
                                                <p  style={{ textAlign: "justify" ,fontFamily: "Roboto" }}>{cvData.objective}</p>

                                                <div>
                                                    <section>
                                                        {cvData.experience && cvData.experience.length > 0 && cvData.experience[0].jobTitle && cvData.experience[0].companyName && cvData.experience[0].experienceStarting && cvData.experience[0].experienceEnding && (
                                                            <div>
                                                                <div  style ={{ backgroundColor: "rgb(11, 79, 205)" ,borderRadius: "5px", paddingLeft:"30px"}}>
                                                                    <p  style={{ fontSize: "20px" ,fontFamily: "Roboto" }}>EXPERIENCE</p>
                                                                </div>
                                                                {cvData.experience.map(({ jobTitle, companyName, experienceStarting, experienceEnding }) => (
                                                                    <div key={jobTitle} style={{ paddingLeft: "30px", fontFamily: "Roboto" }}>
                                                                        {jobTitle && companyName && experienceStarting && experienceEnding && (
                                                                            <>
                                                                                <p style={{ fontWeight: "bold", fontSize: "15px" }}>{jobTitle}</p>
                                                                                <p style={{ fontSize: "15px" }}>at <span>{companyName}</span></p>
                                                                                <p style={{ fontSize: "15px" }}>from <span>{experienceStarting}</span>-<span>{experienceEnding}</span></p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </section>

                                                    <section>
                                                        {cvData.language && cvData.language.length > 0 && cvData.language[0].languageName && (
                                                            <div>
                                                                <div className="sectionBackground" style ={{ backgroundColor: "rgb(11, 79, 205)" ,borderRadius: "5px", paddingLeft:"30px"}}>
                                                                    <p  style={{ fontSize: "20px" ,fontFamily: "Roboto"  }}>LANGUAGES</p>
                                                                </div>
                                                                {cvData.language.map(({ languageName }) => (
                                                                    <div key={languageName} style={{ paddingLeft: "30px", fontFamily: "Roboto" }}>
                                                                        {languageName && (
                                                                            <p style={{ fontSize: "15px" }}>{languageName}</p>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </section>

                                                    <section>
                                                        {cvData.reference && cvData.reference.length > 0 && cvData.reference[0].name && cvData.reference[0].contact && cvData.reference[0].designation && (
                                                            <div>
                                                                <div className={styles.color} style ={{ backgroundColor: "rgb(11, 79, 205)" ,borderRadius: "5px", paddingLeft:"30px"}}>
                                                                    <p className={styles.Roboto} style={{ fontSize: "20px" , fontFamily: "Roboto" }}>REFERENCES</p>
                                                                </div>
                                                                {cvData.reference.map(({ name, contact, designation }) => (
                                                                    <div key={name} style={{ paddingLeft: "30px", fontFamily: "Roboto" }}>
                                                                        {name && contact && designation && (
                                                                            <div className="row">
                                                                                <div className="col-6">
                                                                                    <p style={{ fontWeight: "bold", fontSize: "15px" }}>{name}</p>
                                                                                    <p style={{ fontSize: "15px" }}>{designation}</p>
                                                                                    <p style={{ fontSize: "15px" }}>{contact}</p>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </section>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                    </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginTop: "30px", marginBottom: "30px" }}
                    onClick={() => onDownloadHandler(document.getElementById("templateContent"))}
                >
                    Download
                </button>
            </div>
            {/* <button id="downloadButton" type="button" onClick={generatePDF}>
        Click to download
      </button> */}
        </div>
    );
};

export default template1;

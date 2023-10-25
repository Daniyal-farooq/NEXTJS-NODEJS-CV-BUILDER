import React from 'react'
import Image from 'next/image'
import styles from '../styles/template1.module.css'

const a = localStorage.getItem("draft")
    const cvData = JSON.parse(a)
const template1 = () => {
    
 
  return (<>
    <div>template1</div>
    

    {/* dynamic form */}
    <p>{cvData.name}</p>                                 </>
                                    
      
  )
}

export default template1
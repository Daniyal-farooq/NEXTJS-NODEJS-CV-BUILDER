// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function App({ Component, pageProps }: AppProps) {
//   return 
//   <div>
    
//     <Component {...pageProps} />
//     </div>
// }

import { useEffect } from 'react';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Include the Google Fonts CSS dynamically
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    
    
  }, []);

  return (
    <div>
      <Component {...pageProps} />
      <ToastContainer/>
      <footer>
          <div className="container-fluid" style={{backgroundColor:"#2578AC" , borderTop:"1px solid white"}}>
            <div className="row">
              <div className="col-4"style={{textAlign:"center",color:"#FAFAFA",fontWeight:"700",fontSize: "12px",padding:"20px"}}>copyright</div>
              <div className="col-8 ms-auto" style={{textAlign:"center",color:"#FAFAFA",fontWeight:"700",fontSize: "12px",padding:"20px" }}>Privacy Policy & Term of Use</div>
            </div>
          </div>
          
         </footer>
    </div>
  );
}

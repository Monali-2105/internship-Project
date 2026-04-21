import React from 'react';
import {Phone ,Mail, GitHub, LinkedIn, Instagram} from '@mui/icons-material';
import '../componentStyles/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
        <div className='footer-container'>
            {/*section1 */}
            <div className='footer-section contact'>
                <h3>Contact Us</h3>
                <p><Phone fontSize='small'/>Phone: +9865985465</p>
                <p><Mail fontSize='small'/>Email:nikammonali55@gmail.com</p>

            </div>
            {/*section2 */}
            <div className='footer-section social'>
                <h3>Follow me</h3>
                <div className='social-links'>
                    <a href='' target='_blank'>
                        <GitHub className='social-icon'/>
                    </a>
                    <a href='' target='_blank'>
                        <LinkedIn className='social-icon'/>
                    </a>
                    <a href='' target='_blank'>
                        <Instagram className='social-icon'/>
                    </a>
                </div>
                
            </div>
            {/* section3 */}
                <div className='footer-section about'>
                    {/* <h3>About</h3> */}
                    <Link to="/about-us" style={{color:"white",fontSize:"20px"}}>About Us</Link>
                    <p>Connecting farmers directly with consumers for a better, fair, and
          sustainable future 🌾</p>
                </div>
        </div>
        <div className='footer-bottom'>
            <p>&copy; 2026 AgriMarket. All rights reserved</p>
        </div>

    </footer>
  )
}

export default Footer;
import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    
    <section className='container-fluid p-2 footer-border-top footer-list'>
       <div className='row'>
        <div className='col-12 col-sm-3  text-center'>
       <h4 className='my-5'><Logo/></h4>
       <h4>This website is created by shummy ranjan shanoo</h4>
        </div>
        <div className='col-sm-9'>
          <div className="row">
          <ul className='d-flex justify-content-around fw-bold mb-2'>
            <li>
            <h4 className=' mb-4'>Details</h4>
              <li>Email</li>
              <li>Address</li>
              <li>Contact</li>
              <li></li>
            </li>
            <li>
            <h4 className='mb-4'>Social Media</h4>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>Twitter</li>
            </li>
            <li>
            <h4 className='mb-4'>Legals</h4>
              <li> Terms &amp; Conditions</li>
              <li>Privacy Policy</li>
              <li> Licensing</li>
            
            </li>
          </ul>
          </div>
        
        </div>
      
      </div>
    </section>
  
  )
}

export default Footer




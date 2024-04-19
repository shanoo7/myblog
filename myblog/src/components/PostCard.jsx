import React from 'react';
import service from '../appwrite/config';
import {Link} from 'react-router-dom';

function PostCard({$id, title, image}) {

  return (
    <>
       <Link className=' text-decoration-none ' to={`/post/${$id}`}>
        <div className=' container-fluid '>
         <div className=' card card-body p-2 myCardImg rounded-2 '>
           <img  className=' myCardImg card-img-top pb-1 ' src={service.getFilePreview(image)} alt={title}/>
           <h6 className='post-card-font card-text text-black text-nowrap border-top'> {title} </h6>
         </div>
        </div>
       </Link>
    </>
  )
}

export default PostCard;

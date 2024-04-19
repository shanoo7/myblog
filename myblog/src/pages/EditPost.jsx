import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { Container, PostForm } from '../components'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
  const [post, setPost]= useState(null)
  const {slug}=useParams()
  const navigate = useNavigate()
  useEffect(()=>{
    if(slug){
      service.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
        }
            })
    }else{
      navigate('/')
    }
   
  },[slug,navigate])
  
  return post ? (
  <div className='py-2 container-fluid'>
    <Container>
      <div className='row'>
<div className='col w-25'>
<PostForm post={post}/>
</div>
      </div>
    </Container>
  </div>
  )  :null
}

export default EditPost

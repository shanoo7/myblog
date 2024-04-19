import React,{useState,useEffect} from 'react'
import service from '../appwrite/config'
import {Container, Button } from '../components'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import parse from "html-react-parser"

function Post() {
    const navigate = useNavigate();
    const {slug} = useParams();
    const userData = useSelector((state)=>state.auth.userData);
    const [post, setPost] = useState(null)
    const isAuthor = post && userData ? post.userId === userData.$id : false;


    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post) setPost(post)
                else navigate('/')
                
            })
        }else{
            navigate('/')
        }
    },[slug,navigate])

    const deletePost= ()=>{
        service.deletePost(post.$id).then((status)=>{
            if(status){
                service.deleteFile(post.image)
                navigate('/')
            }
        })
    };

  return post ? (
    <div className='py-5'>
        <Container>
            <div className='w-100 post-img-div'>
                <img
                className=' rounded-2 mb-2 w-50'
                src={service.getFilePreview(post.image)}
                alt={post.title}
                />
                {isAuthor && (
                <div className='w-50 post-btn-div'>
                    <Link to={`/edit-post/${post.$id}`}>
                    <Button
                    
                    className=' btn-outline-success w-25 mx-3 btn-sm'>
                        Edit
                    </Button>
                    </Link>
                    <Button onClick={deletePost}
                    className='btn-outline-danger  w-25 btn-sm'
                    >
                        Delete
                    </Button>
                </div>
                )}
            </div>
            <div className='text-light'>
                <h1>{post.title}</h1>
            </div>
            <div className='text-light text-break'>
                {parse(post.content)}
            </div>
        </Container>
    </div>
  ): null;

}

export default Post

import React,{useState,useEffect} from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

import { useSelector } from 'react-redux'


function Home() {
    const loggedIn = useSelector((state)=>state.auth.status)
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        service.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
  
    if(posts.length ===0){
        return (
            <div className='bg-dark-subtle homeImg'>
                <Container>
                 <div className='p-5 text-center'>
                   <h1 className=' homeFontStyle'>
                     {loggedIn ? (<h1 className='fw-semibold'>
                        {posts.length===0?"WELCOME TO MY WEBSITE":""}
                        </h1>)
                     :(<h1 className='fw-semibold'>LOGIN TO READ POSTS</h1>)}
                   </h1>
                 </div>
                </Container>
            </div>
        )
    }
    return(
        <div className='container-fluid py-5'>
            <Container>
               <div className='d-flex row '>
               {posts.map((post)=>(
                <div className=" g-3 col-6 col-xl-2 col-md-3 col-sm-4" key={post.$id}>
                     <PostCard {...post}/>
                </div>
               ))}
               </div>
            </Container>
        </div>
    )
}

export default Home

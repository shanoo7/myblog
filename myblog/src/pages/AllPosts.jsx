import React, {useState, useEffect} from 'react'
import {Container, PostCard } from '../components'
import service from '../appwrite/config'
function AllPosts() {
    const [posts, setPosts]= useState([])
    useEffect(()=>{ },[])
    service.getPosts([]).then((posts)=>{
      if(posts){
          setPosts(posts.documents)
      }
          })

          if(posts.length ===0){
            return (
                <div>
                    <Container>
                        <div className='d-flex'>
                            <div className='p-2 text-center container-fluid'>
                                <h1>
                                    Loading all posts plz wait...
                                </h1>
    
                            </div>
    
                        </div>
                    </Container>
                </div>
            )
        }
   
  return (
    
    <div className='py-5 '>
      <Container>
        
        <div class="row">
        {posts.map((post)=>(
           <div key={post.$id} className='col-6 col-xl-2 col-md-3 col-sm-4 mb-3'>
             <PostCard {...post}/>
           </div>
        ))}
    </div>
      </Container>
    </div>
  )
}

export default AllPosts

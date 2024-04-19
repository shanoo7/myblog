import React,{useCallback, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { Button, Input, Select, RTE } from '..'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

//whoever fill the form will pass the post here//
function PostForm({post}) {
    const userData = useSelector((state)=>state.auth.userData)
    const navigate = useNavigate()

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
       

    const submit = async (data)=>{
        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
            if(file) {
                service.deleteFile(post.image)
            }
             const dbPost = await service.updatePost(post.$id, {
                ...data,
                image: file ? file.$id : undefined,
             });  
            
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
           const file = await service.uploadFile(data.image[0])
           if(file){
            const fileId = file.$id
            data.image = fileId
            const dbPost = await service.createPost({ ...data, userId: userData.$id });
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
           }
        }
    }
    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string') return value
            .trim()
            .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g,'-')
           .replace(/\s/g,'-')
           return ''
    },[]) 

    useEffect(()=>{
        const subscriptions= watch((value,{name})=>{
            if(name === 'title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })
        return ()=>{
            subscriptions.unsubscribe()
        }
    },[slugTransform, watch, setValue])

  return (
    <form className='container-fluid form-group ' onSubmit={handleSubmit(submit)} >
       <div className='row '>
       <div className='col-sm-8'>
            <Input
            label='Title'
            type='text'
            placeholder='Title'
            {...register('title',{
                required:true
            })}
            />
            <Input
            className="mb-4"
            label='Slug'
            placeholder='Slug'
            {...register('slug',{
                required: true
            })}
            onInput={(e)=>{
                setValue('slug',slugTransform(e.currentTarget.value),{
                    shouldValidate:true
                })
            }}
            />
            <RTE
            className="mb-4 "
            label='Content :'
            name='content'
            control={control}
            defaultValue={getValues('content')}
            />
            
        </div>
        <div className='col-sm-4'>
            <Input
            className="mb-4"
            label="image"
            type="file"
            accept="image/png, image/jpg, image/jpag, image/gif"
            {...register("image", { required: !post })}
            />
            {post && (
                <div className='container-fluid  mb-4'>
                    <img 
                    src={service.getFilePreview(post.image)}
                    alt={post.title}
                    className='rounded w-75 ms-3'
                    />
                </div>
            )}
           <div className='d-flex'>
           <Select
            className="form-control"
            label="status"
            options={['active','inactive']}
            {...register("status",{
                required:true
            })}
            />
            <Button className='btn btn-outline-success h-25 mt-4' type='submit'>
                {post ? 'update' : 'submit'}
            </Button>
           </div>
            
            
        </div>
       </div>
    </form>
  )
}

export default PostForm;

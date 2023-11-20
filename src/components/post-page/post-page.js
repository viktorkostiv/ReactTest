import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserInformation from "../user-information/user-information";
import Service from '../../services/app-service';

const service = new Service();

function PostPage() {
    const { userId, postId } = useParams();
    const [post, setPost] = useState([]);
    useEffect(() => {
        service.getPost(postId)
            .then( post  => {
                setPost(post);
            })
            .catch(error => {
                console.error('Error fetching post:', error);
            });
    }, []);
    return (
        <div className="flex flex-col gap-8">
            <UserInformation userId={userId}/>

            <div className='flex flex-col w-full'>
                <h2 className='flex items-center gap-3 font-Montserrat font-[700] text-[18px] text-brand-black capitalize'>{post.title}</h2>
                <p className='mt-2 mb-11 font-Montserrat font-[600] text-[14px] text-brand-gray'>Subtitle</p>
                <p className='mb-6 font-Montserrat font-[600] text-[14px] text-brand-black'>{post.body}</p>
            </div>
        </div>
    );
}

export default PostPage;
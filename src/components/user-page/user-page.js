import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Service from '../../services/app-service';
import UserInformation from "../user-information/user-information";

const service = new Service();

function AlbumComponent({album, userId}){
    const shortenTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength - 3) + '...';
        }
        return title;
    };

    return (
        <Link to={`/user/${userId}/album/${album.id}`} className="w-full h-[190px] bg-white rounded-[25px] shadow-brand flex flex-col duration-300 ease-linear hover:scale-95">
            <div className='h-[140px] w-full grid grid-cols-5 grid-rows-2 gap-1'>
                <img src={album.photos[0].url} alt="img-1" className='row-start-1 row-end-3 col-start-1 col-end-4 w-full h-full object-cover rounded-tl-[25px]'/>
                <img src={album.photos[1].url} alt="img-2" className='w-full h-full object-cover col-start-4 col-end-6 rounded-tr-[25px]'/>
                <img src={album.photos[2].url} alt="img-3" className='w-full h-full object-cover  col-start-4 col-end-6'/>
            </div>
            <div className='flex justify-evenly h-full items-center px-2'>
                <p className='text-center font-Montserrat font-[600] text-[14px] text-brand-black capitalize'>{shortenTitle(album.title, 20)}</p>
            </div>
        </Link>
    );
}

function PostComponent({post, userId}){
    const shortenText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    };

    return (
        <Link to={`/user/${userId}/post/${post.id}`} className='w-full flex flex-col gap-4 bg-white rounded-[25px] shadow-brand duration-300 ease-linear hover:scale-95 p-5'>
            <h3 className='font-Montserrat font-[700] text-[16px] text-brand-black capitalize'>{shortenText(post.title, 30)}</h3>
            <p className='font-Montserrat font-[600] text-[14px] text-brand-black'>{shortenText(post.body, 100)}</p>
        </Link>
    );
}

function UserPage() {
    const { userId } = useParams();
    const [albums, setAlbums] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getAlbumsByUser(userId)
            .then(async fetchedAlbums => {
                const albumsWithPhotos = await Promise.all(
                    fetchedAlbums.map(async album => {
                        try{
                            const photos = await service.getAlbumPhotos(album.id);
                            return {...album, photos};
                        } catch (error) {
                            console.error(`Error fetching photos for album ID ${album.id}:`, error);
                            return { ...album, photos: [], error: true };
                        }
                    })
                );
                setAlbums(albumsWithPhotos);
            })
            .catch(error => {
                console.error('Error fetching albums:', error);
            });
    
        service.getPostsByUser(userId)
            .then(postsData => {
                setPosts(postsData);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
        }, [userId]);

    return (
        <div className="flex flex-col gap-8">
            <UserInformation userId={userId}/>

            <div className='flex flex-col gap-5'>
                <h2 className='font-Montserrat font-[700] text-[18px] text-brand-black'>Albums</h2>

                <div className="grid grid-cols-1 phone:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {albums.map(album => (
                        <AlbumComponent key={album.id} album={album} userId={userId}/>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                <h2 className='font-Montserrat font-[700] text-[18px] text-brand-black'>Posts</h2>

                <div className="grid grid-cols-2 phone:grid-cols-3 gap-5">
                    {posts.map(post => (
                        <PostComponent key={post.id} post={post} userId={userId}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserPage;
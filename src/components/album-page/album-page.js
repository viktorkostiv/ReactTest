import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserInformation from "../user-information/user-information";
import Service from '../../services/app-service';

const service = new Service();

function AlbumPage() {
    const { userId, albumId } = useParams();
    const [album, setAlbum] = useState([]);
    const [albumPhotos, setAlbumPhotos] = useState([]);

    useEffect(() => {
        service.getAlbum(albumId)
            .then( album  => {
                setAlbum(album);
                service.getAlbumPhotos(albumId)
                .then(photosData => {
                    setAlbumPhotos(photosData);
                })
                .catch(photosError => {
                    console.error('Error fetching album photos:', photosError);
                });
            })
            .catch(error => {
                console.error('Error fetching album:', error);
            });
    }, [albumId]);
    return (
        <div className="flex flex-col gap-8">
            <UserInformation userId={userId}/>

            <div className='flex flex-col gap-5'>
                <h2 className='font-Montserrat font-[700] text-[18px] text-brand-black capitalize'>{album.title}</h2>

                <div className="grid grid-cols-1 phone:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {albumPhotos.map(photo => (
                    <div key={photo.id} className='w-full flex flex-col gap-4 bg-white rounded-[25px] shadow-brand'>
                        <img src={photo.url} alt={photo.id} className='rounded-[25px]'/>
                        <div className='flex justify-evenly h-full items-center px-2'>
                            <p className='text-center font-Montserrat font-[600] text-[14px] text-brand-black capitalize p-2'>{photo.title}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default AlbumPage;
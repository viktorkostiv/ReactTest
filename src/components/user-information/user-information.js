import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Service from '../../services/app-service';

import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';

const service = new Service();

function UserInformation({userId}) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        service.getUser(userId)
            .then( userData  => {
                service.getAlbumsByUser(userId).then(albums => {
                    service.getPostsByUser(userId).then(posts => {
                        const userInf = {...userData, albumsNum: albums.length, postsNum: posts.length};
                        setUser(userInf);
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, []);

    return (
        <div className="w-full h-[84px] flex gap-4 md:gap-8 items-center px-5 rounded-[25px] bg-gradient-to-r from-brand-purple to-brand-orange shadow-brand">
            <Link to={`/user/${user.id}`}><img src={avatarPlaceholder} alt="avatar" className='w-[52px] h-[52px] rounded-full border-2 border-white'/></Link>
            <div className='flex flex-col justify-center'>
                <Link to={`/user/${user.id}`} className='group flex gap-5 mb-1 items-center font-Montserrat font-[700] text-[16px] text-white'>{user.name} ( {user.username} )</Link>
                <p className='font-Montserrat font-[600] text-[12px] text-white'>{user.albumsNum} Albums</p>
                <p className='font-Montserrat font-[600] text-[12px] text-white'>{user.postsNum} Posts</p>
            </div>
        </div>
    );
}

export default UserInformation;
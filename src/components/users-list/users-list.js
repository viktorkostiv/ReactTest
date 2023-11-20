import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Service from '../../services/app-service';

import avatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import sortIcon from '../../assets/images/sort-icon.svg';

const service = new Service();

function SortInput({ sortedVar, handleSort, sortOrder }) {
    return (
        <div className="flex justify-end gap-4 cursor-pointer relative group">
            <p className="font-Montserrat font-[500] text-[14px] text-brand-black">Sort by <span className='font-[600]'>{sortedVar}</span><span className="text-brand-purple">{sortOrder === 'asc' ? ' (Ascending)' : sortOrder === 'desc' ? ' (Descending)' : ''}</span></p>
            <img src={sortIcon} alt="sort-icon" />

            <div className='absolute w-fit top-full right-0 bg-white rounded-[25px] shadow-brand hidden duration-300 ease-linear group-hover:block z-[100]'>
                <button
                    className={`w-full block py-2 px-4 font-Montserrat font-[600] text-[14px] text-brand-black duration-300 ease-linear hover:text-brand-purple ${sortOrder === 'asc' ? 'text-brand-purple' : ''}`}
                    onClick={() => handleSort('asc')}
                >
                    Ascending
                </button>
                <button
                    className={`w-full block py-2 px-4 font-Montserrat font-[600] text-[14px] text-brand-black duration-300 ease-linear hover:text-brand-purple ${sortOrder === 'desc' ? 'text-brand-purple' : ''}`}
                    onClick={() => handleSort('desc')}
                >
                    Descending
                </button>
            </div>
        </div>
    );
}

function UserComponent({name, id, postsNum, albumsNum}){
    return (
        <Link to={`/user/${id}`} className="w-full h-[120px] bg-white rounded-[25px] shadow-brand flex duration-300 ease-linear hover:scale-95">
            <img src={avatarPlaceholder} alt="avatar" className='h-full w-[120px] rounded-[25px]'/>
            <div className='w-full h-full p-4 flex flex-col justify-center'>
                <p className='font-Montserrat font-[700] text-[16px] text-brand-black mb-3'>{name}</p>
                <p className='font-Montserrat font-[600] text-[14px] text-brand-gray'>{postsNum} Posts</p>
                <p className='font-Montserrat font-[600] text-[14px] text-brand-gray'>{albumsNum} Albums</p>
            </div>
        </Link>
    );
}

function UsersList() {
    const [users, setUsers] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);
    const { query } = useParams();

    const fetchAndSortUsers = async (userList) => {
        const updatedUsers = await Promise.all(
            userList.map(async user => {
                try {
                    const posts = await service.getPostsByUser(user.id);
                    const albums = await service.getAlbumsByUser(user.id);
                    return {...user, postsNum: posts.length, albumsNum: albums.length};
                } catch (error) {
                    console.error(`Error fetching albums and posts`, error);
                    return {...user, postsNum: 0, albumsNum: 0};
                }
            })
        );
        sortUsers(updatedUsers);
    };

    const sortUsers = (userList) => {
        if (sortOrder !== null) {
            const sortedUsers = [...userList].sort((a, b) => {
                const comparison = a.name.localeCompare(b.name);
                return sortOrder === 'asc' ? comparison : -comparison;
            });
            setUsers(sortedUsers);
        } else {
            setUsers(userList);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let fetchedUsers = [];
                if (query) {
                    fetchedUsers = await service.getUsersByName(query);
                } else {
                    fetchedUsers = await service.getUsers();
                }
                await fetchAndSortUsers(fetchedUsers);
            } catch (error) {
                console.error(query ? 'Error fetching users by name:' : 'Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [query, sortOrder]);

    const handleSort = (order) => {
        setSortOrder(order);
    };
    return (
        <div className="flex flex-col gap-8">
            <SortInput sortedVar="Username" sortOrder={sortOrder} handleSort={handleSort} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {
                    users.map((user) => (
                        <UserComponent key={user.id} name={user.name} id={user.id} albumsNum={user.albumsNum} postsNum={user.postsNum}/>
                    ))
                }
            </div>
        </div>
    );
}

export default UsersList;
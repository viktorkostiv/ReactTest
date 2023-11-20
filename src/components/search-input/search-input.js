import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import searchIcon from '../../assets/images/search-icon.svg';

function SearchInput() {
    const [searchText, setSearchText] = useState('');
    const navigate  = useNavigate();

    const handleSearch = () => {
        if (searchText.trim() !== '') {
            navigate(`/${searchText}`);
            window.location.reload(); 
        }
    };
    return (
        <div className='max-w-[520px] w-full relative flex gap-3'>
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} className='w-full h-[48px] rounded-[25px] pl-12 pr-4 shadow-brand font-Montserrat font-[400] text-[16px] text-brand-black placeholder:text-[#B4B4B4] focus:outline-brand-purple focus:border-0 duration-300 ease-linear' placeholder='Search'/>
            <img src={searchIcon} alt="search" className='absolute top-1/2 left-4 -translate-y-1/2'/>
            {searchText.trim() !== '' && (
                <button onClick={handleSearch} className='h-[48px] flex items-center justify-center px-4 bg-white shadow-brand rounded-[25px] font-Montserrat font-[600] text-[14px] text-brand-black duration-300 ease-linear hover:scale-95'>Search</button>
            )}
        </div>
    );
}

export default SearchInput;
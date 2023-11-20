import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from '../users-list/users-list';
import UserPage from '../user-page/user-page';
import PostPage from '../post-page/post-page';
import AlbumPage from '../album-page/album-page';
import SearchInput from '../search-input/search-input';

import logo from '../../assets/images/logo.svg';
import homeIcon from '../../assets/images/home-icon.svg';

function App() {
    return (
        <Router>
            <div className="bg-gradient min-h-screen w-full relative pt-8 pb-24">
                <div className='max-w-[1220px] mx-auto px-2 md:px-5'>
                    <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-4">
                        <img src={logo} alt="logo" className='w-[60%] phone:w-fit'/>

                        <div className="flex items-center gap-4 ml:gap-16 w-full justify-between md:justify-end">
                            <SearchInput></SearchInput>

                            <a href="/" className='group w-full max-w-[56px]'>
                                <img src={homeIcon} alt="home" className='w-full duration-300 ease-linear group-hover:scale-90'/>
                            </a>
                        </div>
                    </header>

                    <div className='w-full min-h-[70vh] mt-4 md:mt-11 py-6 md:py-11 px-5 md:px-10 bg-white shadow-brand rounded-[25px]'>
                        <Routes>
                            <Route path='/:query?' element={<UsersList/>}/>
                            <Route path='/user/:userId' element={<UserPage/>}/>
                            <Route path='/user/:userId/post/:postId' element={<PostPage/>}/>
                            <Route path='/user/:userId/album/:albumId' element={<AlbumPage/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
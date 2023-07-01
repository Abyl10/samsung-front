import React from 'react';
import { SearchIcon, SignOutIcon } from '@primer/octicons-react';
import ProfileImg from '@/assets/profile.png';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="flex flex-row justify-between items-center mb-10 pl-6 pr-10">
      <div className="flex flex-row gap-4 w-1/2">
        <SearchIcon size={24} fill={'#695846'} />
        <input
          type="text"
          placeholder="Search tales, names, keywords..."
          className="outline-none bg-transparent text-main-brown-900 placeholder:text-[#81837A] placeholder:font-light text-base"
        />
      </div>
      <div className="flex flex-row items-center gap-11">
        <div className="flex flex-row items-center gap-4">
          <img src={ProfileImg} alt="profile" className="w-14 h-14 rounded-full" />
          <p className="text-[#81837A] font-normal text-xl">{user?.email}</p>
        </div>
        <span onClick={handleSignOut}>
          <SignOutIcon size={20} className="cursor-pointer" />
        </span>
      </div>
    </header>
  );
};

export default Header;

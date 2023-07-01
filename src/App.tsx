import React, { useEffect } from 'react';
import { Layout } from '@/layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Error404, Home, Login, Topic } from '@/pages';
import Story from './pages/story';
import { useUserContext } from './context/UserContext';
import { getToken } from './utils/token';
import { getUserProfile } from './requests/profile';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getUserProfile().then((res) => {
        setUser(res);
      });
    }
  }, [token]);

  return (
    <div className="font-ubuntu bg-bg-primary">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<div>Register</div>} />
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/bookmark" element={<div>Bookmark</div>} />
          <Route path="/settings" element={<div>Settings</div>} />
          <Route path="/story" element={<Story />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

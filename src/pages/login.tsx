import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogin, authCheck } from '@/requests/auth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { setToken } from '@/utils/token';
import { ArrowRightIcon } from '@primer/octicons-react';
import LoginBackground from '@/assets/login-background.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [step, setStep] = useState<number>(1);

  const { mutate } = useMutation(authLogin, {
    onSuccess: (data) => {
      setStep(2);
      toast.success(data.message);
    },
    onError: () => {
      toast.error('Email does not exist');
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleLogin = () => {
    mutate(email);
  };

  const handleCheck = () => {
    authCheck(email, code).then((res) => {
      setToken(res.access_token);
      navigate('/');
    });
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (step === 1) {
        handleLogin();
      } else {
        handleCheck();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#242C36] flex flex-col items-center overflow-hidden">
      <img src={LoginBackground} alt="login bg" className="h-96 md:h-[400px] lg:h-[550px]" />
      <div className="flex flex-col max-w-[600px] -mt-20 text-center">
        <h1 className="font-medieval capitalize text-4xl md:text-5xl lg:text-6xl text-[#E9ECEC] mb-8">
          Start Reading With Us
        </h1>
        <p className="font-ubuntu text-sm md:text-base font-light capitalize text-[#ffffff] mb-10">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo quasi aut ea nisi dolor
          ipsum pariatur, autem libero necessitatibus facere at amet consectetur placeat repudiandae
          saepe! Praesentium repudiandae vitae nesciunt?
        </p>
        <div className="flex flex-row items-center relative">
          <input
            type="text"
            value={step === 1 ? email : code}
            onChange={step === 1 ? handleEmailChange : handleCodeChange}
            className="h-14 lg:h-20 w-full rounded-[70px] pl-8 bg-[#EAF0D6] text-[#695846] text-lg lg:text-xl"
            placeholder={step === 1 ? 'Enter your email' : 'Enter your code'}
            onKeyDown={onKeyPress}
          />
          <button
            className="rounded-[70px] h-14 lg:h-20 bg-[#D99362] w-[100px] absolute right-0"
            onClick={step === 1 ? handleLogin : handleCheck}
          >
            <ArrowRightIcon size={40} fill="#ffffff" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

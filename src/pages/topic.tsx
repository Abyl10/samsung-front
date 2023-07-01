import React from 'react';
import BookImg from '@/assets/book-image.png';

const Topic: React.FC = () => {
  return (
    <div className="">
      <div className="flex flex-row gap-11 max-w-[1000px]">
        <div>
          <img src={BookImg} alt="book image" className="rounded" />
        </div>
        <div>
          <h1 className="text-5xl">Harry Potter</h1>
          <h3 className="text-xl">JK Rowling</h3>
          <p className="text-black text-[16px] font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className="bg-stone-50 h-full">hello</div>
    </div>
  );
};

export default Topic;

import React from 'react';
import { BookmarkFillIcon, BookmarkIcon, FilterIcon } from '@primer/octicons-react';
import HomeOneX from '@/assets/home-onex.png';
import HomeHalfX from '@/assets/home-halfx.png';
import Button from '@/components/button';
import { useNavigate } from 'react-router';
import FilterIcons from '@/assets/gala_settings.svg';

interface IStory {
  id: string;
  title: string;
  description?: string;
  genre: string;
  saved?: boolean;
}

const stories: IStory[] = [
  {
    id: '1',
    title: 'Harry Potter',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    genre: 'Fantasy',
    saved: true,
  },
  {
    id: '2',
    title: 'Harry Potter',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    genre: 'Horror',
    saved: false,
  },
  {
    id: '3',
    title: 'Harry Potter',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    genre: 'Fantasy',
    saved: false,
  },
  {
    id: '4',
    title: 'Harry Potter',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    genre: 'Horror',
    saved: false,
  },
  {
    id: '5',
    title: 'Harry Potter',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    genre: 'Horror',
    saved: false,
  },
  {
    id: '6',
    title: 'Harry Potter',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    genre: 'Horror',
    saved: false,
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-[max(1140px, calc(100%_-_40px))] mx-auto">
        <div className="flex flex-col items-center z-10">
          <h1 className="font-medieval text-3xl lg:text-5xl text-center text-[#4A4035] font-normal z-10 relative">
            Search Books
          </h1>
          <img srcSet={`${HomeOneX} 1x, ${HomeHalfX} 1x`} alt="Home" className="-mt-5" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#2D4441] to-[#172325] px-40 pb-[45px] pt-[250px] -mt-44">
        <div className="flex justify-end mb-16">
          <Button variant={'primary'} className="w-48">
            Filters <img src={FilterIcons} alt="filter" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          {stories.map((story) => (
            <div
              onClick={() => navigate('/story')}
              key={story.id}
              className="bg-stone-50 rounded-[30px] shadow-md overflow-hidden relative p-6 cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex flex-row items-center justify-between">
                <p className="text-[#81837A] text-xl font-bold font-ubuntu">Genre</p>
                {story.saved ? (
                  <BookmarkFillIcon size={24} className="text-[#4A4035]" />
                ) : (
                  <BookmarkIcon size={24} className="text-[#4A4035]" />
                )}
              </div>
              <h1 className="mt-7 text-[#695846] text-5xl font-normal font-medieval">Title</h1>
              <p className="mt-4 text-[#81837A] text-xl font-light">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

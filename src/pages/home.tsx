import React, { useState } from 'react';
import { BookmarkFillIcon, BookmarkIcon } from '@primer/octicons-react';
import HomeOneX from '@/assets/home-onex.png';
import HomeHalfX from '@/assets/home-halfx.png';
import Button from '@/components/button';
import { useNavigate } from 'react-router';
import FilterIcons from '@/assets/gala_settings.svg';
import { getGenre, getTopicByGenreId, getTopics } from '@/requests/topic';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/loading';
import { IGenre, ITopic } from '@/ts/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<IGenre | null>(null);
  const [genre, setGenre] = useState<IGenre[]>([]);

  const { data, error, isLoading } = useQuery(['topic'], getTopics, {
    staleTime: 600000,
    refetchOnWindowFocus: false,
  });

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
      <div className="bg-gradient-to-r from-[#2D4441] to-[#172325] px-20 pb-[45px] pt-[250px] -mt-44">
        <div className="flex justify-end mb-16">
          <Button variant={'primary'} className="w-48">
            Filters <img src={FilterIcons} alt="filter" />
          </Button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {data?.map((topic) => (
              <div
                onClick={() => navigate(`/topic/${topic.id}`)}
                key={topic.id}
                className="bg-stone-50 rounded-[30px] shadow-md overflow-hidden relative cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
              >
                <div>
                  <img
                    src={topic.image_url}
                    alt="topic image"
                    className="h-72 rounded w-full object-cover object-center mb-6"
                  />
                </div>
                <div className="px-6 pb-6">
                  <h1 className="mt-7 text-[#695846] text-5xl font-normal font-medieval">Title</h1>
                  <p className="mt-4 text-[#81837A] text-xl font-light">
                    {topic.description?.slice(0, 120)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

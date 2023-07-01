import React, { useState, useEffect } from 'react';
import StoryImage from '@/assets/story-image.png';
import { GearIcon, LinkExternalIcon } from '@primer/octicons-react';
import Button from '@/components/button';
import { useLocation } from 'react-router';
import { IChoice, IResponseImage, IStory } from '@/ts/types';
import { getImage, getStoryById } from '@/requests/topic';
import { useQuery } from '@tanstack/react-query';

const Story: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(18);
  const location = useLocation();
  const [selectedChoice, setSelectedChoice] = useState<IChoice | null>(null);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [story, setStory] = useState<IStory | undefined>(undefined);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const { data, error, isLoading } = useQuery<IResponseImage>(
    ['image', story?.related_pages[0].image_id],
    () => getImage(story?.related_pages[0].image_id as number),
    {
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
    }
  );

  const handleClick = () => {
    console.log(location);
  };

  useEffect(() => {
    if (location.state) {
      const { storyId } = location.state as { storyId: number };
      getStoryById(storyId).then((res) => {
        console.log(res);
        setIsFirstVisit(false);
        setStory(res);
        setPage(res.related_pages[0].id);
      });
    }
  }, []);

  return (
    <div className="mx-auto max-w-[max(1140px, calc(100%_-_40px))] rounded-[30px] px-10 pb-10 bg-[#FDFBF7] flex items-center justify-center flex-col relative">
      <h1 className="text-center mb-10 text-6xl font-medieval capitalize">
        The story about harry potter
      </h1>
      <div className="mx-auto max-w-[1000px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <img
            src={data?.path}
            alt="story image"
            className="max-w-full h-[300px] object-contain rounded-lg"
            loading="lazy"
          />
          <div className="flex flex-col justify-between">
            <span
              onClick={() => {
                console.log('click');
              }}
            >
              <GearIcon size={24} className="cursor-pointer absolute top-6 right-6" />
            </span>
            <p
              className="font-light text-left h-[400px] overflow-auto"
              style={{ fontSize: `${fontSize}px` }}
            >
              {story?.related_pages[0].content}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Button variant={'primary'} className="w-[250px]" onClick={handleClick}>
          Continue <LinkExternalIcon size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Story;

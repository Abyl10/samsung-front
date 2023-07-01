import React, { useState } from 'react';
import StoryImage from '@/assets/story-image.png';
import { GearIcon, LinkExternalIcon } from '@primer/octicons-react';
import Button from '@/components/button';

const Story: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(18);
  return (
    <div className="mx-auto max-w-[max(1140px, calc(100%_-_40px))] rounded-[30px] px-10 pb-10 bg-[#FDFBF7] flex items-center justify-center flex-col relative">
      <h1 className="text-center mb-10 text-6xl font-medieval capitalize">
        The story about harry potter
      </h1>
      <div className="mx-auto max-w-[1000px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <img src={StoryImage} alt="story image" className="max-w-full h-[300px] object-contain" />
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
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Button variant={'primary'} className="w-[250px]">
          Start Reading <LinkExternalIcon size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Story;

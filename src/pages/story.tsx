import React, { useState } from 'react';
import StoryImage from '@/assets/story-image.png';
import { cn } from '@/utils/utils';

const Story: React.FC = () => {
  const [fontSize, setFontSize] = useState<string>('10px');
  return (
    <div className="mx-auto max-w-[max(1140px, calc(100%_-_40px))] rounded-[30px] px-10 pb-10 bg-[#FDFBF7] flex items-center justify-center flex-col">
      <h1 className="text-center mb-10 text-6xl font-medieval capitalize">
        The story about harry potter
      </h1>
      <div className="mx-auto max-w-[1000px]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <img src={StoryImage} alt="story image" className="max-w-full h-auto object-contain" />
          <div className="flex flex-col justify-between">
            <p className="font-light text-left" style={{ fontSize: fontSize }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry s standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <button>Start reading</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;

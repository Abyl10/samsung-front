import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookImg from '@/assets/book-image.png';
import { Button } from '@/components';
import { LinkExternalIcon } from '@primer/octicons-react';
import { createStory } from '@/requests/topic';
import { Loading } from '@/components';

const SingleTopic: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const handleStartReadingClick = () => {
    console.log(params.id);
    setLoading(true);
    createStory(Number(params.id))
      .then((res) => {
        setLoading(false);
        navigate(`/topic/${params.id}/story`, { state: { storyId: res.id } });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full ml-24 sm:ml-24 sm:w-full  sm:max-w-screen-[400px] md:w-[780px] md:max-w-screen-sm lg:w-[1140px] lg:max-w-screen-lg md:mx-auto lg:mx-auto h-full">
          hello
          <Button variant={'primary'} className="w-[250px]" onClick={handleStartReadingClick}>
            Start Reading <LinkExternalIcon size={24} />
          </Button>
        </div>
      )}
    </>
  );
};

export default SingleTopic;

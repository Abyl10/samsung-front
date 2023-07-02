import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookImg from '@/assets/book-image.png';
import { Button } from '@/components';
import { LinkExternalIcon } from '@primer/octicons-react';
import { createStory, getImage } from '@/requests/topic';
import { Loading } from '@/components';
import { ITopic } from '@/ts/types';
import { getSingleTopic } from '@/requests/topic';

const SingleTopic: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [topic, setTopic] = useState<ITopic | undefined>(undefined);

  useEffect(() => {
    getSingleTopic(Number(params.id)).then((res) => {
      setTopic(res);
    });
  }, []);

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
          <div className="flex flex-row gap-12">
            <img src={topic?.image_url} alt="book" className="object-cover rounded-lg" />
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-2xl text-[#695846] mb-10">{topic?.description}</p>
                <p className="text-lg text-[#695846]">{`Story created at: ${new Date(
                  topic?.created_at as string
                ).toLocaleDateString('en-GB')}`}</p>
              </div>
              <Button variant={'primary'} className="w-[250px]" onClick={handleStartReadingClick}>
                Start Reading <LinkExternalIcon size={24} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTopic;

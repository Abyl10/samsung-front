import React, { useState, useEffect, useRef } from 'react';
import { GearIcon, LinkExternalIcon } from '@primer/octicons-react';
import Button from '@/components/button';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createChoice, getAudio, getImage, getPages, getStoryById } from '@/requests/topic';
import { IContent, IResponseImage, IStory } from '@/ts/types';
import { Loading } from '@/components';

const StoryPage: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(18);
  const { state } = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [choiseTurn, setChoiseTurn] = useState<boolean>(false);
  const [story, setStory] = useState<IContent>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [audioUrl, setAudioUrl] = useState<IResponseImage>({
    id: 0,
    path: '',
    created_at: '',
  });
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaSourceRef = useRef<MediaSource>(new MediaSource());
  const [audioOutput, setAudioOutput] = useState<any>(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);

  useEffect(() => {
    console.log(state.data);
    getPages(Number(state.data.page_id)).then((res) => {
      console.log(res);
      if (res.choices.length === 0) {
        navigate('/end-story');
      }
      setStory(res);
      getImage(res.image_id).then((res) => {
        setImageUrl(res.path);
      });
      getAudio(res.audio_id).then((res) => {
        console.log(res);
        setAudioUrl(res);
      });
    });
  }, [state.data.page_id]);

  const getAudios = async () => {
    const response = await fetch(audioUrl?.path).then((res) => res.json());
    setAudioOutput(response.output);
  };

  useEffect(() => {
    if (audioUrl.path) {
      getAudios();
    }
  }, [audioUrl]);

  const handleContinueClick = () => {
    setChoiseTurn(true);
  };

  const currentUrlIndex = useRef(0);

  const startStreaming = async () => {
    if (currentUrlIndex.current >= audioOutput.length) {
      return;
    }

    setCurrentPlayingIndex(currentUrlIndex.current);
    const response = await fetch(audioOutput[currentUrlIndex.current].url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    if (audioRef.current) {
      audioRef.current.src = objectUrl;
      audioRef.current.onended = () => {
        URL.revokeObjectURL(objectUrl);
        currentUrlIndex.current++;
        startStreaming();
      };
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = URL.createObjectURL(mediaSourceRef.current);
    }
    mediaSourceRef.current.addEventListener('sourceopen', startStreaming);
  }, []);

  const handleChoiceClick = (choise_id: number) => {
    setLoading(true);
    createChoice(Number(choise_id))
      .then((res) => {
        console.log(res);
        setLoading(false);
        setChoiseTurn(false);
        navigate(`/topic/${params.id}/story/page/${choise_id}`, {
          state: { data: res },
        });
      })
      .catch((err) => {
        console.log(err);
        setChoiseTurn(false);
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto max-w-[max(1140px, calc(100%_-_40px))] rounded-[30px] px-10 pb-10 bg-[#FDFBF7] flex items-center justify-center flex-col relative">
      {!choiseTurn ? (
        <>
          <h1 className="text-center mb-10 text-6xl font-medieval capitalize mt-10">The story</h1>
          <div className="mx-auto max-w-[1000px]">
            <div className="flex flex-col gap-8 lg:flex-row">
              <img
                src={imageUrl}
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
                <div
                  className="font-light text-left h-[400px] overflow-auto"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {audioOutput?.length > 0 &&
                    audioOutput.map((item: { url: string; text: string }, index: number) => (
                      <p
                        key={item.url}
                        style={
                          index === currentPlayingIndex
                            ? { backgroundColor: '#F4B659', fontSize: `${fontSize * 1.2}px` }
                            : {}
                        }
                      >
                        {item.text}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <Button variant={'primary'} className="w-[250px]" onClick={handleContinueClick}>
              Continue <LinkExternalIcon size={24} />
            </Button>
            <div className="flex flex-row gap-4">
              <audio ref={audioRef} controls></audio>
              <button onClick={() => startStreaming()}>Start</button>
              <button onClick={() => audioRef.current?.pause()}>Pause</button>
              <button onClick={() => audioRef.current?.play()}>Play</button>
            </div>
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {story?.choices.map((choice, index) => (
                <div
                  key={choice.id}
                  className="flex flex-col gap-4 max-w-screen-[350px] w-[300px] justify-between pt-5"
                >
                  <p className="">{choice.prompt}</p>
                  <Button
                    variant={'primary'}
                    className="w-full"
                    onClick={() => handleChoiceClick(choice.id)}
                  >
                    {`Variant ${index + 1}`}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StoryPage;

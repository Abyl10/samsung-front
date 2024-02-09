import React, { useEffect, useState } from 'react';
import HomeOneX from '@/assets/home-onex.png';
import HomeHalfX from '@/assets/home-halfx.png';
import Button from '@/components/button';
import { useNavigate } from 'react-router';
import FilterIcons from '@/assets/gala_settings.svg';
import { crateTopicWithImage, getGenre, getTopicByGenreId, getTopics } from '@/requests/topic';
import Loading from '@/components/loading';
import { ICreateTopicWithImage, IGenre, ITopic } from '@/ts/types';
import Select from 'react-select';
import { Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-toastify';

const Home: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageLoader, setImageLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const [topics, setTopics] = useState<ITopic[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<{ label: string; value: number } | null>(null);
  const [genre, setGenre] = useState<IGenre[]>([]);
  const [isTooltipOpen, setTooltipOpen] = useState(false); // New state for tooltip

  const [createTopicForm, setCreateTopicForm] = useState<ICreateTopicWithImage>({
    genre_id: 0,
    description: '',
    image_url: '',
  });

  const handleChangeTopicForm = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCreateTopicForm({
      ...createTopicForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTopicWithImage = () => {
    setImageLoader(true);
    crateTopicWithImage(createTopicForm)
      .then((res) => {
        toast.success('Create topic successfully');
        setImageLoader(false);
        getTopics().then((result) => {
          setTopics(result);
        });
        close();
      })
      .catch((err) => {
        toast.error('Create topic failed');
        setImageLoader(false);
      });
  };

  const toggleTooltip = () => {
    setTooltipOpen(!isTooltipOpen);
  };

  useEffect(() => {
    getTopics().then((res) => {
      setTopics(res);
    });
    getGenre().then((res) => {
      setGenre(res);
    });
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      getTopicByGenreId(selectedGenre.value).then((res) => {
        setTopics(res);
      });
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (!isTooltipOpen) setSelectedGenre(null);
    getTopics().then((res) => {
      setTopics(res);
    });
  }, [isTooltipOpen]);

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
      <div className="bg-gradient-to-r from-[#2D4441] to-[#172325] px-4 sm:px-10 pb-[45px] pt-[250px] -mt-44">
        <div className="flex justify-end mb-16">
          <Button variant={'primary'} className="w-48" onClick={toggleTooltip}>
            Filters <img src={FilterIcons} alt="filter" />
          </Button>

          <div className="relative mt-20 md:mt-0" onMouseEnter={() => setTooltipOpen(true)}>
            {isTooltipOpen && (
              <div className="absolute -right-[100px] -top-[80px] w-96 z-10">
                <div className="mx-auto container  max-w-[228px] px-4 py-4 bg-white rounded relative">
                  <p className="text-sm font-semibold leading-none text-gray-800">Choose a genre</p>
                  <Select
                    options={genre.map((g) => ({ value: g.id, label: g.name }))}
                    onChange={(e) => {
                      setSelectedGenre(e);
                    }}
                  />
                  <svg
                    className="absolute bottom-[-10px] "
                    width={16}
                    height={10}
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 10L0 0L16 1.41326e-06L8 10Z" fill="white" />
                  </svg>
                  <svg
                    className="absolute bottom-[-30px]  z-10 cursor-pointer"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.75 2C4.57469 2 2 4.57469 2 7.75C2 10.9253 4.57469 13.5 7.75 13.5C10.9253 13.5 13.5 10.9253 13.5 7.75C13.5 4.57469 10.9253 2 7.75 2Z"
                      stroke="#1F2937"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="M6.875 6.875H7.875V10.5"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 10.625H9.25"
                      stroke="#1F2937"
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                    />
                    <path
                      d="M7.75 4.0625C7.5893 4.0625 7.43222 4.11015 7.2986 4.19943C7.16499 4.28871 7.06084 4.41561 6.99935 4.56407C6.93785 4.71254 6.92176 4.8759 6.95311 5.03351C6.98446 5.19112 7.06185 5.3359 7.17548 5.44953C7.28911 5.56316 7.43388 5.64054 7.59149 5.67189C7.7491 5.70324 7.91247 5.68715 8.06093 5.62566C8.2094 5.56416 8.3363 5.46002 8.42557 5.3264C8.51485 5.19279 8.5625 5.0357 8.5625 4.875C8.5625 4.65951 8.4769 4.45285 8.32453 4.30048C8.17215 4.1481 7.96549 4.0625 7.75 4.0625Z"
                      fill="#1F2937"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {topics?.map((topic) => (
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
                  <h1 className="mt-7 text-[#695846] text-4xl font-normal font-medieval">
                    {topic.description.split(' ').slice(0, 3).join(' ') + '...'}
                  </h1>
                  <p className="mt-4 text-[#81837A] text-xl font-light">
                    {topic.description?.slice(0, 120)}
                  </p>
                </div>
              </div>
            ))}
            <div
              onClick={open}
              className="bg-stone-50 rounded-[30px] shadow-md overflow-hidden relative cursor-pointer hover:transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            >
              <h3 className="text-[100px] text-[#695846]">+</h3>
            </div>
          </div>
        )}
      </div>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <p className="font-semibold">Select genre</p>
        <Select
          options={genre.map((g) => ({ value: g.id, label: g.name }))}
          name="genre_id"
          onChange={(e) => {
            if (e) {
              setCreateTopicForm({ ...createTopicForm, genre_id: e.value });
            }
          }}
        />
        <Textarea
          placeholder="Description"
          label="Description of topic"
          withAsterisk
          onChange={handleChangeTopicForm}
          name="description"
          size={'lg'}
          className="mt-5"
        />
        <Button
          variant={'primary'}
          className="w-full mt-5 h-16"
          onClick={handleCreateTopicWithImage}
          disabled={imageLoader}
        >
          {imageLoader ? '...loading' : 'Create topic'}
        </Button>
      </Modal>
    </div>
  );
};

export default Home;

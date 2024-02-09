import axios from 'axios';
import { apiStory } from './apiStory';
import {
  IContent,
  ICreateTopicWithImage,
  IGenre,
  IResponseImage,
  IStory,
  ITopic,
} from '@/ts/types';

export const getTopics = (): Promise<ITopic[]> => {
  return apiStory.get('/topic').then((res) => res.data);
};

export const getTopicByGenreId = (genreId: number): Promise<ITopic[]> => {
  return apiStory.get(`/topic/${genreId}`).then((res) => res.data);
};

export const getGenre = (): Promise<IGenre[]> => {
  return apiStory.get('/genre').then((res) => res.data);
};

export const createGenre = (name: string) => {
  return apiStory.post('/genre', { name }).then((res) => res.data);
};

interface IResponseCreateTopic {
  topic_id: number;
  user_id: number;
  created_at: string;
  id: number;
}

export const createStory = (topic_id: number): Promise<IResponseCreateTopic> => {
  return apiStory.post('/story', { topic_id }).then((res) => res.data);
};

export const getStoryById = (story_id: number): Promise<IStory> => {
  return apiStory.get(`/story/${story_id}`).then((res) => res.data);
};

export const getImage = (image_id: number): Promise<IResponseImage> => {
  return apiStory.get(`/image/${image_id}`).then((res) => res.data);
};

export const getPages = (page_id: number): Promise<IContent> => {
  return apiStory.get(`/page?page_id=${page_id}`).then((res) => res.data);
};

export interface IResponseChoice {
  story_id: number;
  page_id: number;
  prompt: string;
  page_order: number;
  image_id: number;
  id: number;
  created_at: string | null;
}

export const createChoice = (choice_id: number): Promise<IResponseChoice> => {
  return apiStory.post(`/choice?choice_id=${choice_id}`).then((res) => res.data);
};

export const getSingleTopic = (topic_id: number): Promise<ITopic> => {
  return apiStory.get(`/topic/single/${topic_id}`).then((res) => res.data);
};

export const getAudio = (audio_id: number): Promise<IResponseImage> => {
  return apiStory.get(`/audio/${audio_id}`).then((res) => res.data);
};

export const getAudioByIndex = (audio_id: number, index: number) => {
  return axios
    .get(`https://streaming.yui-chan.com/audio/${audio_id}/${index}`)
    .then((res) => res.data);
};

export const getAudioEndpoint = (audio_id: number) => {
  return axios.get(`https://streaming.yui-chan.com/audio/${audio_id}`).then((res) => res.data);
};

export const crateTopicWithImage = (form: ICreateTopicWithImage) => {
  return apiStory.post('/topic/create/with_image', form).then((res) => res.data);
};

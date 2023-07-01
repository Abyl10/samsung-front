import { apiStory } from './apiStory';
import { IContent, IGenre, IResponseImage, IStory, ITopic } from '@/ts/types';

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
  return apiStory.get(`/page/${page_id}`).then((res) => res.data);
};

export interface IUser {
  id: number;
  email: string;
  created_at: string;
}

export interface ITopic {
  genre_id: number;
  description: string;
  image_url: string;
  id: number;
  created_at: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IChoice {
  story_id: number;
  page_id: number;
  prompt: string;
  page_order: number;
  image_id: number;
  id: number;
  created_at: string | null;
}

export interface IContent {
  content: string;
  id: number;
  image_id: number;
  audio_id: number;
  created_at: string | null;
  choices: IChoice[];
}

export interface IStory {
  topic_id: number;
  user_id: number;
  created_at: string;
  id: number;
  related_choices: IChoice[];
  related_pages: IContent[];
}

export interface IResponseImage {
  id: number;
  path: string;
  created_at: string;
}

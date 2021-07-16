import { History } from 'history';

export interface TripBuilderProps {
  title: string;
  history: History;
}

export interface ExperienceContentDataProps {
  pkexperience: number;
  title: string;
  imgUrl: string;
  imgAlt: string;
}

export interface ElementProps {
  type: string;
  content: ExperienceContentDataProps | string;
}

export interface ManyElementDataProps {
  [date: string]: ElementProps[];
}

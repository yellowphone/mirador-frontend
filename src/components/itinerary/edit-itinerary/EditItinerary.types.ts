import { History } from 'history';
import { TSFixMe } from '../../../types/global';

export interface ItineraryEditorProps {
  data: TSFixMe;
  //   title: string;
  //   history: History;
}

export interface SavedExperiencesDataProps {
  data: TSFixMe;
}

export interface EditItineraryDataProps {
  data: TSFixMe;
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

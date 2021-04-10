import { History } from 'history';
export interface CreateItineraryDataProps {
  history: History;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectedCreateItineraryDataProps {}

export interface ItineraryBuilderProps {
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
  content: ExperienceContentDataProps;
}

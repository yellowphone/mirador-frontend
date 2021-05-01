import { ManyElementDataProps } from '../create-itinerary/CreateItinerary.types';

export interface SingleItineraryProps {
  data: FindItineraryByIdObject;
  elements: ManyElementDataProps;
}

export interface FindItineraryByIdObject {
  pkitinerary: number;
  title: string;
  summary: string;
  mongoid: string;
  created_on: Date;
  public_identifier: string;
  user_itineraries: UserItineraries;
  users: Users;
  itinerary_tags: ExperienceTags;
}

export interface ExperienceTags {
  pkblog_tag: number;
  tags: {
    tag: string;
  }[];
}

export interface UserItineraries {
  users: {
    username: string;
  }[];
}

export interface Users {
  users: {
    pkuser: number;
  };
}

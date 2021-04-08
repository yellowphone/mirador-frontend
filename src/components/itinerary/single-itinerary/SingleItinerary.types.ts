import { TSFixMe } from '../../../types/global';

export interface SingleItineraryProps {
  data: FindItineraryByIdObject;
}

// will fix these in another PR
// @TODO: Geo! fix these types.
export interface FindItineraryByIdObject {
  pkitinerary: number;
  title: string;
  summary: string;
  mongoid: string;
  created_on: Date;
  user_itineraries: TSFixMe[];
  users: TSFixMe;
  itinerary_tags: ExperienceTags;
  itinerary_experiences: TSFixMe[];
}

export interface ExperienceTags {
  pkblog_tag: number;
  tags: {
    tag: string;
  }[];
}

import { TSFixMe } from '../../../types/global';

export interface SingleItineraryProps {
  data: FindItineraryByIdObject;
}

export interface FindItineraryByIdObject {
  pkitinerary: number;
  title: string;
  summary: string;
  content: TSFixMe[];
  created_on: Date;
  user_itineraries: TSFixMe[];
  users: TSFixMe;
  itinerary_tags: TSFixMe[];
  itinerary_experiences: TSFixMe[];
}

import { LatLng } from '../../../utils/context/LocationContext';
import { DifficultyType } from '../../shared/media/Badges/Badges.types';

export interface ExperienceImageInstance {
  url: string;
}
export interface ExperienceImage {
  images: ExperienceImageInstance;
}

export interface ExperienceTags {
  pkexperience_tag: number;
  tags: {
    tag: string;
  }[];
}

export interface ReviewExperiences {
  rating: number;
  content: string;
  users: {
    username: string;
  }[];
}
export interface Experience {
  pkexperience: number;
  title: string;
  summary: string;
  created_on: Date;
  experience_locations: LatLng;
  miles: number;
  elevation: number;
  climbing: string;
  cost: number;
  public_identifier: string;
  difficulty: DifficultyType;
  experience_images: ExperienceImage[];
  review_experiences: ReviewExperiences;
  experience_tags: ExperienceTags;
}
export interface SingleExperienceProps {
  data: {
    findExperienceByPublicIdentifier: Experience;
  };
}

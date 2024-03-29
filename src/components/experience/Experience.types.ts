import { Dispatch, SetStateAction } from 'react';
import { LatLng } from '../../utils/context/LocationContext';
import { DifficultyType } from '../shared/media/Badges/Badges.types';

export interface IExperience {
  fk_experience_location: number;
  imageUrl: string;
  imageAlt: string;
  miles: number;
  elevation: number;
  climbing: string;
  cost: number;
  title: string;
  summary: string;
  rating: number;
  lat: number;
  lng: number;
  difficulty: DifficultyType;
  public_identifier: string;
  url?: [string];
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface ExperienceDataProps {
  experiences: Array<IExperience>;
  coords: ICoordinates;
  setCoords: Dispatch<SetStateAction<LatLng>>;
}

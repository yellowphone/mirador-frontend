import { DifficultyType } from '../shared/media/Badges/Badges.types';

export interface IExperience {
    fk_experience_location: number,
    imageUrl: string
    imageAlt: string
    miles: number
    elevation: number
    title: string
    summary: string
    rating: number
    lat: number
    lng: number
    difficulty: DifficultyType
}

export interface ICoordinates {
    lat: number
    lng: number
}

export interface ExperienceDataProps {
    experiences: Array<IExperience>;
    coords: ICoordinates;
    setCoords: Function;
    refetch: any;
}

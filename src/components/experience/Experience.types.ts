import { DifficultyType } from '../shared/media/Badges/Badges.types';

export interface IExperience {
    imageUrl: string
    imageAlt: string
    length: number
    elevation: number
    title: string
    rating: number
    lat: number
    lng: number
    difficulty: DifficultyType
}

export interface ExperienceDataProps {
    experiences: Array<IExperience>;
}

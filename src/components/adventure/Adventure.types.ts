import { DifficultyType } from '../shared/media/Badges/Badges.types';

export interface IAdventure {
    imageUrl: string
    imageAlt: string
    length: number
    elevation: number
    title: string
    rating: number
    lat: number
    long: number
    difficulty: DifficultyType
}

export interface AdventureDataProps {
    adventures: Array<IAdventure>;
}
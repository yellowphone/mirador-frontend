import { DifficultyType } from '../shared/media/Badges/Badges.types';

export interface IAdventure {
    fk_adventure_location: number,
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

export interface AdventureDataProps {
    adventures: Array<IAdventure>;
    coords: ICoordinates;
    setCoords: Function;
    refetch: any;
}

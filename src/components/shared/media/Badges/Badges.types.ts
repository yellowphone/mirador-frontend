export enum DifficultyType {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

export interface DifficultyBadgeDataProps {
    difficulty: DifficultyType,
}
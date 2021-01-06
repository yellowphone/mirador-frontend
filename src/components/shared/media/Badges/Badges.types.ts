// export enum DifficultyType {
//     EASY = 'EASY',
//     MEDIUM = 'MEDIUM',
//     HARD = 'HARD',
// }

export enum DifficultyType {
    EASY = "EASY",
    MODERATE = "MODERATE",
    HARD = "HARD",
}

export interface DifficultyBadgeDataProps {
    difficulty: DifficultyType,
}
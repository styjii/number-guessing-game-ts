export type GuessResult = "higher" | "lower" | "correct" | "gameOver";

export interface GameConfig {
  min: number;
  max: number;
}

export interface DifficultyLevel {
  easy: GameConfig;
  normal: GameConfig;
  hard: GameConfig;
}

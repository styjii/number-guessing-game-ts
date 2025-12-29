export type GuessResult = "higher" | "lower" | "correct";

export interface GameConfig {
  min: number;
  max: number;
}

export class NumberGuessingGame {
  private targetNumber: number;
  private attemptsCount = 0;
  private readonly config: GameConfig;

  constructor(config: GameConfig) {
    if (config.min >= config.max) {
      throw new Error("min doit être inférieur à max");
    }

    this.config = config;
    this.targetNumber = this.generateRandomNumber();
  }

  private generateRandomNumber(): number {
    const { min, max } = this.config;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public checkGuess(value: number): GuessResult {
    this.attemptsCount++;

    if (value < this.targetNumber) return "higher";
    if (value > this.targetNumber) return "lower";
    return "correct";
  }

  public reset(): void {
    this.targetNumber = this.generateRandomNumber();
    this.attemptsCount = 0;
  }

  public getAttemptsCount(): number {
    return this.attemptsCount;
  }

  public getConfig(): GameConfig {
    return this.config;
  }
}
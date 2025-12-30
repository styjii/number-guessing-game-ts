import type { GameConfig, GuessResult } from "../models/Game";

export class NumberGuessingGame {
  private targetNumber: number;
  private attemptsCount = 0;
  private readonly config: GameConfig;
  private readonly MAX_ATTEMPTS: number;

  constructor(config: GameConfig) {
    if (config.min >= config.max) {
      throw new Error("La valeur minimale doit être inférieure à la valeur maximale.");
    }

    this.config = config;
    this.MAX_ATTEMPTS = Math.ceil(Math.log2(config.max - config.min + 1));
    this.targetNumber = this.generateRandomNumber();
  }

  private generateRandomNumber(): number {
    const { min, max } = this.config;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public checkGuess(value: number): GuessResult {
    if (this.attemptsCount >= this.MAX_ATTEMPTS) {
      return "gameOver";
    }

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

  public getMaxAttempts(): number {
    return this.MAX_ATTEMPTS;
  }

  public getConfig(): GameConfig {
    return this.config;
  }

  public getTargetNumber(): number {
    return this.targetNumber;
  }
}

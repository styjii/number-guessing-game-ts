import type { GameConfig } from "../models/Game";
import difficultyLevels from "../mocks/difficultyLevels.json";

export const difficultyLevelSelect = document.querySelector<HTMLSelectElement>("#difficultyLevel")!;

export function getLevel(): GameConfig {
  const selectedLevel = difficultyLevelSelect.value;
  const levels = difficultyLevels;

  switch (selectedLevel) {
    case "easy":
      return levels.easy;
    case "normal":
      return levels.normal;
    case "hard":
      return levels.hard;
    default:
      throw new Error("Niveau invalide !");
  }
}
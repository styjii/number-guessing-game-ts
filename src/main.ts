import "./style.css";
import { NumberGuessingGame } from "./services/NumberGuessingGame";
import { GameUI } from "./services/GameUI";
import { difficultyLevelSelect, getLevel } from "./services/GameLevel";
import type { GameConfig } from "./models/Game";

main(getLevel());
difficultyLevelSelect.addEventListener("change", () => main(getLevel()));

function main(config: GameConfig): void {
  const game = new NumberGuessingGame(config);
  const ui = new GameUI(config);
  
  ui.onGuessSubmit((value: number) => {
    if (
      !Number.isInteger(value) ||
      value < config.min ||
      value > config.max
    ) {
      ui.displayError(
        `Veuillez entrer un nombre entre ${config.min} et ${config.max}.`
      );
      return;
    }
  
    const result = game.checkGuess(value);
    ui.displayResult(result);
    ui.displayAttempts(game.getAttemptsCount());
  });
  
  ui.onRestart(() => {
    game.reset();
    ui.reset();
    ui.displayAttempts(0);
  });
}
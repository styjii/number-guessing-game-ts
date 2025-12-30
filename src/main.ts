import "./style.css";
import { NumberGuessingGame } from "./services/NumberGuessingGame";
import { GameUI } from "./services/GameUI";
import { difficultyLevelSelect, getLevel } from "./services/GameLevel";
import type { GameConfig } from "./models/Game";

let game: NumberGuessingGame;
let ui: GameUI;

function startGame(config: GameConfig): void {
  game = new NumberGuessingGame(config);
  
  if (!ui) {
    ui = new GameUI(config);
    ui.displayMaxAttempts(game.getMaxAttempts());

    ui.onGuessSubmit((value: number) => {
      const currentConfig = game.getConfig();

      if (!Number.isInteger(value) || value < currentConfig.min || value > currentConfig.max) {
        ui.displayError(`Veuillez entrer un nombre entre ${currentConfig.min} et ${currentConfig.max}.`);
        return;
      }

      const result = game.checkGuess(value);
      ui.addToHistory(value, result);

      if (result === "gameOver") {
        ui.displayGameOver(game.getTargetNumber());
      } else {
        ui.displayResult(result);
      }

      ui.displayAttempts(game.getAttemptsCount());
    });

    ui.onRestart(() => {
      game.reset();
      ui.reset();
      ui.resetHistory();
      ui.displayAttempts(0);
      ui.displayMaxAttempts(game.getMaxAttempts());
    });
  } else {
    ui.reset();
    ui.resetHistory();
    ui.displayMaxAttempts(game.getMaxAttempts());
    ui.displayAttempts(0);
    ui.updateRange(config);
  }
}

startGame(getLevel());
difficultyLevelSelect.addEventListener("change", () => startGame(getLevel()));

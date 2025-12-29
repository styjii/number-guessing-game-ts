import "./style.css";
import { NumberGuessingGame } from "./game";
import type { GameConfig } from "./game";
import { GameUI } from "./ui";

const gameConfig: GameConfig = {
  min: 1,
  max: 100,
};

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Élément #app introuvable");

const game = new NumberGuessingGame(gameConfig);
const ui = new GameUI(gameConfig);

ui.onGuessSubmit((value) => {
  if (
    !Number.isInteger(value) ||
    value < gameConfig.min ||
    value > gameConfig.max
  ) {
    ui.displayError(
      `Veuillez entrer un nombre entre ${gameConfig.min} et ${gameConfig.max}.`
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
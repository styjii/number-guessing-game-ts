import type { GuessResult, GameConfig } from "../models/Game";

export class GameUI {
  private readonly form: HTMLFormElement;
  private readonly guessInput: HTMLInputElement;
  private readonly messageElement: HTMLParagraphElement;
  private readonly attemptsElement: HTMLParagraphElement;
  private readonly restartButton: HTMLButtonElement;
  private readonly submitButton: HTMLButtonElement;

  private readonly minSpan: HTMLSpanElement;
  private readonly maxSpan: HTMLSpanElement;

  constructor(config: GameConfig) {
    this.form = this.querySelector("#gameForm");
    this.guessInput = this.querySelector("#guessInput");
    this.messageElement = this.querySelector("#message");
    this.attemptsElement = this.querySelector("#attempts");
    this.restartButton = this.querySelector("#restart");
    this.submitButton = this.querySelector('form button[type="submit"]');

    this.minSpan = this.querySelector("#min");
    this.maxSpan = this.querySelector("#max");

    this.initializeRange(config);
  }

  private initializeRange(config: GameConfig): void {
    this.guessInput.min = String(config.min);
    this.guessInput.max = String(config.max);

    this.minSpan.textContent = String(config.min);
    this.maxSpan.textContent = String(config.max);
  }

  public onGuessSubmit(handler: (value: number) => void): void {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      handler(Number(this.guessInput.value));
    });
  }

  public onRestart(handler: () => void): void {
    this.restartButton.addEventListener("click", handler);
  }

  public displayResult(result: GuessResult): void {
    const messages = {
      higher: "Plus grand !",
      lower: "Plus petit !",
      correct: "Bravo ! Vous avez trouvé le nombre 🎉",
    } as const;

    this.displayMessage(
      messages[result],
      result === "correct" ? "green" : "blue"
    );

    if (result === "correct") {
      document.body.classList.add("success");

      // Désactive le bouton Submit
      if (this.submitButton) {
        this.submitButton.disabled = true;
      }
    }
  }

  public displayAttempts(count: number): void {
    this.attemptsElement.textContent = `Nombre de tentatives : ${count}`;
  }

  public displayError(message: string): void {
    this.displayMessage(message, "red");
  }

  public reset(): void {
    this.guessInput.value = "";
    this.displayMessage("", "black");
    document.body.classList.remove("success");

    if (this.submitButton) {
      this.submitButton.disabled = false;
    }
  }

  private displayMessage(text: string, color: string): void {
    this.messageElement.textContent = text;
    this.messageElement.style.color = color;

    this.messageElement.classList.remove("show");
    void this.messageElement.offsetWidth;
    this.messageElement.classList.add("show");
  }

  private querySelector<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Élément ${selector} introuvable`);
    }
    return element as T;
  }
}
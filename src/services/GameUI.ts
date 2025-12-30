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

  private readonly maxAttemptsElement: HTMLParagraphElement;
  private readonly historyList: HTMLUListElement;

  constructor(config: GameConfig) {
    this.form = this.querySelector("#gameForm");
    this.guessInput = this.querySelector("#guessInput");
    this.messageElement = this.querySelector("#message");
    this.attemptsElement = this.querySelector("#attempts");
    this.restartButton = this.querySelector("#restart");
    this.submitButton = this.querySelector('form button[type="submit"]');

    this.minSpan = this.querySelector("#min");
    this.maxSpan = this.querySelector("#max");

    this.maxAttemptsElement = this.querySelector("#maxAttempts");
    this.historyList = this.querySelector("#historyList");

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

  public updateRange(config: GameConfig): void {
    this.guessInput.min = String(config.min);
    this.guessInput.max = String(config.max);
    this.minSpan.textContent = String(config.min);
    this.maxSpan.textContent = String(config.max);
  }

  public onRestart(handler: () => void): void {
    this.restartButton.addEventListener("click", handler);
  }

  public addToHistory(value: number, result: GuessResult): void {
    const li = document.createElement("li");
    let text = `Vous avez entré ${value}`;
    if (result === "higher") text += " → Plus grand";
    else if (result === "lower") text += " → Plus petit";
    else if (result === "correct") text += " → Correct ! 🎉";

    li.textContent = text;
    if (this.historyList.firstChild) {
      this.historyList.insertBefore(li, this.historyList.firstChild);
    } else {
      this.historyList.appendChild(li);
    }
  }

  public resetHistory(): void {
    this.historyList.innerHTML = "";
  }

  public displayResult(result: GuessResult): void {
    const messages = {
      higher: "Plus grand !",
      lower: "Plus petit !",
      correct: "Bravo ! Vous avez trouvé le nombre 🎉",
      gameOver: "", // géré dans displayGameOver
    } as const;

    if (result === "gameOver") return;

    this.displayMessage(
      messages[result],
      result === "correct" ? "green" : "blue"
    );

    if (result === "correct") {
      document.body.classList.add("success");
      if (this.submitButton) this.submitButton.disabled = true;
    }
  }

  public displayGameOver(targetNumber: number): void {
    const message = `Perdu ! Le nombre était ${targetNumber}. Nombre maximum de tentatives atteint.`;
    this.displayMessage(message, "red");
    document.body.classList.add("failure");

    if (this.submitButton) this.submitButton.disabled = true;
  }

  public displayAttempts(count: number): void {
    this.attemptsElement.textContent = `Nombre de tentatives : ${count}`;
  }

  public displayMaxAttempts(max: number): void {
    this.maxAttemptsElement.textContent = `Nombre maximum de tentatives : ${max}`;
  }

  public displayError(message: string): void {
    this.displayMessage(message, "red");
  }

  public reset(): void {
    this.guessInput.value = "";
    this.displayMessage("", "black");
    document.body.classList.remove("success", "failure");

    if (this.submitButton) this.submitButton.disabled = false;
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
    if (!element) throw new Error(`Élément ${selector} introuvable`);
    return element as T;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnakeGameService {
  private canvasWidth =  800;
  private canvasHeight = 800;
  private snake: {x: number, y: number}[] = [];
  private direction: 'up' | 'down' | 'left' | 'right' = 'right';
  private food: {x: number, y: number} = {x: 0, y: 0};
  private gameOver = false;
  private score = 0;
  private paused = false;

  resetGame() {
    this.snake = [{x: 0, y: 0}];
    this.direction = 'right';
    this.food = {
      x: Math.floor(Math.random() * this.canvasWidth / 10) * 10,
      y: Math.floor(Math.random() * this.canvasHeight / 10) * 10
    };
    this.gameOver = false;
    this.score = 0;
    this.paused = false;
  }

  tick(canvasWidth: number, canvasHeight: number) {
    if (this.gameOver || this.paused) {
      return;
    }
    this.advanceSnake(canvasWidth, canvasHeight);
  }

  private advanceSnake(canvasWidth: number, canvasHeight: number) {
    const head = this.snake[0];
    let newHead: {x: number, y: number} | null = null;
    if (this.direction === 'up') {
      newHead = {x: head.x, y: head.y - 10};
    } else if (this.direction === 'down') {
      newHead = {x: head.x, y: head.y + 10};
    } else if (this.direction === 'left') {
      newHead = {x: head.x - 10, y: head.y};
    } else if (this.direction === 'right') {
      newHead = {x: head.x + 10, y: head.y};
    }
    if (newHead && (this.outOfBounds(newHead, canvasWidth, canvasHeight) || this.snakeCollision(newHead))) {
      this.gameOver = true;
      return;
    }
    this.snake.unshift(newHead!);
    if (this.foodCollision(newHead!)) {
      this.score++;
      this.spawnFood(canvasWidth, canvasHeight);
    } else {
      this.snake.pop();
    }
  }

  private outOfBounds(position: {x: number, y: number}, canvasWidth: number, canvasHeight: number) {
    return (
      position.x < 0 ||
      position.y < 0 ||
      position.x >= canvasWidth ||
      position.y >= canvasHeight
    );
  }

  private snakeCollision(position: {x: number, y: number}) {
    return this.snake.some(segment => segment.x === position.x && segment.y === position.y);
  }

  private foodCollision(position: {x: number, y: number}) {
    return this.food.x === position.x && this.food.y === position.y;
  }

  private spawnFood(canvasWidth: number, canvasHeight: number) {
    this.food = {
      x: Math.floor(Math.random() * canvasWidth / 10) * 10,
      y: Math.floor(Math.random() * canvasHeight / 10) * 10
    };
  }

  getSnake() {
    return this.snake;
  }

  getFood() {
    return this.food;
  }

  getGameOver() {
    return this.gameOver;
  }

  getScore() {
    return this.score;
  }

  setDirection(direction: 'up' | 'down' | 'left' | 'right') {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }

  togglePause() {
    this.paused = !this.paused;
  }

  resume() {
    this.paused = false;
  }

  isPaused() {
    return this.paused;
  }
}

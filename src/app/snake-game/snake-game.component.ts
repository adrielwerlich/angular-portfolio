import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, ChangeDetectionStrategy, NgZone, inject } from '@angular/core';
import { SnakeGameService } from './snake-game.service';

@Component({
  selector: 'app-root',
  template: `
    <div style="width: 100%; height: 100%; display: flex; justify-content: center;">
      <canvas #canvas width="800" height="500" style="border: 1px solid black;"></canvas>
    </div>
    {{changeDetectionRan()}}
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnakeGameComponent implements AfterViewInit {
  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private snakeGame: SnakeGameService, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.ctx = this.canvas.nativeElement.getContext('2d')!;
      this.snakeGame.resetGame();
      setInterval(() => this.tick(), 100);
    })
  }

  changeDetectionRan(): void {
    console.log('cd ran')
  }

  private tick() {
    this.snakeGame.tick(this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.draw();
  }
  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ctx.fillStyle = 'black';
    this.snakeGame.getSnake().forEach(segment => this.ctx.fillRect(segment.x, segment.y, 10, 10));
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.snakeGame.getFood().x, this.snakeGame.getFood().y, 10, 10);
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Score: ${this.snakeGame.getScore()}`, 10, 25);
    if (this.snakeGame.getGameOver()) {
      const gameOverText = 'Game Over';
      const resetText = 'Press enter to reset';
      const gameOverTextWidth = this.ctx.measureText(gameOverText).width;
      const resetTextWidth = this.ctx.measureText(resetText).width;
      const canvasCenterX = this.canvas.nativeElement.width / 2;
      const canvasCenterY = this.canvas.nativeElement.height / 2;
      this.ctx.fillText(gameOverText, canvasCenterX - gameOverTextWidth / 2, canvasCenterY);
      this.ctx.fillText(resetText, canvasCenterX - resetTextWidth / 2, canvasCenterY + 25);
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' && this.snakeGame.getDirection() !== 'down') {
      this.snakeGame.setDirection('up');
    } else if (event.key === 'ArrowDown' && this.snakeGame.getDirection() !== 'up') {
      this.snakeGame.setDirection('down');
    } else if (event.key === 'ArrowLeft' && this.snakeGame.getDirection() !== 'right') {
      this.snakeGame.setDirection('left');
    } else if (event.key === 'ArrowRight' && this.snakeGame.getDirection() !== 'left') {
      this.snakeGame.setDirection('right');
    } else if (event.key === 'Enter') {
      this.snakeGame.resetGame();
    } else if (event.key === 'Escape' || event.key === 'p') {
      this.snakeGame.togglePause();
    }
  }
}

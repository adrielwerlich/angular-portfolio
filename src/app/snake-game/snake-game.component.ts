import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, ChangeDetectionStrategy, NgZone, inject } from '@angular/core';
import { SnakeGameService } from './snake-game.service';

@Component({
  selector: 'app-root',
  template: `
    <div style="width: 90%; height: 100%; display: flex; justify-content: center; margin: 2rem; padding: 2rem;">
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
  private previousOverflowStyle: string | null = null;

  constructor(private snakeGame: SnakeGameService, private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.ctx = this.canvas.nativeElement.getContext('2d')!;
      this.snakeGame.resetGame();
      setInterval(() => this.tick(), 100);
    })
    this.previousOverflowStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  ngOnDestroy() {
    if (this.previousOverflowStyle !== null) {
      document.body.style.overflow = this.previousOverflowStyle;
    }
  }

  changeDetectionRan(): void {
    console.log('cd ran')
  }

  private ensureFoodWithinCanvas() {
    const food = this.snakeGame.getFood();
    const canvasWidth = this.canvas.nativeElement.width;
    const canvasHeight = this.canvas.nativeElement.height;
    const foodSize = 10;

    if (food.x < 0) {
      food.x = 0;
    } else if (food.x + foodSize > canvasWidth) {
      food.x = canvasWidth - foodSize;
    }

    if (food.y < 0) {
      food.y = 0;
    } else if (food.y + foodSize > canvasHeight) {
      food.y = canvasHeight - foodSize;
    }
  }

  private tick() {
    this.snakeGame.tick(this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ensureFoodWithinCanvas();
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

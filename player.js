import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from './playerState.js';
import { CollisionAnimation } from './collisionAnim.js';
import { FloatingMessage } from './floatingMessages.js';

export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.energy = 10;
        this.energyInterval = 1000;
        this.energyCounter = 0;
        this.maxEnergy = 10;
        this.minEnergy = 0;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.currentState = null;
    }
    restart(){
        this.x = 0;
        this.y = this.gameHeight - this.height;
        this.currentState === this.states[0]
    }
    update(input, deltaTime){
        this.collision();
        this.currentState.handleInput(input);
        // horizontal m
        this.x += this.speed;
            if (input.includes('d') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
            else if (input.includes('a') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed;
            else this.speed = 0;
        //horizontal boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // vert m
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // vert boundaries
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
        // animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        //energy
        if (this.currentState === this.states[4]){
            if (this.energyCounter >= this.energyInterval){
                this.energyCounter = 0;
                if (this.minEnergy <= this.energy) {
                    this.energy--;
                }
            } else {
                this.energyCounter += deltaTime;
            }
        }
        if (this.maxEnergy <= this.energy){
        } else if (this.currentState === this.states[0]){
            if (this.energyCounter > this.energyInterval){
                this.energyCounter = 0;
                this.energy++;
            } else {
                this.energyCounter += deltaTime;
            }
        }
        console.log(this.energy)
    }

    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    collision(){
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                if (this.currentState === this.states[4] || this.currentState === this.states[5]){
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 150, 50));
                } else {
                    this.setState(6, 0);
                    this.game.lives--;
                    if (this.game.lives <= 0) this.game.gameOver = true;
                }
            }
        });
    }
}
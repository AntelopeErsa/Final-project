export class CollisionAnimation {
    constructor(game, x, y){
        this.game = game;
        this.image = collisionAnimation;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModidfier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModidfier;
        this.height = this.spriteHeight * this.sizeModidfier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = 15;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
}
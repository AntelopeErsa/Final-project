export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Bungee Spice';
        this.livesImage = lives;
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColour;
        // score
        context.fillText('Score: ' + this.game.score, 20, 50);
        //timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80)
        //energy
        context.fillText('Energy: ' + this.game.player.energy, 20, 110)
        //lives
        for (let i = 0; i < this.game.lives; i++){
            context.drawImage(this.livesImage, 30 * i + 20, 125, 25, 25);
        }
        
        // game over
        if (this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
            if (this.game.score > this.game.requiredScore){
                context.fillText('YOU ROCK!!', this.game.width * 0.5, this.game.height * 0.5);
                backmusic.pause();
                win.play(); 
            } else {
                context.fillText('SKILL ISSUE LOSER', this.game.width * 0.5, this.game.height * 0.5);
                backmusic.pause();
                go.play();
            }
        }
        if (this.game.lives <= 0) {
            context.textAlign = 'center';
            context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
            context.fillText('SKILL ISSUE LOSER', this.game.width * 0.5, this.game.height * 0.5);
            backmusic.pause();
            go.play();
        }
        //required
        context.textAlign = 'right';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillStyle = this.game.fontColour;
        context.fillText('Required Score: ' + this.game.requiredScore, 880, 50);
        context.fillText('Time Allowed: ' + (this.game.maxTime * 0.001).toFixed(1) + ' seconds', 880, 80);
        context.restore();
    } 
}
export class BoomText {
    constructor(text, x, y){
        this.text = text
        this.x = x;
        this.y = y;
        this.markedForDeletion = false;
        this.timer = 0; 
    }
    update(){
        this.timer++;
        if (this.timer > 20){
            this.markedForDeletion = true;
        }
    }
    draw(context){
        context.font = '50px Bungee Spice';
        context.fillText(this.text, this.x, this.y);
    }
}
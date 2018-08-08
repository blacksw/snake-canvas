class Bomb{
    constructor(canvas){
        this.icon_ok = 'img/bomb.png';
        this.x = randCoord();
        this.y = randCoord();
        this.direction = 'up';
        this.canvas = canvas;
    }
    // render to canvas
    render(){

        // segments
        var image = new Image();
            image.src = this.icon_ok;
            var self = this;
            image.onload = function(){
                self.canvas.drawImage(image, self.x,self.y);
            }

    }
    // clear it's place
    clear(){
        this.canvas.clearRect(this.x, this.y, 24, 24);
    }
}

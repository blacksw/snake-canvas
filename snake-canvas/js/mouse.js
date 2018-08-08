class Mouse{
    constructor(canvas){
        this.icon_mouse = 'img/mouse.png';
        this.x = randCoord();
        this.y = randCoord();
        this.direction = 'up';
        this.canvas = canvas;
    }
    // render to canvas
    render(){

        // segments
        var image = new Image();
            image.src = this.icon_mouse;
            var self = this;
            image.onload = function(){
                self.canvas.drawImage(image, self.x,self.y);
            }

    }

    // life cycle
    live(){
        var self = this;
        setInterval(function(){ self.render(); }, 100);
    }
}

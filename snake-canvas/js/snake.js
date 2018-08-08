// snake component
class Snake{
    constructor(canvas){
        this.icon_head = 'img/snake.png';
        this.icon_tail = 'img/tail.png';
        this.canvas = canvas;
        this.speed = 1.5;
        this.segments = [
            { x: randCoord(), y: randCoord(), d: 'u'}
        ];
    }

    // movement
    turnLeft(){
        this.segments[0].d = 'l';
    }
    turnUp(){
        this.segments[0].d = 'u';
    }
    turnRight(){
        this.segments[0].d = 'r';
    }
    turnDown(){
        this.segments[0].d = 'd';
    }




    // render to canvas
    render(){

        // segments
        for( var i = 0; i < this.segments.length; i++ ){
            if ( i == 0 ) {
                var image_head = new Image();
                    image_head.src = this.icon_head;
                    var self = this;
                    image_head.onload = function(){
                        self.canvas.drawImage(image_head,self.segments[0].x,self.segments[0].y);
                    }
            } else {
                var image_tail = new Image();
                    image_tail.src = this.icon_tail;
                    var self = this;
                    image_tail.onload = function(){
                        self.canvas.drawImage(image_tail,self.segments[1].x,self.segments[1].y);
                    }
            }
            this.canvas.fillRect(this.segments[i].x,this.segments[i].y,24,24);
        }

        // this.canvas.fillRect(this.x,this.y,24,24);

    }

    move(){
        this.clear();
        var head = this.segments[0];
        var new_x = head.x;
        var new_y = head.y;
        switch(head.d){
            case 'l':
                new_x = head.x - 24;
                new_x = new_x < minLimit() ? new_x = maxLimit(): new_x;
            break;
            case 'u':
                new_y = head.y - 24;
                new_y = new_y < minLimit() ? new_y = maxLimit(): new_y;
            break;
            case 'r':
                new_x = head.x + 25;
                new_x = new_x > maxLimit() ? new_x = minLimit(): new_x;
            break;
            case 'd':
                new_y = head.y + 24;
                new_y = new_y > maxLimit() ? new_y = minLimit(): new_y;
            break;
        }

        this.segments.unshift({
            x: new_x,
            y: new_y,
            d: head.d
        });

        // intersects items?
        if ( samePlace(this.segments[0], mouse) ){

        } else {
            this.segments.pop();
        }
        if (samePlace(this.segments[0], bomb) === true){
              this.segments.pop();
              if(this.segments.length == 2){
                for(var i = 0;i <= this.segments.length;i++){
                    this.segments[i].pop();
                }
                var gameover = document.createElement('div');
                var cvas = document.getElementById('map');
                cvas.appendChild(gameover);
                gameover.setAttribute('z-index','9999');
                gameover.innerText('Game Over');
              }
        }


        this.render();
    }


    // life cycle

    live(){
        var self = this;
        setInterval(function(){ self.move(); }, 500/self.speed);
    }

    // clear it's place
    clear(){
        for( var i = 0; i < this.segments.length; i++ ){
            this.canvas.clearRect(this.segments[i].x, this.segments[i].y, 24, 24);
        }

    }
}

var Sprite = function (url, spriteMapPos, size, speed, frames, dir, once) {
    this.url = url;
    this.spriteMapPos = spriteMapPos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this.dir = dir || 'horizontal';
    this.once = once;
    this._index = 0;
};

Sprite.prototype = {
    update: function(dt) {
        this._index += this.speed*dt;
    },

    render: function(ctx, runState) {
        var frame;

        if(this.speed > 0) {
            var max = this.frames.length;
            var idx = Math.floor(this._index);
            frame = this.frames[idx % max];

            if(this.once && idx >= max) {
                this.done = true;
                return;
            }
        }
        else {
            frame = 0;
        }


        var x = this.spriteMapPos.x;
        var y = this.spriteMapPos.y;
        if(runState) {
            // Animating Mario or Luigi so need a run state
            x += runState * this.size[0];
        } else {
            if(this.frames) {
                if(this.dir == 'vertical') {
                    y += frame * this.size[1];
                }
                else {
                    x += frame * this.size[0];
                }
            }
        }

        ctx.drawImage(resources.get(this.url), // IMAGE
                      x, y, // Image slice coords
                      this.size[0], this.size[1], //Image slice size
                      0, 0, //  Position on Canvas - Can be 0,0 becauseof the ctx.Translate method used beforehand
                      this.size[0], this.size[1]); // Size of image on canvas
    }
};
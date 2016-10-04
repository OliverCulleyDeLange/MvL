/*
 *  M_vs_L
 *  Two player 2D Mario influenced shooter
 *  Basic arrow key interaction (Up (Jump), Left, Right, Down (Drop))
 *  Control character on screen - Kill enemies and other player if 2 player
 *  Score points for kills, more points for killing opponent 
 *  Wider than screen maps (Bigger screens at advantage)
 *  Health Bar | Sheild Bar | Score board
 *  
 *  Phase 2: 
 *  Add Map with scrolling
 *  
 *  Phase 3:
 *  Second local player addition - Allows two players to play on one machine
 *  WASD & Shift & |\ & Z = Player 1
 *  Arrows & ,< & .> & /? = Player 2
 *  Bullet collision detection & death animation
 *  
 *  Phase 4:
 *  Addition of two player online - Node.js?
 *  
 *  TODO:
 *  Screen size scaling
 *  Do colision detection only in area around thing being checked.
 */


function main() {
    if(!running) return;
        
    var now = Date.now();
    dt = (now - lastTime) / 1000.0; // dt is number of seconds passed since last update
//      dt = 0.05; // Use for debugging when you don't want massive DTs because of breakpoints
    update();
    render();

    lastTime = now;
    requestAnimFrame(main);
    //console.log("Game Frame");
};

function update() {
    gameTime += dt;

    updatePlayer(players.me);
    if (onlinePlay) {
        players.me.emitPosition();
        players.me.emitBullets();
    }
    if (twoPlayer && players.opponent ) {
        updatePlayer(players.opponent)
    }
};

function updatePlayer(player) {
    player.setDefaultValues();
    player.handleInput();
    player.updateXVelocity();
    player.updateYVelocity();
    player.updatePosition();

    player.checkBounds();
    player.setWalkAnimation();

    if(player.shoot && Date.now() - player.lastFire > 250) {
        player.fireGun();
    }
    player.updateBullets();
};


function render() {
    ctx.fillStyle = terrainPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(!isGameOver) {
        renderEntity(players.me);
        renderEntities(players.me.bullets);

        if (twoPlayer && players.opponent) {
            renderEntity(players.opponent);
            renderEntities(players.opponent.bullets)
        }

        renderEntities(cubes);
    };
};

function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
    }
};

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos.x, entity.pos.y);
    entity.sprite.render(ctx, entity.runState);
    ctx.restore();
};


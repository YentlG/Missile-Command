let player = null;
let playerSpeed = 10;
let explosions = [];
let explosionLife = 100;
let shootTimer = 0;
let shotsPerSecond = 4;

function setup() {
    createCanvas(400, 400);

    player = createSprite(width / 2, height - 20, 20, 20);
    player.draw = DrawPlayer;
}


function draw() {
    background(0, 0, 0);

    MovePlayer();

    Shoot();
    RemoveDeadExplosions();

    drawSprites();
}

function RemoveDeadExplosions() {
    if (explosions.length > 0 && explosions[0].life == 0) {
        explosions.shift();
    }
}


function Shoot() {
    shootTimer += deltaTime;
    if (keyIsDown(32) && shootTimer >= 1000 / shotsPerSecond) {
        CreateExplosion(player.position.x, player.position.y);
        shootTimer = 0;
    }

    function CreateExplosion(x, y) {
        let explosion = createSprite(x, y, 5, 5);
        explosion.life = 100;
        explosion.draw = DrawExplosion;
        explosions.push(explosion);
    }

    function DrawExplosion() {
        circle(0, 0, this.width);
        this.width++;
        this.height++;
    }

    function DrawPlayer() {
        fill(0);
        stroke(255);
        strokeWeight(2);

        circle(0, 0, this.width);
    
        line(0, 5, 0, 20);
        line(0, -5, 0, -20);
        line(5, 0, 20, 0);
        line(-5, 0, -20, 0);
        /*
        line(0, 0, 0, 50);
        line(0, 50, -10, 70);
        line(0, 50, 10, 70);
    
        line(0, 25, -20, 10);
        line(0, 25, 20, 70);
    
        rect(25, 50, 30, 20);
        */
    }

    function MovePlayer() {}
        if (keyIsDown(DOWN_ARROW)) {
            player.position.y += 6;
        }
        if (keyIsDown(UP_ARROW)) {
            player.position.y -= 6;
        }
        if (keyIsDown(LEFT_ARROW)) {
            player.position.x -= 6;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            player.position.x += 6;
        }
    }
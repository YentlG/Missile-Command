let player = null;
let playerSpeed = 10;
let explosions = [];
let explosionLife = 100;
let shootTimer = 0;
let shotsPerSecond = 4;
let gun = null;

function setup() {
    createCanvas(800, 500);
    angleMode(DEGREES);

    player = createSprite(width / 2, height - 100, 20, 20);
    player.draw = DrawPlayer;

    gun = createSprite(width / 2, height - 40, 20, 20);
}

function draw() {
    background(0, 0, 0);

    MovePlayer();
    Shoot();
    RemoveDeadExplosions();

    drawSprites();
}

function CreateFriendlyMissiles() {
    let startPosition = gun.position.copy();
    let endPosition = player.position.copy();

    let direction = player.position.copy();
    direction.sub(start);

    let directionAngle = direction.heading();

    let missile = createSprite(start.x, start.y, 5, 5);
    missile.setSpeed(5, directionAngle);
    missile["goal"] = end;
    missile.draw = DrawFriendlyMissiles;
}

function DrawFriendlyMissiles() {
    circle(0, 0, this.width);

    let currentPosition = this.position;
    let goalPosition = this.goal;
    let distance = currentPosition.dist(goalPosition);

    if (distance < 5) {
        CreateExplosion(currentPosition.x, currentPosition.y);
        this.remove;
    }
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
        CreateFriendlyMissiles();
        shootTimer = 0;
    }
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
}

function MovePlayer() {
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

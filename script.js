let player = null;
let gun = null;
let enemyMissilesGroup = null;

let city1 = null;
let city2 = null

let points = 0;

// how fast the player can move
let playerSpeed = 10;
// how many milliseconds since the players' last shot
let shootTimer = 0;
// how many shots a player can fire per second
let shotsPerSecond = 4;
// how fast the players' missiles will fly
let missileSpeed = 5;


// how many milliseconds since the enemy's last shot
let enemyShootTimer = 0;
// how many shots the enemy can fire per second
let enemyShotsPerSecond = 1;
// how many shots the enemy can fire per second
let maxEnemyMissiles = 3;
// how fast the enemy's missiles will fly
let enemyMissileSpeed = 2;

// how many frames an explosion will last
let explosionLife = 100;


function setup() {
    angleMode(DEGREES);
    createCanvas(800, 500);

    player = createSprite(width / 2, height - 100, 20, 20);
    player.draw = DrawPlayer;

    gun = createSprite(width / 2, height - 50, 25, 25);

    enemyMissilesGroup = new Group();

    city1 = createSprite(0 + 100, height - 10, 100, 20);
    city1.draw = DrawCity;
    city1["lifepoints"] = 3;

    city2 = createSprite(width - 100, height - 10, 100, 20);
    city2.draw = DrawCity;
    city2["lifepoints"] = 3;
}

function draw() {
    background(0);

    MovePlayer();
    Shoot();

    EnemyShootsMissile();
    ShowLifePoints();
    ShowPlayerPoints();

    drawSprites();
}

function ShowPlayerPoints() {
    fill("white");
    textsize(44);
    text()
}

function ShowLifePoints() {
    let city1LifePoints = city1.lifepoints.toString();
    city1LifePoints += "/3";

    fill("white");
    textsize(24);
    text(city1LifePoints, 100, 480);

    let city2LifePoints = city1.lifepoints.toString();
    city2LifePoints += "/3";

    fill("white");
    textsize(24);
    text(city2LifePoints, 100, 480);
}

function ShowLifePointsCity(city) {
    ShowLifePointsOfCity(city1);
    ShowLifePointsOfCity(city2);
}

function DrawCity() {
    rect(0, 0, this.width, this.height);

    this.overlap(enemyMissilesGroup, CityIsHit);
}

function CityIshHit(city, enemyMissile) {
    city.lifepoints--;

    if (city.lifepoints <= 0) {
        city.remove();
    }

    enemyMissile.remove();
}


function EnemyShootsMissile() { 
    enemyShootTimer += deltaTime;
    if (enemyMissilesGroup.length < maxEnemyMissiles &&
        enemyShootTimer >= 1000 / enemyShotsPerSecond) {
        CreateEnemyMissile();
        enemyShootTimer = 0;
    }
}

function CreateFriendlyMissile() { 
    let startPosition = gun.position.copy();
    let endPosition = player.position.copy();
    let direction = p5.Vector.sub(endPosition, startPosition);

    let missile = createSprite(startPosition.x, startPosition.y, 5, 5);
    missile.setSpeed(missileSpeed, direction.heading());
    missile["goal"] = endPosition;

    missile.draw = DrawFriendlyMissile;
}

function DrawFriendlyMissile() { 
    circle(0, 0, this.width);

    let distance = p5.Vector.dist(this.position, this.goal);
    if (distance < 5) { 
        this.remove();
        CreateExplosion(this.goal.x, this.goal.y);
    }
}

function CreateEnemyMissile() { 
    let startX = random(0, width);
    let startPosition = createVector(startX, 0);
    let endX = random(0, width);
    let endPosition = createVector(endX, height);
    let direction = p5.Vector.sub(endPosition, startPosition);

    let missile = createSprite(startPosition.x, startPosition.y, 5, 5);
    missile.setSpeed(enemyMissileSpeed, direction.heading());
    missile["goal"] = endPosition;

    enemyMissilesGroup.add(missile);

    missile.draw = DrawEnemyMissile;
}

function DrawEnemyMissile() { 
    fill(255, 0, 0);
    circle(0, 0, this.width);

    let distance = p5.Vector.dist(this.position, this.goal);
    if (distance < 5) { 
        this.remove();
        CreateExplosion(this.goal.x, this.goal.y);
    }
}

function Shoot() {
    shootTimer += deltaTime;
    if (keyIsDown(32) && shootTimer >= 1000 / shotsPerSecond) {
        CreateFriendlyMissile();
        shootTimer = 0;
    }
}

function CreateExplosion(x, y) {
    let explosion = createSprite(x, y, 1, 1);
    explosion.life = explosionLife;
    explosion.draw = DrawExplosion;
}

function DrawExplosion() {
    circle(0, 0, this.width);
    this.width++;
    this.height++;

    this.overlap(enemyMissilesGroup, EnemyMissileIsHit);
}

function EnemyMissileIsHit(explosion, enemyMissile) { 
    enemyMissile.remove();
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
        player.position.y += playerSpeed;
    }
    if (keyIsDown(UP_ARROW)) {
        player.position.y -= playerSpeed;
    }

    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= playerSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += playerSpeed;
    }
}
let player = null;
let playerSpeed = 5;

function setup() {
    createCanvas(800, 500);

    player = createSprite(width / 2, height - 20, 20, 20);
    player.draw = TekenSpeler;
    
}

function draw() {
    background(0, 0, 0);

    BeweegSpeler();

    drawSprites();
}

function TekenSpeler() {
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

function BeweegSpeler() {
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

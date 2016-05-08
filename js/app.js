// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = (Math.floor(Math.random() * 3) * 83) + 60;
    this.width = 60;
    this.speed = Math.floor(Math.random() * 700);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x = (this.x + (this.speed * dt));
    } else {
        this.x = 0;
        this.y = (Math.floor(Math.random() * 3) * 83) + 60;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create a player class
var Player = function() {
    this.hero = 'images/char-pink-girl.png';
    this.x = 200;
    this.y = 405;
    this.width = 40;
};

// Put the player back in the starting position
Player.prototype.reset = function(dt) {
    this.x = 200;
    this.y = 405;
    alert("Congrats! You won!");
};

// Draw the player on the game board
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.hero), this.x, this.y);
};

// Reset player after a delay of 1 second
Player.prototype.delayStart = function() {
    window.setTimeout(this.reset.bind(this), 500);
};

// Translate key presses to the player's movement on the game board
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 100;
    }
    else if (key === 'right' && this.x < 400) {
        this.x += 100;
    }
    else if (key === 'down' && this.y < 405) {
        this.y += 83;
    }
    else if (key === 'up' && this.y >= 42) {
        this.y -= 83;
    }
    if (this.y < 42) {
        this.delayStart();
    }
};

//Check whether the player has collided with any enemies. Move the player to the bottom of the game board if a collision has occured. 
Player.prototype.checkCollisions = function() {
    var height = 60;
    for (var i=0; i<3; i++) {
        if (this.x < allEnemies[i].x + allEnemies[i].width &&
            this.x + this.width > allEnemies[i].x &&
            this.y < allEnemies[i].y + height &&
            this.y + height > allEnemies[i].y) {
            this.y = 405;
        }
    }
    ctx.drawImage(Resources.get(this.hero), this.x, this.y);
}

// Object instantiation

// Place the player object in a variable called player
var player = new Player;

// Create an array to store the enemy objects
var allEnemies = [];

// Generate enemy objects so that there are three enemies on screen at a time
function generateEnemies(){
    for (i=0; i<3; i++) {
        if (typeof allEnemies[i] === 'undefined' || allEnemies[i].x > 500) {
            allEnemies[i] = new Enemy;
        }
    }
};

generateEnemies();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

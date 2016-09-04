// Set some constants to keep track of our game board, so that
// if I wish to change things later, I only have to change these values
// in one place.
// Well, technically I have to change them in two places, since these constants
// are also used in engine.js. But I could change engine.js to use these as well.
var NUM_COLS = 5;
var NUM_ROWS = 6;
var PIXELS_PER_COL = 101;
var PIXELS_PER_ROW = 83;
var MAX_X = 505;
var MAX_Y = 606;

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
// This random number generator code taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
    // Starting position - starting position of enemy on the 5 X 6 game Grid
    // Enemies always start off canvas and move from left to right across grid.
    // Valid starting cols are an integer between -5 to -1 inclusive (randomly selected to stagger the starts)
    // Valid "road" rows are rows 1 to 3 (randomly selected)
    this.col = getRandomIntInclusive(-5, -1);
    this.row = getRandomIntInclusive(1, 3);
    // location in canvas x and y coordinates
    this.vertAdjust = 20;
    this.x = this.col * PIXELS_PER_COL;
    this.y = this.row * PIXELS_PER_ROW - this.vertAdjust;
    // speed - determines speed (in delta pixels) of enemy across the screen
    // Range is a random integer between 100 and 500 inclusive
    this.speed = getRandomIntInclusive(100, 500);
    // slow motion toggle - reduces speed while gem is activated
    this.slowMotion = false;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// checkCollision method to check for collision with player
// Define a collision if x and y positional coordinates of the enemy and
// the player are within a specified tolerance of each other
Enemy.prototype.checkCollision = function() {
    // tolerance set at half of a grid unit (by experimentation)
    var toleranceX = PIXELS_PER_COL / 2;
    var toleranceY = PIXELS_PER_ROW / 2;
    if ((Math.abs(this.x - player.x) <= toleranceX) && (Math.abs(this.y - player.y) <= toleranceY)) {
        // flag collision
        player.collision();
    }
};

// Reset method - Recomputes an enemy starting position and speed.
// Called to reset an enemy that has gone off the right side of the grid
Enemy.prototype.reset = function() {
    this.col = getRandomIntInclusive(-5, -1);
    this.row = getRandomIntInclusive(1, 3);
    this.x = this.col * PIXELS_PER_COL;
    this.y = this.row * PIXELS_PER_ROW - this.vertAdjust;
    this.speed = getRandomIntInclusive(100, 500);
    if (this.slowMotion === true) {
        this.speed = this.speed / 2;
    }
};

// Reduce speed method
// Activated when Player lands on a gem, this method reduces the Enemy's speed
Enemy.prototype.reduceSpeed = function() {
    this.slowMotion = true;
    this.speed = this.speed / 2;
};

// Restore speed method
// When gem is deactivated, this method restores Enemy's speed to previous value
Enemy.prototype.restoreSpeed = function() {
    this.slowMotion = false;
    this.speed = this.speed * 2;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // check for collision with player
    this.checkCollision();
    // if enemy has gone off the right side of the canvas,
    // reset row and col to wrap around
    if (this.x > MAX_X) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Grid Position - Position of player on the 5 X 6 game grid
    // Note: Reset position is Col = 2, Row = 5
    this.col = 2;
    this.row = 5;
    // location in canvas x and y coordinates
    this.vertAdjust = 10;
    this.x = this.col * PIXELS_PER_COL;
    this.y = this.row * PIXELS_PER_ROW - this.vertAdjust;
    // State - holds state type
    var allowedStates = ['Reset', 'Ready', 'Won'];
    this.state = 'Ready';
    // The image/sprite for our player
    this.sprite = 'images/char-horn-girl.png';
    // score
    this.score = 0;
};

// Flag collision method
Player.prototype.collision = function() {
    // set flag to reset
    this.state = 'Reset';
    // lose score points
    if (this.score <= 10) {
        this.score = 0;
    } else {
        this.score -= 10;
    }
};

// Reset method - resets the player back to the start state
Player.prototype.reset = function() {
    // reset grid position to col = 2, row = 5
    this.col = 2;
    this.row = 5;
    // reset state
    this.state = 'Ready';
};

// Processes input keystrokes to determine player's new position in the game grid
// Note: if you attempt to move player off grid, input is ignored
Player.prototype.handleInput = function(input) {
    switch (input) {
        case 'left':
            // attempt to move 1 col to the left
            if (this.col !== 0) {
                this.col -= 1;
            }
            break;
        case 'right':
            // attempt to move 1 col to the right
            if (this.col !== (NUM_COLS - 1)) {
                this.col += 1;
            }
            break;
        case 'up':
            // attempt to move 1 row up
            if (this.row !== 0) {
                this.row -= 1;
            }
            break;
        case 'down':
            // attempt to move 1 row down
            if (this.row !== (NUM_ROWS - 1)) {
                this.row += 1;
            }
            break;
        default:
            // invalid input, do nothing
    }
};

// Update player's position and state. This is determined by keystroke
// input. Note that the player jumps from square to square on
// the grid. A collision occurs if the square is occupied by an enemy.
Player.prototype.update = function() {
    // if collision detected or game won, then reset col and row
    if ((this.state === 'Reset') || (this.state === 'Won')) {
        this.reset();
    }
    // Compute player's new position based on col and row
    this.x = this.col * PIXELS_PER_COL;
    this.y = this.row * PIXELS_PER_ROW - this.vertAdjust;
    // if we reach the water (row = 0), then we have WON
    if (this.row === 0) {
        this.state = 'Won';
        // increment score
        this.score += 100;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Display player score on the screen
Player.prototype.displayScore = function() {
    // display the star symbol
    var starX = (NUM_COLS - 1) * PIXELS_PER_COL;
    var starY = 0;
    ctx.drawImage(Resources.get('images/Star.png'), starX ,starY);
    // display the score centered on the star
    var textX = starX + (PIXELS_PER_COL / 2);
    var textY = starY + (PIXELS_PER_ROW *1.32);
    ctx.font = '18pt Impact';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(this.score, textX, textY);
    ctx.strokeStyle = 'black';
    ctx.strokeText(this.score, textX, textY);
};

// Gem class
var Gem = function() {
    // Grid position - Gems only appear on the road
    // Columns are randomly selected
    // Valid "road" row are rows 1 to 3 inclusive (randomly selected)
    this.col = getRandomIntInclusive(0, NUM_COLS - 1);
    this.row = getRandomIntInclusive(1, 3);
    // location in canvas x and y coordinates
    this.vertAdjust = 30;
    this.x = this.col * PIXELS_PER_COL;
    this.y = this.row * PIXELS_PER_ROW - this.vertAdjust;
    // State variables that control gem visibility
    this.activated = false;
    this.visible = true;
    this.timer = 150;
    // image
    this.sprite = 'images/Gem Orange.png';
};

// Gem move method
// Computes a new gem location on the game grid and its corresponding (x, y) canvas coordinates
Gem.prototype.move = function() {
    // Randomly select new col & row
    this.col = getRandomIntInclusive(0, NUM_COLS - 1);
    this.row = getRandomIntInclusive(1, 3);
    // location in canvas x and y coordinates
    this.x = this.col * PIXELS_PER_COL;
    this.y = this.row * PIXELS_PER_ROW - this.vertAdjust;
};

// Gem method to check for player contact
// If touched, it activates and deactivates gem power-ups
Gem.prototype.checkTouch = function() {
      if ((this.visible === true) && (this.activated === false) && (this.row === player.row) && (this.col === player.col)) {
          this.activate();
      } else if ((this.activated === true) && (this.timer === 0)) {
          this.deactivate();
      }
};

// Gem activate method
// If the Player touches the gem, it should change color
// For the next 200 cycles, the gem remains on screen and all Enemies move in slow motion
Gem.prototype.activate = function() {
    // activate the gem
    this.activated = true;
    // change gem color
    this.sprite = 'images/Gem Blue.png';
    // reset timer
    this.timer = 200;
    // activate Enemy slow motion
    allEnemies.forEach(function(enemy) {
        enemy.reduceSpeed();
    });
};

// Gem deactivate method
Gem.prototype.deactivate = function() {
    // deactivate the gem
    this.activated = false;
    // change gem color back
    this.sprite = 'images/Gem Orange.png';
    // deactivate Enemy slow motion
    allEnemies.forEach(function(enemy) {
        enemy.restoreSpeed();
    });
};

// Gem update method
Gem.prototype.update = function() {
    // check if player has landed on the gem and process gem activation
    this.checkTouch();
    // monitor timer and update status
    if (this.timer === 0) {
        // toggle visibility
        this.visible = !this.visible;
        // if now visible, move gem to new location
        if (this.visible === true) {
            this.move();
        }
        // reset timer
        this.timer = getRandomIntInclusive(100, 200);
    } else {
        // decrement countdown timer
        this.timer -= 1;
    }
};

// Draw the gem on the screen
Gem.prototype.render = function() {
    if (this.visible === true) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// generate new enemies and add to enemy array
function loadEnemies(numEnemies) {
    for (var i = 0; i < numEnemies; i++) {
        // Create an enemy bug
        var enemy = new Enemy();
        // Add new enemy to array
        allEnemies.push(enemy);
    }
}
loadEnemies(5);

// Place the player object in a variable called player
var player = new Player();

// instantiate a gem object
var gem = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

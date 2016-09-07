# Frontend Nanodegree Arcade Game

This project is an implementation of a Frogger-style arcade game designed to run in a web browser.

## Project Motivation

This arcade game was created as part of the Udacity Front-End Web Developer nanodegree. To implement this project, I employed object-oriented JavaScript to create the Player and Enemy class objects and to code all the methods needed to implement their behavior. A game engine and art assets were provided as part of the start-up package.

In addition to coding the basic game functionality, I added a couple of enhancements:

* A score feature - Points are awarded whenever the Player successfully reaches the water. Points are also deducted whenever the Player collides with an Enemy.
* A _Gem Power-Up_ feature - Whenever the Player lands on a Gem, the Gem object changes color and all Enemy objects run at half speed for a short period of time thereafter.

These enhancements were also implemented using JavaScript object-oriented programming techniques.

For more detailed instructions on this project, check out this Udacity course [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

## How to Load the Game

1. A ready-to-run version of this game can be found on my arcade project web page. Click [here](https://chspanos.github.io/arcade-game) to play the game.

If you want to download your own version of the game, follow these directions:

1. Clone this repository or download the code using the GitHub buttons on the repository menu. You will need the following files to run the game:

  * ```index.html``` - the main HTML file
  * ```css/style.css``` - the style file
  * ```js/app.js``` - player & enemy objects and methods
  * ```js/engine.js``` - the game animation engine
  * ```js/resources.js``` - the image loader and cache
  * ```images/*.png``` - the image files

2. Open your favorite web browser

3. Open the ```index.html``` file in your browser window. The game board should appear, ready for play.

## How to Play

In this game, you have a Player and Enemies (bugs). The **goal** of the Player is to reach the water without colliding with any of the Enemies.

* The Player can move horizontally and vertically on the game grid. You control its movements using the up, down, left, and right arrow keys on your keyboard.
* The Enemies move at varying speeds along the _road_ lanes from the left side of the game board to the right.
* If the Player collides with an Enemy, the Player moves back to the _start_ square and is penalized 10 points.
* Every time the Player reaches the water, you score an additional 100 points.  The Player will then move back to the _start_ square for further play.
* Your score is displayed in the upper right hand corner of the screen. (Note: The score will never drop below 0, no matter how many collisions the Player has.)
* ORANGE _Power Up_ gems will appear randomly on the _road_ lanes. The Player can activate the gem by stepping on it. Once activated, the gem will turn BLUE and all Enemies will move at reduced speed, until the gem disappears.
* You can restart the game at any time by refreshing your browser window.

#### Resources

This project was created as part of the Udacity Front-end Web Developer Nanodegree program. You can find the template repository [here](https://github.com/udacity/frontend-nanodegree-arcade-game).

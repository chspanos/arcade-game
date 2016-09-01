# Frontend Nanodegree Arcade Game

This project is an implementation of a Frogger-style arcade game designed to run in a web browser.

## How to Load the Game

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
* If the Player collides with an Enemy, the game is reset and the Player moves back to the _start_ square.
* If the Player reaches the water, you **win** the game. The game will then reset for further play.

#### Resources

This project was created as part of the Udacity Front-end Developer Nanodegree program. You can find the template repository [here](https://github.com/udacity/frontend-nanodegree-arcade-game).

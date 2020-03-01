class Pacman {
  constructor(x, y, team) {
    const blue = new Image();
    blue.src = "./Assets/pacman32.png";

    this.x = x;
    this.y = y;
    this.image = blue;
    this.team = team;
    if (team === "red") {
      const blue = new Image();
      blue.src = "./Assets/pacmanred.png";
      this.image = blue;
    } else {
      const blue = new Image();
      blue.src = "./Assets/pacmanblue.png";
      this.image = blue;
    }

    this.isGhost = false;
    this.toEat = [];
    this.stack = [];
    this.traverse = [];
    this.patrol = [23, 3];
    this.patrolr = [12, 4];
  }
  moveUp() {
    this.y--;
  }
  moveDown() {
    this.y++;
  }
  moveRight() {
    this.x++;
  }
  moveLeft() {
    this.x--;
  }

  setGhost() {
    this.isGhost = true;
    if (this.team === "red") {
      const blue = new Image();
      blue.src = "./Assets/ghostred.png";
      this.image = blue;
    } else {
      const blue = new Image();
      blue.src = "./Assets/ghostblue.png";
      this.image = blue;
    }
  }
  setPacman() {
    this.isGhost = false;
    if (this.team === "red") {
      const blue = new Image();
      blue.src = "./Assets/pacmanred.png";
      this.image = blue;
    } else {
      const blue = new Image();
      blue.src = "./Assets/pacmanblue.png";
      this.image = blue;
    }
  }

  shuffle() {
    this.toEat = shuffleArray(this.toEat);
  }
}

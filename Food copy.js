class Food {
  constructor(x, y, team) {
    this.x = x;
    this.y = y;
    this.eaten = false;
    this.team = team;
    if (team === "red") {
      const blue = new Image();
      blue.src = "./Assets/foodred.png";
      this.image = blue;
    } else {
      const blue = new Image();
      blue.src = "./Assets/foodblue.png";
      this.image = blue;
    }
  }

  eat() {
    this.eaten = true;
  }
}

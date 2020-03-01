var c = document.getElementById("game");
var ctx = c.getContext("2d");
var WIDTH = 20;
var HEIGHT = 20;
var MARGIN = 10;

////////////////////////////////////////////////////////////////////////////////
const blue = new Image();
blue.src = "./Assets/bluesquare.png";

const red = new Image();
red.src = "./Assets/redsquare.png";

const food = new Image();
food.src = "./Assets/gold32.png";

const dot = new Image();
dot.src = "./Assets/dot.png";

var FPS = 10;
var ingame = true;
var count = 0;
/////////////////////////////  GAME CONFIRGATION  /////////////////////////////////////
var redcounter = 0;
var bluecounter = 0;

var redfood = [];
var bluefood = [];
var redpac = [];
var bluepac = [];

var redEat = [];
var blueEat = [];

timer = 0;

redpac.push(new Pacman(1, 7, "red"));

bluepac.push(new Pacman(30, 5, "blue"));

console.log([maze.length, maze[0].length]);
///////////////////////////////////////////////
// bluefood.push(new Food(25, 10, "blue"));
// bluefood.push(new Food(26, 10, "blue"));
// redfood.push(new Food(4, 4, "red"));

foo.map(function(f) {
  if (f[0] > 17) {
    bluefood.push(new Food(f[0], f[1], "blue"));
    var str = f[0] + "," + f[1];
    qvalueRed.str = 0;
  } else {
    redfood.push(new Food(f[0], f[1], "red"));
  }
});

qlearningInit();

////////////////////////////////////////////////////////////////////////////////////////

var pp = [];

setTimeout(() => {
  var gg = setInterval(function() {
    if (ingame) draw();
  }, 1000 / FPS);
}, 1000);

window.addEventListener("keydown", check, false);

function check(e) {
  if (e.keyCode === 38) {
    pacUp(redpac[0]);
  } else if (e.keyCode === 37) {
    pacLeft(redpac[0]);
  } else if (e.keyCode === 39) {
    pacRight(redpac[0]);
  } else if (e.keyCode === 40) {
    pacDown(redpac[0]);
  } else if (e.keyCode === 87) {
    pacUp(bluepac[0]);
  } else if (e.keyCode === 65) {
    pacLeft(bluepac[0]);
  } else if (e.keyCode === 68) {
    pacRight(bluepac[0]);
  } else if (e.keyCode === 83) {
    pacDown(bluepac[0]);
  }

  console.log(redpac[0].x, redpac[0].y);
}

for (var i = 0; i < maze.length; i++) {
  // qred.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  kfred.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
}
// for (var i = 0; i < maze.length; i++) {
//   for (var j = 0; j < maze.length; j++) {
//     qred[i][j] = 0;
//   }
// }

function draw() {
  ctx.clearRect(0, 0, 1200, 1000);

  for (var i = 0; i < maze.length; i++) {
    for (var j = 0; j < maze[i].length; j++) {
      if (maze[i][j] == 1) {
        if (i > 17)
          ctx.drawImage(
            blue,
            (MARGIN + WIDTH) * i + MARGIN,
            (MARGIN + WIDTH) * j + MARGIN
          );
        else
          ctx.drawImage(
            red,
            (MARGIN + WIDTH) * i + MARGIN,
            (MARGIN + WIDTH) * j + MARGIN
          );
      }
    }
  }

  pre();
  // if (redpac[0].x > 17) {
  //   followQ(redpac[0]);
  // } else AggressiveAvoidQ();

  AggressiveRedBack();
  DefensiveBluePatrol();
  if (redpac.length < 1) ingame = false;
  if (bluepac.length < 1) ingame = false;
  gameRunner();
  drawFood();
  drawPac();
  showScore();
  timer++;
  if (timer > 3000) {
    ingame = false;
  }
  if (count === 0) {
    redpac[0].shuffle();
  }

  count++;
}

function drawFood() {
  redfood.map(function(p) {
    ctx.drawImage(
      p.image,
      (MARGIN + WIDTH) * p.x + MARGIN,
      (MARGIN + WIDTH) * p.y + MARGIN
    );
  });
  bluefood.map(function(p) {
    ctx.drawImage(
      p.image,
      (MARGIN + WIDTH) * p.x + MARGIN,
      (MARGIN + WIDTH) * p.y + MARGIN
    );
  });
}

function drawPac() {
  redpac.map(function(p) {
    ctx.drawImage(
      p.image,
      (MARGIN + WIDTH) * p.x + MARGIN,
      (MARGIN + WIDTH) * p.y + MARGIN
    );
  });
  bluepac.map(function(p) {
    ctx.drawImage(
      p.image,
      (MARGIN + WIDTH) * p.x + MARGIN,
      (MARGIN + WIDTH) * p.y + MARGIN
    );
  });
}

function pacUp(p) {
  var x = p.x;
  var y = p.y;
  y--;
  if (maze[x][y] != 1) {
    var reward = checkenemy(p, p.x);
    Q(x, y, p.x, p.y, reward);

    p.moveUp();
  } else TrainerPacman(p);
}
function pacDown(p) {
  var x = p.x;
  var y = p.y;
  y++;
  if (maze[x][y] != 1) {
    var reward = checkenemy(p, p.x);
    Q(x, y, p.x, p.y, reward);
    p.moveDown();
  } else TrainerPacman(p);
}

function pacRight(p) {
  var x = p.x;
  var y = p.y;
  x++;
  if (maze[x][y] != 1) {
    var reward = checkenemy(p, p.x);
    Q(x, y, p.x, p.y, reward);
    p.moveRight();
  } else TrainerPacman(p);
}

function pacLeft(p) {
  var x = p.x;
  var y = p.y;
  x--;
  if (maze[x][y] != 1) {
    var reward = checkenemy(p, p.x);
    Q(x, y, p.x, p.y, reward);
    p.moveLeft();
  } else TrainerPacman(p);
}

function gameRunner() {
  var k = true;

  redpac.map(function(p) {
    if (p.x > 17) {
      p.setPacman();
    } else {
      p.setGhost();
    }

    bluefood.map(function(f) {
      if (p.x === f.x && p.y === f.y) {
        bluefood = removefood(bluefood, f);
        qlearning(f.x, f.y, 5);
        try {
          qlearningRED(
            redpac[0].traverse[redpac[0].traverse.length - 2][0] -
              redpac[0].traverse[redpac[0].traverse.length - 2][0],
            redpac[0].traverse[redpac[0].traverse.length - 2][1] -
              redpac[0].traverse[redpac[0].traverse.length - 2][1],
            redpac[0].traverse[redpac[0].traverse.length - 2][0],
            redpac[0].traverse[redpac[0].traverse.length - 2][1],
            10
          );
        } catch (e) {}
        k = false;

        redcounter++;
        bluecounter--;
      }
    });

    bluepac.map(function(f) {
      if (p.x === f.x && p.y === f.y) {
        if (p.isGhost === true) {
          bluepac = remove(bluepac, f);
          bluepac.push(new Pacman(34, 12, "blue"));
          kred.push([f.x, f.y]);
        } else {
          qlearning(f.x, f.y, -5);
          try {
            qlearningRED(
              redpac[0].traverse[redpac[0].traverse.length - 2][0] -
                redpac[0].traverse[redpac[0].traverse.length - 2][0],
              redpac[0].traverse[redpac[0].traverse.length - 2][1] -
                redpac[0].traverse[redpac[0].traverse.length - 2][1],
              redpac[0].traverse[redpac[0].traverse.length - 2][0],
              redpac[0].traverse[redpac[0].traverse.length - 2][1],
              -10
            );
          } catch (e) {}
          k = false;
          kfred[p.toEat[0].f.x][p.toEat[0].f.y] =
            kfred[p.toEat[0].f.x][p.toEat[0].f.y] + 1;
          redpac = remove(redpac, p);
          redpac.push(new Pacman(1, 12, "red"));
          kblue.push([p.x, p.y]);
          count = 0;
        }
      }
    });
  });

  bluepac.map(function(p) {
    if (p.x > 17) {
      p.setGhost();
    } else {
      p.setPacman();
    }

    redfood.map(function(f) {
      if (p.x === f.x && p.y === f.y) {
        redfood = removefood(redfood, f);
        bluecounter++;
        redcounter--;
      }
    });

    redpac.map(function(f) {
      if (p.x === f.x && p.y === f.y) {
        if (p.isGhost === true) {
          qlearning(f.x, f.y, -5);
          try {
            qlearningRED(
              redpac[0].traverse[redpac[0].traverse.length - 2][0] -
                redpac[0].traverse[redpac[0].traverse.length - 2][0],
              redpac[0].traverse[redpac[0].traverse.length - 2][1] -
                redpac[0].traverse[redpac[0].traverse.length - 2][1],
              redpac[0].traverse[redpac[0].traverse.length - 2][0],
              redpac[0].traverse[redpac[0].traverse.length - 2][1],
              -10
            );
          } catch (e) {}
          k = false;
          kfred[f.toEat[0].f.x][f.toEat[0].f.y] =
            kfred[f.toEat[0].f.x][f.toEat[0].f.y] + 1;
          redpac = remove(redpac, f);
          redpac.push(new Pacman(1, 12, "red"));
          kred.push([f.x, f.y]);
          count = 0;
          qlearning(f);
        } else {
          bluepac = remove(bluepac, p);
          bluepac.push(new Pacman(34, 12, "blue"));
          kblue.push([p.x, p.y]);
        }
      }
    });
  });

  if (k && redpac[0].x > 17) {
    qlearning(redpac[0].toEat[0].f.x, redpac[0].toEat[0].f.y, 1);

    try {
      var tempx = redpac[0].x - redpac[0].stack[0].x;

      qlearningRED(
        redpac[0].traverse[redpac[0].traverse.length - 2][0] -
          redpac[0].traverse[redpac[0].traverse.length - 1][0],
        redpac[0].traverse[redpac[0].traverse.length - 2][1] -
          redpac[0].traverse[redpac[0].traverse.length - 1][1],
        redpac[0].traverse[redpac[0].traverse.length - 2][0],
        redpac[0].traverse[redpac[0].traverse.length - 2][1],
        0.01 * redpac[0].traverse[redpac[0].traverse.length - 1][0]
      );
    } catch (e) {
      console.log(e);
    }
  }
}

function removefood(arry, pos) {
  var li = [];
  arry.map(function(a) {
    if (a != pos) {
      li.push(a);
    }
  });
  return li;
}

function showScore() {
  var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
  ctx.font = "30px Verdana";

  gradient.addColorStop("0", " magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  // Fill with gradient
  ctx.fillStyle = gradient;
  ctx.fillText(
    "Red " + redcounter,
    (MARGIN + WIDTH) * 13 + MARGIN,
    (MARGIN + WIDTH) * 16 + MARGIN
  );
  ctx.fillText(
    "Blue " + bluecounter,
    (MARGIN + WIDTH) * 19 + MARGIN,
    (MARGIN + WIDTH) * 16 + MARGIN
  );
}

function move(p) {
  if (p.stack.length > 0) {
    p.x = p.stack[0].x;
    p.y = p.stack[0].y;
    p.traverse.push([p.x, p.y]);
    p.stack = removeFirst(p.stack);

    // if (p.traverse.length > 10)
    //   if (
    //     p.traverse[p.traverse.length - 1][0] ===
    //       p.traverse[p.traverse.length - 3][0] &&
    //     p.traverse[p.traverse.length - 1][1] ===
    //       p.traverse[p.traverse.length - 3][1]
    //   ) {
    //     p.shuffle();
    //     switch (getRndInteger(0, 4)) {
    //       case 0:
    //         pacUp(p);
    //         break;
    //       case 1:
    //         pacDown(p);
    //         break;
    //       case 2:
    //         pacLeft(p);
    //         break;
    //       case 3:
    //         pacRight(p);
    //         break;
    //     }
    //   }

    // if (
    //   p.traverse[p.traverse.length - 3][0] ===
    //     p.traverse[p.traverse.length - 1][0] &&
    //   p.traverse[p.traverse.length - 3][1] ===
    //     p.traverse[p.traverse.length - 1][1]
    //shuffle();
    // if (p.team === "red")
    // window.localStorage.setItem("trav", JSON.stringify(p.traverse));
  }
}

function AggressiveBlue() {
  bluepac.map(function(p) {
    lis = p.toEat;
    if (lis.length > 0) {
      var temp = lis[0];
      var graph = new Graph(maze);
      var start = graph.nodes[p.x][p.y];
      var end = graph.nodes[temp.f.x][temp.f.y];
      p.stack = astar.search(graph.nodes, start, end);
    }
    move(p);
  });
}

function AggressiveRed() {
  redpac.map(function(p) {
    lis = p.toEat;
    if (lis.length > 0) {
      var temp = lis[0];
      var graph = new Graph(maze);
      var start = graph.nodes[p.x][p.y];
      var end = graph.nodes[temp.f.x][temp.f.y];
      p.stack = astar.search(graph.nodes, start, end);
    }
    move(p);
  });
}

function AggressiveRedBack() {
  redpac.map(function(p) {
    lis = p.toEat;
    if (lis.length > 0) {
      if (p.nearEnemy[0].dist < 6) {
        lis = p.nearEnemy;
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[16][p.y];
        p.stack = astar.search(graph.nodes, start, end);
      } else {
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.f.x][temp.f.y];
        p.stack = astar.search(graph.nodes, start, end);
      }
    }
    move(p);
  });
}
function AggressiveBlueBack() {
  bluepac.map(function(p) {
    lis = p.toEat;
    if (lis.length > 0) {
      if (p.nearEnemy[0].dist < 6) {
        lis = p.nearEnemy;
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[16][p.y];
        p.stack = astar.search(graph.nodes, start, end);
      } else {
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.f.x][temp.f.y];
        p.stack = astar.search(graph.nodes, start, end);
      }
    }
    move(p);
  });
}

function DefensiveRed() {
  redpac.map(function(p) {
    lis = p.toDefend;
    if (lis.length > 0) {
      if (p.nearEnemy[0].dist < 6) {
        lis = p.nearEnemy;
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.p.x][temp.p.y];
        p.stack = astar.search(graph.nodes, start, end);
      } else {
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.f.x][temp.f.y];
        p.stack = astar.search(graph.nodes, start, end);
      }
    }
    move(p);
  });
}

function AggressiveAvoid() {
  redpac.map(function(p) {
    lis = p.toEat;
    if (lis.length > 0) {
      if (p.nearEnemy[0].dist < 6 && p.x > 17) {
        var temp = p.nearEnemy[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        try {
          var tem = getOppositePoint(maze, p.x, p.y, temp.p.x, temp.p.y, 3);
          var end = graph.nodes[tem.x][tem.y];
          p.stack = astar.search(graph.nodes, start, end);
        } catch (e) {
          var tem = getOppositePoint(maze, p.x, p.y, temp.p.x, temp.p.y, 2);
          var end = graph.nodes[tem.x][tem.y];
          p.stack = astar.search(graph.nodes, start, end);
        }
      } else if (p.nearEnemy[0].dist < 6 && p.x < 17) {
        lis = p.nearEnemy;
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.p.x][temp.p.y];
        p.stack = astar.search(graph.nodes, start, end);
      } else {
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.f.x][temp.f.y];
        p.stack = astar.search(graph.nodes, start, end);
        // }
      }
    }

    move(p);
  });
}

function AggressiveAvoidQ() {
  redpac.map(function(p) {
    lis = p.toEat;
    lis = shuffleArray(p.toEat);

    if (lis.length > 0) {
      if (p.nearEnemy[0].dist < 6 && p.x > 17) {
        var temp = p.nearEnemy[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        try {
          var tem = getOppositePoint(maze, p.x, p.y, temp.p.x, temp.p.y, 3);
          var end = graph.nodes[tem.x][tem.y];
          p.stack = astar.search(graph.nodes, start, end);
        } catch (e) {
          var tem = getOppositePoint(maze, p.x, p.y, temp.p.x, temp.p.y, 2);
          var end = graph.nodes[tem.x][tem.y];
          p.stack = astar.search(graph.nodes, start, end);
        }
      } else if (p.nearEnemy[0].dist < 6 && p.x < 17) {
        lis = p.nearEnemy;
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.p.x][temp.p.y];
        p.stack = astar.search(graph.nodes, start, end);
      } else if (p.x > 26) {
        lis = p.toEat.sort(function(x, y) {
          return x.dist - y.dist;
        });

        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.f.x][temp.f.y];
        p.stack = astar.search(graph.nodes, start, end);
      } else {
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.f.x][temp.f.y];
        p.stack = astar.search(graph.nodes, start, end);
        // }
      }
    }

    move(p);
  });
}

function DefensiveBlue() {
  try {
    bluepac.map(function(p) {
      lis = p.toDefend;
      if (lis.length > 0) {
        if (p.nearEnemy[0].dist < 6) {
          lis = p.nearEnemy;
          var temp = lis[0];
          var graph = new Graph(maze);
          var start = graph.nodes[p.x][p.y];
          var end = graph.nodes[temp.p.x][temp.p.y];
          p.stack = astar.search(graph.nodes, start, end);
        } else {
          var temp = lis[0];
          var graph = new Graph(maze);
          var start = graph.nodes[p.x][p.y];
          var end = graph.nodes[temp.f.x][temp.f.y];
          p.stack = astar.search(graph.nodes, start, end);
        }
      }
      move(p);
    });
  } catch (e) {
    console.log(e);
  }
}
// function defendRed() {
//   redfood.map(function(r) {
//     var list = [];
//     bluepac.map(function(p) {
//       list.push(p.toEat[0]);
//     });
//     list.sort(function(a, b) {
//       return a.dist - b.dist;
//     });
//     r.toDefend = list[0];
//     console.log(r);
//   });
// }

function redToEat(p) {
  var lis = [];
  bluefood.map(function(f) {
    lis.push({ f: f, dist: getDistance(p.x, p.y, f.x, f.y) });
  });

  p.toEat = lis;
  p.toEat = shuffleArray(p.toEat);

  // p.toEat = p.toEat.sort(function(a, b) {
  //   return qred[b.f.x][b.f.y] - qred[a.f.x][a.f.y];
  // });

  //   var temp = lis[0];
  //   var graph = new Graph(maze);
  //   var start = graph.nodes[p.x][p.y];
  //   var end = graph.nodes[temp.f.x][temp.f.y];
  //   p.stack = astar.search(graph.nodes, start, end);
  //   console.log(p);
  // }
}
function blueToEat(p) {
  var lis = [];
  redfood.map(function(f) {
    lis.push({ f: f, dist: getDistance(p.x, p.y, f.x, f.y) });
  });
  // lis.sort(function(a, b) {
  //   return a.dist - b.dist;
  // });

  p.toEat = lis;
  // if (lis.length > 0) {
  //   var temp = lis[0];
  //   var graph = new Graph(maze);
  //   var start = graph.nodes[p.x][p.y];
  //   var end = graph.nodes[temp.f.x][temp.f.y];
  //   p.stack = astar.search(graph.nodes, start, end);
  //   console.log(p);
  // }
}

function redtoDefend(p) {
  var list = [];
  bluepac.map(function(b) {
    list.push(b.toEat[0]);
  });
  list.sort(function(a, b) {
    return a.dist - b.dist;
  });

  p.toDefend = list;
}

function bluetoDefend(p) {
  var list = [];
  redpac.map(function(b) {
    list.push(b.toEat[0]);
  });
  list.sort(function(a, b) {
    return a.dist - b.dist;
  });

  p.toDefend = list;
}

function getManhattan(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

function redToEnemy(p) {
  var list = [];
  bluepac.map(function(b) {
    list.push({ p: b, dist: getManhattan(p.x, p.y, b.x, b.y) });
  });

  list.sort(function(a, b) {
    return a.dist - b.dist;
  });
  p.nearEnemy = list;
}

function blueToEnemy(p) {
  var list = [];
  redpac.map(function(b) {
    list.push({ p: b, dist: getManhattan(p.x, p.y, b.x, b.y) });
  });

  list.sort(function(a, b) {
    return a.dist - b.dist;
  });
  p.nearEnemy = list;
}

function DefensiveBluePatrol() {
  try {
    bluepac.map(function(p) {
      lis = p.toDefend;
      if (lis.length > 0) {
        if (p.nearEnemy[0].dist < 6) {
          lis = p.nearEnemy;
          var temp = lis[0];
          var graph = new Graph(maze);
          var start = graph.nodes[p.x][p.y];
          var end = graph.nodes[temp.p.x][temp.p.y];
          p.stack = astar.search(graph.nodes, start, end);
        } else {
          var temp = lis[0];
          var graph = new Graph(maze);
          var start = graph.nodes[p.x][p.y];

          if (p.x === 23 && p.y === 5) {
            p.patrol = [23, 6];
          } else if (p.x === 23 && p.y === 6) {
            p.patrol = [23, 5];
          }
          // console.log(p.patrol);
          var end = graph.nodes[p.patrol[0]][p.patrol[1]];
          p.stack = astar.search(graph.nodes, start, end);
        }
      }
      move(p);
    });
  } catch (e) {
    console.log(e);
  }
}

function pre() {
  redToEat(redpac[0]);
  blueToEat(bluepac[0]);
  redtoDefend(redpac[0]);

  bluetoDefend(bluepac[0]);
  redToEnemy(redpac[0]);

  blueToEnemy(bluepac[0]);

  if (redpac.length < 1 || bluepac.length < 1) {
    clearInterval(gg);
  }
}

function qlearning(x, y, a) {
  // qred[x][y] = qred[x][y] + a;
  // window.localStorage.setItem("qred", JSON.stringify(qred));
}

function qlearningInit() {
  var list2 = [];

  for (var i = 0; i < 36; i++) {
    var list = [];
    for (var j = 0; j < 14; j++) {
      list.push(new Qtable(0, 0, 0, 0));
    }
    list2.push(list);
  }

  qVal = list2;
}

function qlearningRED(dirx, diry, x, y, reward) {
  // var dir = 2;
  // if (dirx === 0 && diry === 1) {
  //   dir = 1;
  //   qVal[x][y].d =
  //     reward +
  //     Math.max(
  //       qVal[x][y + 1].l,
  //       qVal[x][y + 1].r,
  //       qVal[x][y + 1].u,
  //       qVal[x][y + 1].d
  //     );
  //   qVal[x][y].rew.d.push(reward);
  // } else if (dirx === 0 && diry === -1) {
  //   dir = 0;
  //   qVal[x][y].u =
  //     reward +
  //     Math.max(
  //       qVal[x][y - 1].l,
  //       qVal[x][y - 1].r,
  //       qVal[x][y - 1].u,
  //       qVal[x][y - 1].d
  //     );
  //   qVal[x][y].rew.u.push(reward);
  // } else if (dirx === 1 && diry === 0) {
  //   dir = 2;
  //   qVal[x][y].r =
  //     reward +
  //     Math.max(
  //       qVal[x + 1][y].l,
  //       qVal[x + 1][y].r,
  //       qVal[x + 1][y].u,
  //       qVal[x + 1][y].d
  //     );
  //   qVal[x][y].rew.r.push(reward);
  // } else if (dirx === -1 && diry === 0) {
  //   dir = 3;
  //   qVal[x][y].l =
  //     reward +
  //     Math.max(
  //       qVal[x - 1][y].l,
  //       qVal[x - 1][y].r,
  //       qVal[x - 1][y].u,
  //       qVal[x - 1][y].d
  //     );
  //   qVal[x][y].rew.l.push(reward);
  // } else {
  //   qVal[x][y].r =
  //     reward +
  //     Math.max(
  //       qVal[x + 1][y].l,
  //       qVal[x + 1][y].r,
  //       qVal[x + 1][y].u,
  //       qVal[x + 1][y].d
  //     );
  //   qVal[x][y].rew.r.push(reward);
  // }
  // qVal[dir][x][y] =
  //   reward +
  //   Math.max(
  //     qVal[0][x + dirx][y + diry],
  //     qVal[1][x + dirx][y + diry],
  //     qVal[2][x + dirx][y + diry],
  //     qVal[3][x + dirx][y + diry]
  //   );
  // window.localStorage.setItem("qVal", JSON.stringify(qVal));
}

function TrainerPacman(p) {
  switch (getRndInteger(0, 4)) {
    case 0:
      pacUp(p);

      break;
    case 1:
      pacDown(p);
      break;
    case 2:
      pacLeft(p);
      break;
    case 3:
      pacRight(p);
      break;
  }
}

function followQ(p) {
  var t1 = 0;
  var t2 = 0;
  var t3 = 0;
  var t4 = 0;

  t1 = qVal[p.x][p.y].r;
  t3 = qVal[p.x][p.y].d;
  t2 = qVal[p.x][p.y].l;
  t4 = qVal[p.x][p.y].u;
  if (isNaN(t1)) t1 = -19;
  if (isNaN(t2)) t2 = -19;
  if (isNaN(t3)) t3 = -19;
  if (isNaN(t4)) t4 = -19;

  var tem = Math.max(t1, t2, t3, t4);
  console.log(tem, t1, t2, t3, t4);

  switch (tem) {
    case t1:
      pacRight(p);
      break;
    case t4:
      pacUp(p);
      break;
    case t3:
      pacDown(p);

      break;
    case t2:
      pacLeft(p);

      break;
  }
}

function Training(p) {
  switch (getRndInteger(0, 4)) {
    case 0:
      pacUp(p);
      break;
    case 1:
      pacDown(p);
      break;
    case 2:
      pacLeft(p);
      break;
    case 3:
      pacRight(p);
      break;
  }
}
function checkenemy(p, r) {
  var reward = 0;
  bluefood.map(function(f) {
    if (p.x === f.x && p.y === f.y) {
      reward = 5;
    }
  });

  bluepac.map(function(f) {
    if (p.x === f.x && p.y === f.y) {
      reward = -20;
    }
  });

  return reward;
}

function Q(x1, y1, x2, y2, r) {
  var dirx = x2 - x1;
  var diry = y2 - y1;

  if (dirx === 1 && diry === 0) {
    qVal[x1][y1].r =
      r +
      Math.max(
        qVal[x1 + 1][y1].r,
        qVal[x1 + 1][y1].l,
        qVal[x1 + 1][y1].d,
        qVal[x1 + 1][y1].u
      );
  } else if (dirx === 0 && diry === 1) {
    qVal[x1][y1].d =
      r +
      Math.max(
        qVal[x1][y1 + 1].r,
        qVal[x1][y1 + 1].l,
        qVal[x1][y1 + 1].d,
        qVal[x1][y1 + 1].u
      );
  } else if (dirx === -1 && diry === 0) {
    qVal[x1][y1].l =
      r +
      Math.max(
        qVal[x1 - 1][y1].r,
        qVal[x1 - 1][y1].l,
        qVal[x1 - 1][y1].d,
        qVal[x1 - 1][y1].u
      );
  } else if (dirx === 0 && diry === -1) {
    qVal[x1][y1].u =
      r +
      Math.max(
        qVal[x1][y1 - 1].r,
        qVal[x1][y1 - 1].l,
        qVal[x1][y1 - 1].d,
        qVal[x1][y1 - 1].u
      );
  }

  console.log(qVal[x1][y1]);
  window.localStorage.setItem("qVal", JSON.stringify(qVal));
}

function AggressiveAvoidQTest() {
  redpac.map(function(p) {
    lis = travx;
    // lis = shuffleArray(p.toEat);

    if (lis.length > 0) {
      if (p.nearEnemy[0].dist < 6 && p.x > 17) {
        var temp = p.nearEnemy[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        try {
          var tem = getOppositePoint(maze, p.x, p.y, temp.p.x, temp.p.y, 3);
          var end = graph.nodes[tem.x][tem.y];
          p.stack = astar.search(graph.nodes, start, end);
        } catch (e) {
          var tem = getOppositePoint(maze, p.x, p.y, temp.p.x, temp.p.y, 2);
          var end = graph.nodes[tem.x][tem.y];
          p.stack = astar.search(graph.nodes, start, end);
        }
      } else if (p.nearEnemy[0].dist < 6 && p.x < 17) {
        lis = p.nearEnemy;
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp.p.x][temp.p.y];
        p.stack = astar.search(graph.nodes, start, end);
      } else {
        var temp = lis[0];
        var graph = new Graph(maze);
        var start = graph.nodes[p.x][p.y];
        var end = graph.nodes[temp[0]][temp[1]];
        p.stack = astar.search(graph.nodes, start, end);
        // }
      }
    }

    move(p);
  });
}

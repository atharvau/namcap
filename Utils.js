function deepArray(m) {
  var yy = [];
  m.map(function(d) {
    kk = [];
    d.map(function(p) {
      if (p === 2) {
        p = 0;
      }
      kk.push(p);
    });
    yy.push(kk);
  });
  return yy;
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getDistance(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.sqrt(a * a + b * b);
}

var matrix = [
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0]
];

var start = [4, 0];
var end = [3, 4];

function findWay(position, end) {
  var queue = [];

  matrix[position[0]][position[1]] = 1;
  queue.push([position]); // store a path, not just a position

  while (queue.length > 0) {
    var path = queue.shift(); // get the path out of the queue
    var pos = path[path.length - 1]; // ... and then the last position from it
    var direction = [
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] - 1]
    ];

    for (var i = 0; i < direction.length; i++) {
      // Perform this check first:
      if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
        // return the path that led to the find
        return path.concat([end]);
      }

      if (
        direction[i][0] < 0 ||
        direction[i][0] >= matrix[0].length ||
        direction[i][1] < 0 ||
        direction[i][1] >= matrix[0].length ||
        matrix[direction[i][0]][direction[i][1]] != 0
      ) {
        continue;
      }

      matrix[direction[i][0]][direction[i][1]] = 1;
      // extend and push the path on the queue
      queue.push(path.concat([direction[i]]));
    }
  }
}

function removeFirst(f) {
  o = [];
  var count = 0;
  f.map(function(ll) {
    if (count != 0) o.push(ll);

    count++;
  });
  return o;
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}
function remove(array, element) {
  return array.filter(el => el !== element);
}

function getOppositePoint(maze, x1, y1, x2, y2, distance_p2_to_p3) {
  p3 = {};
  var deltaX = x2 - x1;
  var deltaY = y2 - y1;
  var distance_p1_to_p2 = getDistance(x1, y1, x2, y2);
  scale = distance_p2_to_p3 / distance_p1_to_p2;
  p3.x = Math.floor(x2 - deltaX * scale);
  p3.y = Math.floor(y2 - deltaY * scale);

  if (maze[p3.x][p3.y] === 0) {
    return p3;
  } else {
    return getOppositePoint(maze, x1, y1, x2, y2, distance_p2_to_p3 + 1);
  }
}

function getOppP(x1, y1, x2, y2) {
  p = { x: x1, y: y1 };
  if (x1 > x2 && y1 === y2) {
    p.x1 += 1;
  } else if (x1 < x2 && y1 === y2) {
    p.x1 -= 1;
  } else if (y1 < y2 && x1 === x2) {
    p.y1 -= 1;
  } else if (y1 > y2 && x1 === x2) {
    p.y1 += 1;
  } else if (y1 > y2 && x1 > x2) {
    p.x1 += 1;
  } else if (y1 < y2 && x1 < x2) {
    p.x1 -= 1;
  } else if (x1 < x2 && y1 > y2) {
    p.x1 -= 1;
  }
  return p;
}
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

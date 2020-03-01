var qred = JSON.parse(window.localStorage.getItem("qred"));
var qblue = [];
var kblue = [];
var kred = [];
var kfred = [];
var qr = [];
var inc = 0;
var qvalueRed = {};
qVal = [];

class Qtable {
  constructor(u, d, l, r) {
    this.u = u;
    this.l = l;
    this.r = r;
    this.d = d;
    this.rew = { r: [], l: [], u: [], d: [] };
  }

  getMax() {
    return Math.max(this.l, this.u, this.r, this.d);
  }
}

qlis = [];

travx = [
  [19, 8],
  [18, 8],
  [21, 9],
  [25, 9],
  [25, 10],
  [26, 9],
  [27, 10],
  [28, 9],
  [29, 10],
  [30, 9],
  [31, 10],
  [32, 9],
  [32, 7],
  [31, 7],
  [29, 6],
  [32, 5],
  [30, 5],
  [29, 5],
  [32, 3]
];

var rr = { x: 0, y: 0 };

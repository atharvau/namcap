const fs = require("fs");
var mat = [];
fs.readFile("crowdedCapture.txt", (err, data) => {
  if (err) throw err;

  var lines = data.toString().split("\r\n");

  const rows = lines.length;
  const cols = lines[0].length;

  //   for (i = 0; i < lines.length; i++) {
  //     mat[i][j] = lines[i].charAt(i);
  //   }
  for (i = 0; i < lines.length; i++) {
    mat[i] = lines[i].split("");

    // console.log("MAT " + i + "\t" + mat[i]);
  }

  var list = [];
  for (i = 0; i < mat.length; i++) {
    for (j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === ".") list.push([j, i]);
    }
  }
  console.log(JSON.stringify(list));

  //   console.log(lines[0]);
});

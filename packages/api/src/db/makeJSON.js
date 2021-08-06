import fs from "fs";
import readline from "readline";
const fileStream = fs.createReadStream("src/db/seeds/ex-data.txt");
const rl = readline.createInterface({ input: fileStream });
const data = [];
rl.on("line", (line) => {
  if (line !== "" && !line.startsWith("#")) {
    const vals = line.split(",");
    vals[10] = vals[10].split("/");
    data.push({
      area: vals[0],
      bank: vals[1],
      zone: vals[2],
      stand: vals[3],
      asset: vals[4],
      netWin: vals[5],
      oldDenom: vals[6],
      newDenom: vals[7],
      oldPayback: vals[8],
      newPayback: vals[9],
      date: `20${vals[10][2]}-${vals[10][1]}-${vals[10][0]}`,
    });
  }
});

rl.on("close", () => {
  fs.writeFile("src/db/data.json", JSON.stringify(data), (err) => {
    if (err) console.error(err);
    console.log("Wrote data to src/db/data.json!");
  });
});

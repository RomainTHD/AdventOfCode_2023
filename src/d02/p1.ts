import * as console from "console";
import * as fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.filter((s) => s !== "")
		.map((s) => s.replace(/^Game \d+: /, ""))
		.map((s) => s.split(/; /))
		.map((sets) =>
			sets.map((set) => [
				(set.match(/(\d+) red/) ?? [null, "0"])[1],
				(set.match(/(\d+) green/) ?? [null, "0"])[1],
				(set.match(/(\d+) blue/) ?? [null, "0"])[1],
			]),
		)
		.map((sets) =>
			sets.map(([r, g, b]) => [
				parseInt(r, 10),
				parseInt(g, 10),
				parseInt(b, 10),
			]),
		)
		.map((sets) => sets.map(([r, g, b]) => r <= 12 && g <= 13 && b <= 14))
		.map((sets) => sets.every((set) => set))
		.map((possible, idx) => (possible ? idx + 1 : 0))
		.reduce((a, b) => a + b, 0),
);

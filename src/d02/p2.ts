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
		.map((sets) => [
			Math.max(...sets.map(([r, g, b]) => r)),
			Math.max(...sets.map(([r, g, b]) => g)),
			Math.max(...sets.map(([r, g, b]) => b)),
		])
		.map((sets) => sets.reduce((a, b) => a * b, 1))
		.reduce((a, b) => a + b, 0),
);

import * as console from "console";
import * as fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.filter((s) => s !== "")
		.map((s) => [s.match(/(\d).*/)![1], s.match(/.*(\d)/)![1]])
		.map((m) => m![0] + m![1])
		.map((n) => parseInt(n, 10))
		.reduce((a, b) => a + b, 0),
);

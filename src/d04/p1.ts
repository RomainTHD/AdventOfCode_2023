import * as console from "console";
import * as fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.filter((s) => s !== "")
		.map((s) => s.replace(/Card +\d+:/, ""))
		.map((s) => s.split("|"))
		.map(([s1, s2]) => [
			s1.split(" ").filter((s) => s !== ""),
			s2.split(" ").filter((s) => s !== ""),
		])
		.map(([s1, s2]) => [
			s1.map((e) => parseInt(e, 10)),
			s2.map((e) => parseInt(e, 10)),
		])
		.map(([s1, s2]) => s1.map((e) => (s2.includes(e) ? 1 : 0) as number))
		.map((t) => t.reduce((a, b) => a + b, 0))
		.map((n) => Math.floor(Math.pow(2, n - 1)))
		.reduce((a, b) => a + b, 0),
);

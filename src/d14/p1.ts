import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.map((s) => s.trim())
		.filter((s) => s !== "")
		.reduce((acc, s) => [[...acc[0], s]], [[] as string[]])
		.map((rows) =>
			[...new Array(rows[0].length)]
				.map((_, r) =>
					[...new Array(rows.length)]
						.map((_, c) => rows[c][r])
						.join("")
						.split("#")
						.map((s) => [(s.match(/O/g) ?? []).length, s.length])
						.map(([n, len]) => "O".repeat(n) + ".".repeat(len - n))
						.join("#")
						.split("")
						.reduce(
							(acc, c, i, s) =>
								acc + (c === "O" ? s.length - i : 0),
							0,
						),
				)
				.reduce((a, b) => a + b),
		)[0],
);

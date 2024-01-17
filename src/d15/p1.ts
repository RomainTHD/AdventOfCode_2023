import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.replaceAll(/\s/g, "")
		.split(",")
		.map((s) =>
			s
				.split("")
				.reduce((acc, c) => ((acc + c.charCodeAt(0)) * 17) % 256, 0),
		)
		.reduce((a, b) => a + b),
);

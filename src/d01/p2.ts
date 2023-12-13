import * as console from "console";
import * as fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.filter((s) => s !== "")
		.map((s) =>
			s
				.replaceAll(/one/g, "o1ne")
				.replaceAll(/two/g, "t2wo")
				.replaceAll(/three/g, "t3hree")
				.replaceAll(/four/g, "f4ur")
				.replaceAll(/five/g, "f5ie")
				.replaceAll(/six/g, "s6ix")
				.replaceAll(/seven/g, "s7een")
				.replaceAll(/eight/g, "e8ight")
				.replaceAll(/nine/g, "n9ine"),
		)
		.map((s) => [s.match(/(\d).*/)![1], s.match(/.*(\d)/)![1]])
		.map((m) => m![0] + m![1])
		.map((n) => parseInt(n, 10))
		.reduce((a, b) => a + b, 0),
);

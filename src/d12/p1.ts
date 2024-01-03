import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.map((s) => s.trim())
		.filter((s) => s !== "")
		.map((s) => s.split(" "))
		.map(
			([left, right]) =>
				[left, right.split(",").map((s) => parseInt(s, 10))] as const,
		)
		.map(
			([left, right]) =>
				[
					left,
					"^[.?]*" +
						right.map((n) => `[?#]{${n}}`).join("[.?]+") +
						"[.?]*$",
				] as const,
		)
		.map(
			([str, pattern]) =>
				[str, (s: string) => new RegExp(pattern).test(s)] as const,
		)
		.map(
			([str, isValid]) =>
				[
					str,
					(
						s: string,
						check: (s: string, recurse: typeof check) => number,
					) =>
						!isValid(s)
							? 0
							: !s.includes("?")
								? 1
								: check(s.replace("?", "."), check) +
									check(s.replace("?", "#"), check),
				] as const,
		)
		.map(([str, check]) => check(str, check))
		.reduce((a, b) => a + b, 0),
);

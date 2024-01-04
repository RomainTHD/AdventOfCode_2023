import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.replaceAll(/\r/g, "")
		.split("\n\n")
		.map((s) =>
			s
				.split("\n")
				.map((s) => s.trim())
				.filter((s) => !!s),
		)
		.map((t) => [
			t,
			[...new Array(t[0].length)].map((_, r) =>
				[...new Array(t.length)].map((_, c) => t[c][r]).join(""),
			),
		])
		.flat()
		.map((t) =>
			new Array(t.length - 3)
				.fill(0)
				.map((_, i) => i + 2)
				.map(
					(axis) =>
						[
							axis,
							t.slice(
								axis - Math.min(axis, t.length - axis),
								axis,
							),
							t.slice(
								axis,
								axis + Math.min(axis, t.length - axis),
							),
						] as const,
				),
		)
		.map(
			(choices) =>
				choices.find(
					([_, left, right]) =>
						left.every(
							(s, i) => s === right[right.length - i - 1],
						) ||
						right.every((s, i) => s === left[left.length - i - 1]),
				) ?? [0],
		)
		.map(([choice], i) => (i % 2 === 0 ? choice * 100 : choice))
		.reduce((a, b) => a + b, 0),
);

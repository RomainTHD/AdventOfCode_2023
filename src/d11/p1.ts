import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.map((s) => s.trim())
		.filter((s) => s !== "")
		.reduce(
			(acc, s) => [{ rows: [...acc[0].rows, s] }],
			[{ rows: [] as string[] }],
		)
		.map(({ rows }) => ({
			rows: rows.map((s) => (/^\.+$/.test(s) ? [s, s] : [s])).flat(),
		}))
		.map(({ rows }) => ({
			rows: [...new Array(rows[0].length)].map((_, r) =>
				[...new Array(rows.length)]
					.map((_, c) => rows[rows.length - c - 1][r])
					.join(""),
			),
		}))
		.map(({ rows }) => ({
			rows: rows.map((s) => (/^\.+$/.test(s) ? [s, s] : [s])).flat(),
		}))
		.map(({ rows }) => ({
			rows: [...new Array(rows[0].length)].map((_, r) =>
				[...new Array(rows.length)]
					.map((_, c) => rows[c][rows[0].length - r - 1])
					.join(""),
			),
		}))
		.map(({ rows }) => ({
			pos: rows
				.map((row) =>
					row
						.split("")
						.reduce(
							(acc, elt, c) => (elt === "#" ? [...acc, c] : acc),
							[] as number[],
						),
				)
				.map((cols, r) => cols.map((c) => [r, c] as const))
				.flat(),
		}))
		.map(
			({ pos }) =>
				pos
					.map(([r1, c1], i) =>
						pos.map(
							([r2, c2], j) =>
								Math.abs(r1 - r2) + Math.abs(c1 - c2),
						),
					)
					.flat()
					.reduce((a, b) => a + b, 0) / 2,
		)[0],
);

import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.trim()
		.split("\n")
		.map((s) =>
			/(-?\d+), +(-?\d+), +-?\d+ +@ +(-?\d+), +(-?\d+), +-?\d+/.exec(s),
		)
		.map((a) => a ?? [])
		.map(([_, x, y, dx, dy]) => [x, y, dx, dy] as const)
		.map((a) => a.map((s) => parseInt(s, 10)))
		.map(([x, y, dx, dy]) => [dy / dx, y - (dy / dx) * x, x, dx])
		.map(([a, b, x0, dx], idx, arr) =>
			arr
				.slice(idx + 1)
				.map((next) =>
					[next]
						.map(([m, p, m0, dm]) => [
							(p - b) / (a - m),
							(a * p - b * m) / (a - m),
							x0,
							dx,
							m0,
							dm,
						])
						.flat(),
				),
		)
		.flat()
		.filter(
			([x, _, x0, dx, m0, dm]) => (x0 - x) / dx < 0 && (m0 - x) / dm < 0,
		)
		.filter(([x]) => isFinite(x))
		.filter(
			([x, y]) =>
				x >= 200000000000000 &&
				x <= 400000000000000 &&
				y >= 200000000000000 &&
				y <= 400000000000000,
		).length,
);

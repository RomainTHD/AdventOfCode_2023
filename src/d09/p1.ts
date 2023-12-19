import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.filter((s) => s !== "")
		.map((s) => s.split(" "))
		.map((t) => t.map((e) => parseInt(e, 10)))
		.map((t) => [t, ...new Array(t.length - 1)] as (number[] | undefined)[])
		.map((all) =>
			all.map((t, i) =>
				i === 0
					? (t as number[])
					: (all[i] = (all[i - 1] as number[])
							.map((e, i, t) => t[i + 1] - e)
							.filter((e) => e === e)),
			),
		)
		.map(
			(all) =>
				all
					.reverse()
					.map(
						(t, i) =>
							(all[i] = [
								...t,
								t[t.length - 1] +
									((all[i - 1] ?? []).at(-1) ?? 0),
							]),
					)
					.at(-1)!
					.at(-1) as number,
		)
		.reduce((a, b) => a + b, 0),
);

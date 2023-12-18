import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.filter((s) => s !== "")
		.reduce(
			(acc, cur) => [
				{ dir: acc[0].dir || cur, elts: [...acc[0].elts, cur] },
			],
			[
				{
					dir: "",
					elts: [] as string[],
				},
			],
		)
		.map(({ dir, elts }) => ({ dir, elts: elts.slice(1) }))
		.map(({ dir, elts }) => ({
			dir,
			res: [{ found: false, val: 0 }],
			nextDir: 0,
			nextElt: "AAA",
			elts: Object.fromEntries(
				elts.map((s) => [
					s.slice(0, 3),
					{
						left: s.slice(7, 10),
						right: s.slice(12, 15),
					},
				]),
			),
		}))
		.concat(Array.from(new Array(100_000).keys()).map(() => null))
		.flat()
		.reduce((acc) => ({
			...acc,
			res:
				acc.nextElt === "ZZZ" && !acc.res[0].found
					? [{ found: true, val: acc.nextDir }]
					: acc.res,
			nextDir: acc.nextElt === "ZZZ" ? acc.nextDir : acc.nextDir + 1,
			nextElt:
				acc.elts[acc.nextElt][
					acc.dir.charAt(acc.nextDir % acc.dir.length) === "L"
						? "left"
						: "right"
				],
		}))
		.res.map((obj) => (obj.found ? obj.val : -1))[0],
);

import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.slice(0, 2)
		.reduce(([[t, d]], s) => [[t ?? s, t === null ? null : s]], [
			[null, null],
		] as (string | null)[][])
		.map(([t, d]) => [
			t?.replace(/Time:\s*/, "").trim() ?? "",
			d?.replace(/Distance:\s*/, "").trim() ?? "",
		])
		.map((obj) => obj.map((e) => e.split(" ").filter((s) => s !== "")))[0]
		.map((obj) => obj.map((s) => parseInt(s, 10)))
		.reduce((acc, arr) => arr.map((e, i) => [e, acc[i]]), [])
		.map(([d, [t]]) => ({ t, d }))
		.map(({ t, d }) => ({ ts: [...new Array(t + 1)].map((_, i) => i), d }))
		.map(({ ts, d }) => ({
			ts: ts.map((t) => t * ((ts as number[]).length - t - 1)),
			d,
		}))
		.map(({ ts, d }) => ts.filter((t) => t > d))
		.map((ts) => ts.length)
		.reduce((a, b) => a * b, 1),
);

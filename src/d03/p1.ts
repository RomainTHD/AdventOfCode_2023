import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.map((s) => s.trim())
		.filter((s) => s !== "")
		.map(
			(s) =>
				[
					s.match(/(\D*)\d+/g) ?? [],
					s.split("").map((c) => /[^.0-9]/.test(c)),
				] as const /* nums, isSymbol */,
		)
		.map(
			([nums, isSymbol]) =>
				[
					nums.map(
						(s) => [
							parseInt(s.replaceAll(/\D/g, ""), 10),
							0,
							0,
							s.length,
							s.replaceAll(/\d/g, "").length,
						] /* n, start, end, lenFull, lenPrefix */,
					),
					isSymbol,
				] as const,
		)
		.map(
			([nums, isSymbol]) =>
				[
					nums.map(
						([n, _start, _end, lenFull, lenPrefix], i, t) => [
							n,
							(t[i][1] =
								i === 0
									? lenPrefix
									: t[i - 1][2] + lenPrefix + 1),
							(t[i][2] =
								lenFull - 1 + (i === 0 ? 0 : t[i - 1][2] + 1)),
						] /* n, start, end */,
					),
					isSymbol,
				] as const,
		)
		.map(
			([nums, isSymbol]) =>
				[
					nums.map(
						([n, start, end]) =>
							[
								n,
								[...new Array(end - start + 1)].map(
									(_, i) => start + i,
								),
							] as const /* n, cols */,
					),
					isSymbol,
				] as const,
		)
		.map(([nums, isSymbol], r, t) =>
			nums.filter(([_n, cols]) =>
				cols.some(
					(c) =>
						(isSymbol[c - 1] ?? false) ||
						(isSymbol[c + 1] ?? false) ||
						((t[r - 1] || [null, []])[1][c - 1] ?? false) ||
						((t[r - 1] || [null, []])[1][c] ?? false) ||
						((t[r - 1] || [null, []])[1][c + 1] ?? false) ||
						((t[r + 1] || [null, []])[1][c - 1] ?? false) ||
						((t[r + 1] || [null, []])[1][c] ?? false) ||
						((t[r + 1] || [null, []])[1][c + 1] ?? false),
				),
			),
		)
		.flat()
		.map(([n]) => n)
		.reduce((a, b) => a + b, 0),
);

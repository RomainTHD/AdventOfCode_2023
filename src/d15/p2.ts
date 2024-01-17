import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.replaceAll(/\s/g, "")
		.split(",")
		.map(
			(s) =>
				[
					...(s.match(/^(.+)([=-])(.*)$/)?.slice(1) ?? ["", "", ""]),
					s
						.replace(/[=-].*/, "")
						.split("")
						.reduce(
							(acc, c) => ((acc + c.charCodeAt(0)) * 17) % 256,
							0,
						),
				] as [string, string, string, number],
		)
		.reduce(
			(acc, [label, token, n, hash]) => [
				...acc.slice(0, hash),
				token === "-"
					? acc[hash].filter(
							([currentLabel, _]) => label !== currentLabel,
						)
					: ((idx) =>
							idx === -1
								? ([
										...acc[hash],
										[label, parseInt(n, 10)] satisfies [
											string,
											number,
										],
									] satisfies [string, number][])
								: acc[hash].map(
										([currentLabel, currentN]) =>
											[
												currentLabel,
												currentLabel === label
													? parseInt(n, 10)
													: currentN,
											] satisfies [string, number],
									))(
							acc[hash].findIndex(
								([currentLabel, _]) => label === currentLabel,
							),
						),
				...acc.slice(hash + 1),
			],
			[...new Array(256)].map(() => [] as [string, number][]),
		)
		.map((elts, box) =>
			elts.map(([_, focal], slot) => (box + 1) * (slot + 1) * focal),
		)
		.flat()
		.reduce((a, b) => a + b),
);

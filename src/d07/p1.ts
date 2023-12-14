import console from "console";
import fs from "fs";

console.log(
	fs
		.readFileSync(__dirname + "/input")
		.toString()
		.split("\n")
		.filter((s) => s !== "")
		.map((s) => /^(\w+) ?(\d*)$/.exec(s.trim()))
		.map((r) => [r![1], parseInt(r![2], 10) || 0] as [string, number])
		.map(
			([hand, bid]) =>
				[
					hand,
					[...hand].sort().join(""),
					bid,
					Array.from(hand)
						.reverse()
						.map(
							(c, i) =>
								"23456789TJQKA".indexOf(c) *
								Math.pow("23456789TJQKA".length, i),
						)
						.reduce((a, b) => a + b, 0),
				] as const,
		)
		.map(
			([hand, sortedHand, bid, value]) =>
				[
					hand,
					bid,
					value,
					[
						[...sortedHand].every((c) => c === sortedHand[0]),
						/(.)\1\1\1/.test(sortedHand),
						/^(.)\1((\1(.)\4)|((.)\6\6))/.test(sortedHand),
						/(.)\1\1/.test(sortedHand),
						/(.)\1.*(.)\2/.test(sortedHand),
						/(.)\1/.test(sortedHand),
						true,
					],
				] as const,
		)
		.map(
			([hand, bid, value, handType]) =>
				[hand, bid, value, handType.findIndex((e) => e)] as const,
		)
		.sort((a, b) => a[2] - b[2])
		.sort((a, b) => b[3] - a[3])
		.map(([_, bid], i) => bid * (i + 1))
		.reduce((a, b) => a + b, 0),
);

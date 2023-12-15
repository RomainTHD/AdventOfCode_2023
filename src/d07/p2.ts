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
					[...hand]
						.sort((a, b) =>
							a === "J" ? 1 : b === "J" ? -1 : Number(a > b),
						)
						.join(""),
					bid,
					Array.from(hand)
						.reverse()
						.map(
							(c, i) =>
								"J23456789TQKA".indexOf(c) *
								Math.pow("J23456789TQKA".length, i),
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
						[...sortedHand].every(
							(c) => c === sortedHand[0] || c === "J",
						),
						/(.).*(\1|J).*(\1|J).*(\1|J)/.test(sortedHand),
						/^(.).*(\1|J).*(((\1|J).*(.).*(\6|J))|((.).*(\9|J).*(\9|J)))/.test(
							sortedHand,
						),
						/(.).*(\1|J).*(\1|J)/.test(sortedHand),
						/(.).*(\1|J).*(.)(\3|J)/.test(sortedHand),
						/(.).*(\1|J)/.test(sortedHand),
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

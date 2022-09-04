import { assert, describe, expect, it } from 'vitest'

import { inflateCardset, getRoundDuration, getRoundHostages } from "@/gamelogic";


describe('cardset inflate', () => {
    it("minimal basic", () => {
        expect(inflateCardset("basic", 4)).toStrictEqual(
            [
                "president",
                "bomber",
                "blue_team",
                "red_team"
            ])
    })

    it("odd numbered basic", () => {
        expect(inflateCardset("basic", 5)).toStrictEqual(
            [
                "president",
                "bomber",
                "gambler",
                "blue_team",
                "red_team"
            ]
        )
    })
})

describe('round duration and hostages', () => {
    it('3 round durations', () => {
        expect(getRoundDuration(1, 3)).toStrictEqual(3 * 60);
        expect(getRoundDuration(3, 3)).toStrictEqual(1 * 60);
    });

    it('5 round durations', () => {
        expect(getRoundDuration(1, 5)).toStrictEqual(5 * 60);
        expect(getRoundDuration(3, 5)).toStrictEqual(3 * 60);
        expect(getRoundDuration(5, 5)).toStrictEqual(1 * 60);
    });

    it('3 round hostages', () => {
        expect(getRoundHostages(1, 3, 14)).toStrictEqual(2);
        expect(getRoundHostages(2, 3, 17)).toStrictEqual(1);
        expect(getRoundHostages(1, 3, 200)).toStrictEqual(3);
    });

    it('5 round hostages', () => {
        expect(getRoundHostages(1, 5, 12)).toStrictEqual(2);
    })
})

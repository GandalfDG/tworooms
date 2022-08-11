import { assert, describe, expect, it } from 'vitest'

import { inflateCardset } from "@/gamelogic";


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

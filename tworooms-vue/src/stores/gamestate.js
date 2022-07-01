import { defineStore } from 'pinia'

export const useGameState = defineStore('gamestate', {
    state: () => (
         {
            playername: 'Joe Shmoe',
            ishost: false,
            roomcode: 'ABCD'
        }
    )
})
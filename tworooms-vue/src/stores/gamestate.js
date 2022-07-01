import { defineStore } from 'pinia'

export const useGameState = defineStore('gamestate', {
    state: () => (
         {
            playername: '',
            ishost: false,
            roomcode: ''
        }
    )
})
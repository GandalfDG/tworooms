import { defineStore } from 'pinia'
import axios from 'axios'

const ax = axios.create({
    baseURL: 'http://127.0.0.1:1337/api',
    timeout: 10000,
})

export const useGameState = defineStore('gamestate', {
    state: () => (
         {
            playername: '',
            ishost: false,
            roomcode: '',

            playerlist: [],
            startroom: 0,
            cardindex: 0
        }
    ),

    actions: {
        async createRoom() {
            let response = await ax.post('create/', {
                playername: this.playername
            })
            this.roomcode = response.data.roomcode
            this.playerlist = response.data.playerlist
        },

        async joinRoom() {
            let response = await ax.post('join/', {
                playername: this.playername,
                roomcode: this.roomcode
            })
            this.roomcode = response.data.roomcode
            this.playerlist = response.data.playerlist
        }
    }
})
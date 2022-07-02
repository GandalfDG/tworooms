import { defineStore } from 'pinia'
import axios from 'axios'

const ax = axios.create({
    baseURL: 'http://127.0.0.1:1337/',
    timeout: 10000,
})

export const useGameState = defineStore('gamestate', {
    state: () => (
         {
            playername: 'Joe Shmoe',
            ishost: false,
            roomcode: ''
        }
    ),

    actions: {
        async createRoom() {
            let response = await ax.post('create/', {
                playername: this.playername
            })
            this.roomcode = response.data.roomcode
        },

        async joinRoom() {
            let response = await ax.post('join/', {
                playername: this.playername,
                roomcode: this.roomcode
            })
        }
    }
})
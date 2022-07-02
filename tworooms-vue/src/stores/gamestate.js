import { defineStore } from 'pinia'
import axios from 'axios'

const ax = axios.create({
    baseURL: 'localhost:1337/',
    timeout: 1000,
})

export const useGameState = defineStore('gamestate', {
    state: () => (
         {
            playername: 'Joe Shmoe',
            ishost: false,
            roomcode: 'ABCD'
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
import { defineStore } from 'pinia'
import { wsMessageListener, setSessionCookie } from '../gamelogic'
import axios from 'axios'

const ax = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
    // withCredentials: true
})

console.log(import.meta.env.VITE_BACKEND_URL)

const websocket_url = 'ws://127.0.0.1:1337/ws/game'


export const useGameState = defineStore('gamestate', {
    state: () => (
         {
            playername: '',
            ishost: false,
            roomcode: '',
            session: '',

            playerlist: [],
            startroom: 0,
            cardindex: 0,

            socket: null
        }
    ),

    actions: {
        async createRoom() {
            let response = await ax.post('create/', {
                playername: this.playername
            })
            this.roomcode = response.data.roomcode
            this.playerlist = response.data.playerlist
            this.session = response.data.session
            setSessionCookie(this.session)
            // this.connectWebsocket()
        },

        async joinRoom() {
            let response = await ax.post('join/', {
                playername: this.playername,
                roomcode: this.roomcode
            })
            this.roomcode = response.data.roomcode
            this.playerlist = response.data.playerlist
            this.session = response.data.session
            setSessionCookie(this.session)
            // this.connectWebsocket()
        },

        // async connectWebsocket() {
        //     let socket = new WebSocket(websocket_url)
        //     socket.addEventListener("message", wsMessageListener())
        //     socket.send("hello")
        //     this.socket = socket
        // }
    }
})
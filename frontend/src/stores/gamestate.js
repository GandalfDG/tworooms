import { defineStore } from 'pinia'
import { wsMessageListener } from '../gamelogic'
import axios from 'axios'

export function getBackendUrl() {
    let env_var = import.meta.env.VITE_BACKEND_HOST;
    console.log(env_var.length > 0 ? env_var : window.location.host)
    return env_var.length > 0 ? env_var : window.location.host;
}

const websocket_url = 'ws://' + getBackendUrl() + '/ws/game'

export const useGameState = defineStore('gamestate', {
    state: () => (
         {
            playername: '',
            ishost: false,
            roomcode: '',
            session: '',

            playerlist: [],

            playerdata: {},
            roommates: [],

            socket: null,
            ax: axios.create({
                baseURL: "http://" + getBackendUrl() + "/api",
                timeout: 10000,
                // withCredentials: true
            })
        }
    ),

    actions: {
        async createRoom() {
            let response = await this.ax.post('create/', {
                playername: this.playername
            })
            this.roomcode = response.data.roomcode
            this.playerlist = response.data.playerlist
            this.session = response.data.session
            this.connectWebsocket()
        },

        async joinRoom() {
            let response = await this.ax.post('join/', {
                playername: this.playername,
                roomcode: this.roomcode
            })
            this.roomcode = response.data.roomcode
            this.playerlist = response.data.playerlist
            this.session = response.data.session
            this.connectWebsocket()
        },

        async connectWebsocket() {
            let ws = new WebSocket(websocket_url)
            ws.addEventListener("message", wsMessageListener)
            ws.addEventListener("open", ()=>{
                ws.send(JSON.stringify({
                    session: this.session
                }))
            })
            this.socket = ws
        },

        async sendLobbyCutoffMessage() {
            this.socket.send("lobbycutoff");
        }
    }
})
import { defineStore } from 'pinia'
import { wsMessageListener } from '../gamelogic'
import axios from 'axios'

export function getBackendUrl () {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  return backendUrl
}

export function getBackendProtocol() {
  const backendProtocol = import.meta.env.VITE_PROTOCOL
  return backendProtocol
}

export function getWebsocketProtocol() {
  return getBackendProtocol() == 'http' ? 'ws' : 'wss'
}

const websocketUrl = getWebsocketProtocol() + '://' + getBackendUrl() + '/ws/game'

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

      num_rounds: 3,
      cardset: 'basic',
      card: {},
      deck: [],

      current_round: 1,
      start_timestamp: 0,
      socket: null,
      ax: axios.create({
        baseURL: getBackendProtocol() + '://' + getBackendUrl() + '/api',
        timeout: 10000
        // withCredentials: true
      }),

      debug: {
        timer_debug: false
      }
    }
  ),

  actions: {
    async createRoom () {
      const response = await this.ax.post('create/', {
        playername: this.playername
      })
      this.roomcode = response.data.roomcode
      this.playerlist = response.data.playerlist
      this.session = response.data.session
      this.connectWebsocket()
    },

    async joinRoom () {
      const response = await this.ax.post('join/', {
        playername: this.playername,
        roomcode: this.roomcode
      })
      this.roomcode = response.data.roomcode
      this.playerlist = response.data.playerlist
      this.session = response.data.session
      this.connectWebsocket()
    },

    async connectWebsocket () {
      const connectPromise = new Promise((resolve, reject) => {
        const ws = new WebSocket(websocketUrl)
        ws.addEventListener('open', () => {
          ws.send(JSON.stringify({
            session: this.session
          }))
          console.log('websocket connected')
          resolve()
        }, { once: true })
        ws.addEventListener('message', wsMessageListener)
        this.socket = ws
      })
      return connectPromise
    },

    async sendLobbyCutoffMessage (cardset) {
      this.socket.send(JSON.stringify({
        message: 'lobbycutoff',
        data: {
          cardset,
          rounds: this.num_rounds
        }
      }))
    },

    async sendStartGameMessage () {
      this.socket.send(JSON.stringify({
        message: 'startgame',
        data: {
        }
      }))
    },

    async startNextRound () {
      this.socket.send(JSON.stringify({
        message: 'nextround',
        data: {}
      }))
    },

    async resetGame () {
      this.socket.send(JSON.stringify({
        message: 'resetgame',
        data: {}
      }))
    }
  }
})

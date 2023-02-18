import { useGameState } from '@/stores/gamestate'
import router from '@/router'
import cardmap from '@/cardmap'
import cardsets from '@/cardsets'

export const wsEvent = new Event('wsmessage')

const roundGrid = [
  {
    // min_players: 6,
    min_players: 1,
    max_players: 10,
    max_rounds: 3,
    hostages: [0, 0, 1, 1, 1]
  },
  {
    min_players: 11,
    max_players: 13,
    max_rounds: 5,
    hostages: [2, 2, 1, 1, 1]
  },
  {
    min_players: 14,
    max_players: 17,
    max_rounds: 5,
    hostages: [3, 2, 2, 1, 1]
  },
  {
    min_players: 18,
    max_players: 21,
    max_rounds: 5,
    hostages: [4, 3, 2, 1, 1]
  },
  {
    min_players: 22,
    max_players: Number.POSITIVE_INFINITY,
    max_rounds: 5,
    hostages: [5, 4, 3, 2, 1]
  }
]

export function getRoundDuration (currentRound, numRounds) {
  const durationArray = [5, 4, 3, 2, 1]
  let duration = 0
  if (numRounds === 3) {
    currentRound += 2
  }

  duration = durationArray[currentRound - 1] * 60 // timer duration in seconds
  return duration
}

export function getRoundHostages (currentRound, numRounds, numPlayers) {
  const gameRules = roundGrid.filter((item) => {
    return (numPlayers >= item.min_players && numPlayers <= item.max_players)
  })[0]
  if (numRounds === 3) {
    currentRound += 2
  }
  return gameRules ? gameRules.hostages[currentRound - 1] : roundGrid[0].hostages[currentRound - 1]
}

export function wsMessageListener (event) {
  // big-ish case statement here for different messages
  // TODO this is a big mess at the moment. Good place to refactor
  const gamestate = useGameState()
  console.log(event.data)
  const msgdata = JSON.parse(event.data)

  if (msgdata.playerlist) {
    gamestate.playerlist = msgdata.playerlist
  }

  if (msgdata.message) {
    if (msgdata.message === 'leader_select') {
      gamestate.roomleader = msgdata.leader_name
      console.log('the room leader is' + gamestate.roomleader)
    }
  }

  if (msgdata.playerdata) {
    gamestate.playerdata = msgdata.playerdata
    gamestate.start_timestamp = msgdata.gamedata.timestamp
    if (msgdata.message === 'startgame') {
      router.push('game')
      const cardset = msgdata.gamedata.cardset
      const numPlayers = msgdata.gamedata.num_players
      gamestate.cardset = cardset
      const deck = inflateCardset(cardset, numPlayers)
      const cardIdx = gamestate.playerdata.card
      gamestate.deck = deck
      gamestate.card = {
        name: deck[cardIdx],
        data: cardmap[deck[cardIdx]]
      }
      gamestate.current_round = 1
      gamestate.start_timestamp = msgdata.gamedata.timestamp
    } else if (msgdata.message === 'nextround') {
      router.push('game')
      gamestate.current_round++
      gamestate.start_timestamp = msgdata.gamedata.timestamp
    } else if (msgdata.message === 'resetgame') {
      router.push('/')
    } else {
      router.push('pregame')
      gamestate.num_rounds = msgdata.gamedata.num_rounds
    }
  }

  if (msgdata.roommates) {
    gamestate.roommates = msgdata.roommates
  }

  // emit an event so that we know the message came in
  window.dispatchEvent(wsEvent)
}

export function inflateCardset (cardset, numPlayers) {
  let inflated = ['president', 'bomber']
  const set = cardsets[cardset]
  inflated = inflated.concat(set.core)
  if (numPlayers % 2 !== 0) {
    inflated.push(set.extra)
  }
  while (inflated.length < numPlayers) {
    inflated.push('blue_team')
    inflated.push('red_team')
  }

  return inflated
}

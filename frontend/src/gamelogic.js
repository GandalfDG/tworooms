import { useGameState } from "@/stores/gamestate";
import router from '@/router'
import cardmap from '@/cardmap'
import cardsets from '@/cardsets'

export const wsEvent = new Event('wsmessage');

const round_grid = [
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
    },
]

export function getRoundDuration(current_round, num_rounds) {
    const duration_array = [5,4,3,2,1];
    let duration = 0;
    if(num_rounds === 3) {
        current_round += 2;
    }

    duration = duration_array[current_round - 1] * 60; //timer duration in seconds
    return duration;
}

export function getRoundHostages(current_round, num_rounds, num_players) {
    let game_rules = round_grid.filter((item) => {
        return (num_players >= item.min_players && num_players <= item.max_players);
    })[0];
    if(num_rounds === 3) {
        current_round += 2;
    }
    return game_rules ? game_rules.hostages[current_round - 1] : round_grid[0].hostages[current_round - 1];
}

export function wsMessageListener(event) {
    // big-ish case statement here for different messages
    let gamestate = useGameState();
    console.log(event.data)
    let msgdata = JSON.parse(event.data);

    if (msgdata['playerlist']) {
        gamestate.playerlist = msgdata['playerlist']
    }

    if (msgdata['playerdata']) {
        gamestate.playerdata = msgdata['playerdata']
        if(msgdata['message'] === 'startgame') {
            router.push('game')
            let cardset = msgdata["gamedata"]["cardset"];
            let num_players = msgdata["gamedata"]["num_players"];
            gamestate.cardset = cardset;
            let deck = inflateCardset(cardset, num_players);
            let card_idx = gamestate['playerdata']['card'];
            gamestate.deck = deck;
            gamestate.card = {
                name: deck[card_idx],
                data: cardmap[deck[card_idx]]
            };
            gamestate.current_round = 1; 
            gamestate.start_timestamp = msgdata["gamedata"]["timestamp"];
        }
        else if (msgdata['message'] === 'nextround') {
            router.push('game');
            gamestate.current_round++;
            gamestate.start_timestamp = msgdata["gamedata"]["timestamp"];
        }
        else if (msgdata['message'] === 'resetgame') {
            router.push('/');
        }
        else {
            router.push('pregame');
            gamestate.num_rounds = msgdata["gamedata"]["num_rounds"];
        }
            
    }

    if (msgdata['roommates']) {
        gamestate.roommates = msgdata['roommates']
    }

    // emit an event so that we know the message came in
    window.dispatchEvent(wsEvent);
}

export function inflateCardset(cardset, num_players) {
    let inflated = ["president", "bomber"];
    let set = cardsets[cardset];
    inflated = inflated.concat(set.core)
    if (num_players % 2 !== 0) {
        inflated.push(set['extra']);
    }
    while (inflated.length < num_players) {
        inflated.push("blue_team");
        inflated.push("red_team");
    }

    return inflated;
}

import { useGameState } from "@/stores/gamestate";
import router from '@/router'
import cardmap from '@/cardmap'
import cardsets from '@/cardsets'

export const wsEvent = new Event('wsmessage');

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
        }
        else {
            router.push('pregame')
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

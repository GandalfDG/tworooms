import { useGameState } from "@/stores/gamestate";
import router from '@/router'

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

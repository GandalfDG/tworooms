import { useGameState } from "@/stores/gamestate";
export const wsEvent = new Event('wsmessage');

export function wsMessageListener(event) {
    // big-ish case statement here for different messages
    let gamestate = useGameState();
    let msgdata = JSON.parse(event.data);

    if (msgdata['playerlist']) {
        gamestate.playerlist = msgdata['playerlist']
    }

    console.log(msgdata)
    gamestate.playerdata = JSON.parse(msgdata);
    // emit an event so that we know the message came in
    window.dispatchEvent(wsEvent);
}

import { useGameState } from "@/stores/gamestate";
export const wsEvent = new Event('wsmessage');

export function wsMessageListener(event) {
    // big-ish case statement here for different messages
    let gamestate = useGameState();
    let msgdata = event.data;
    console.log(msgdata)
    gamestate.playerdata = JSON.parse(msgdata);
    // emit an event so that we know the message came in
    window.dispatchEvent(wsEvent);
}

export function setSessionCookie(session) {
    let cookie_str = "session=" + session + ";samesite=lax;"
    console.log(cookie_str)
    document.cookie = cookie_str
}
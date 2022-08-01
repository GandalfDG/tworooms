import { useGameState } from "./stores/gamestate";
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
    document.cookie = "session=" + session + ";samesite=lax;domain=" + import.meta.env.VITE_DOMAIN
}
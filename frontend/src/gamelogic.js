import { getBackendUrl } from "@/stores/gamestate"

export function wsMessageListener(event) {
    // big-ish case statement here for different messages
    let msgdata = event.data
    console.log(msgdata)
}

export function setSessionCookie(session) {
    let cookie_str = "session=" + session + ";samesite=lax;"
    console.log(cookie_str)
    document.cookie = cookie_str
}
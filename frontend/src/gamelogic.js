export function wsMessageListener(event) {
    // big-ish case statement here for different messages
    let msgdata = event.data
    console.log(msgdata)
}

export function setSessionCookie(session) {
    document.cookie = "session=" + session + ";samesite=none;secure=true;domain=" + import.meta.env.VITE_DOMAIN
}
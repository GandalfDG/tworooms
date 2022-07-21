export function wsMessageListener(message) {
    // big-ish case statement here for different messages
    let msgdata = message.data
    console.log(msgdata)
}
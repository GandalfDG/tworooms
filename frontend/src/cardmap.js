export default {
    president: {
        color: "blue",
        image: "president",
        description: "You are a primary character. Blue Team wins if you do not gain the \"dead\" condition.",
        summary: "avoid the bomber"
    },
    bomber: {
        color: "red",
        image: "bomber",
        description: "You are a primary character. Everyone in the same room as you at the end of the game gains the \"dead\" condition. Red Team wins if the President gains the \"dead\" condition.",
        summary: "be with the president"
    },
    blue_team: {
        color: "blue",
        image: "blue_team",
        description: "You are on the Blue Team. You win if the President does not gain the \"dead\" condition.",
        summary: "keep the president away from the bomber"
    },
    red_team: {
        color: "red",
        image: "red_team",
        description: "You are on the Red Team. You win if the President gains the \"dead\" condition.",
        summary: "get the bomber to be with the president"
    },
    gambler: {
        color: "grey",
        image: "gambler",
        description: "At the end of the last round, before all players reveal their cards, you must publicly announce which team (Red Team, Blue Team, or neither) you think won the game. Win only if you are correct.",
        summary: "guess if red, blue, or neither team won"
    }
}
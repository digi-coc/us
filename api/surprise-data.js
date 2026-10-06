// ============================================================
// SHRU & SHRAVYA
// Daily Surprise Data
// ============================================================

const TOTAL_DAYS = 365;


// ============================================================
// DAILY SURPRISES
// ============================================================

const dailySurprises = {

    // --------------------------------------------------------
    // DAY 1 — FIRST LETTER
    // --------------------------------------------------------

    1: {
        type: "letter",

        title: "A Little Letter For You ♡",

        description: "You found your first little surprise.",

        interaction: "letter",

        letter: {
            envelopeText: "For Shravya ♡",

            greeting: "Hey, my Shravya.",

            paragraphs: [
                "If you're reading this, then you've officially found the beginning of something I made just for you.",

                "I wanted there to be a little piece of me waiting for you every day. Some days will be silly. Some will be romantic. Some will make you laugh. Some might make you stop and stare at your screen for a while.",

                "But every single one is going to be something I chose for you.",

                "So don't rush through this little world. Come back tomorrow. And the day after that. And the day after that.",

                "Because this is only Day 1. ♡"
            ],

            signature: "Love,\nShru 🎀"
        },

        memory: {
            name: "Our First Letter",
            icon: "💌",
            color: "yellow"
        },

        preparation: null
    },


    // --------------------------------------------------------
    // DAY 2 — CHOOSE YOUR REWARD
    // --------------------------------------------------------

    2: {
        type: "choice",

        title: "Pick Your Tiny Reward ♡",

        description: "You get to choose what Shru owes you today.",

        interaction: "choice",

        choices: [
            {
                text: "💋 A Surprise Kiss",
                result: "Fineee. You picked a kiss. Come collect it. ♡"
            },

            {
                text: "🫂 A Very Long Hug",
                result: "Correct answer. You are officially trapped in my arms."
            },

            {
                text: "🍿 Your Favourite Snack",
                result: "Okay, snack it is. Your wish has been recorded. ♡"
            }
        ],

        memory: {
            name: "Tiny Reward",
            icon: "🎁",
            color: "yellow"
        },

        preparation: null
    },


    // --------------------------------------------------------
    // DAY 3 — VIRTUAL FLOWER
    // --------------------------------------------------------

    3: {
        type: "flower",

        title: "Something Is Growing For You 🌱",

        description: "Take care of your little flower.",

        interaction: "flower",

        flower: {
            type: "yellow-lily",

            name: "Our Little Lily",

            stages: [
                {
                    name: "Bud",
                    icon: "🌱",
                    message: "It's only just beginning..."
                },

                {
                    name: "Blooming",
                    icon: "🌷",
                    message: "Look! It's starting to open."
                },

                {
                    name: "Fully Bloomed",
                    icon: "🌼",
                    message: "You made it bloom. ♡"
                },

                {
                    name: "Drying",
                    icon: "🍂",
                    message: "Even beautiful things change."
                },

                {
                    name: "Preserved",
                    icon: "🌼",
                    message: "Now it gets to stay forever."
                }
            ]
        },

        memory: {
            name: "Our Little Lily",
            icon: "🌱",
            color: "yellow"
        },

        preparation: null
    },


    // --------------------------------------------------------
    // DAY 4 — HEART GAME
    // --------------------------------------------------------

    4: {
        type: "heart-game",

        title: "Catch My Hearts 💛",

        description: "Catch 10 hearts before they disappear.",

        interaction: "heart-game",

        game: {
            target: 10,
            message: "You caught all my hearts. ♡"
        },

        memory: {
            name: "10 Hearts",
            icon: "💛",
            color: "yellow"
        },

        preparation: null
    },


    // --------------------------------------------------------
    // DAY 5 — HUG COUPON
    // --------------------------------------------------------

    5: {
        type: "coupon",

        title: "You Have A Coupon ♡",

        description: "This one is actually redeemable.",

        interaction: "coupon",

        coupon: {
            title: "ONE FREE HUG",

            text: "Redeem whenever you want. No expiration date.",

            stamp: "VALID FOREVER"
        },

        memory: {
            name: "Hug Coupon",
            icon: "🫂",
            color: "yellow"
        },

        preparation: null
    },


    // --------------------------------------------------------
    // DAY 6 — MEMORY QUESTION
    // --------------------------------------------------------

    6: {
        type: "memory-question",

        title: "Do You Remember? 👀",

        description: "Let's see how well you remember us.",

        interaction: "memory-question",

        question: {
            text: "What do I secretly love about you?",

            options: [
                "Your smile",

                "The way you remember tiny things",

                "How you make me feel safe",

                "All of the above"
            ],

            correct: 3,

            correctMessage: "Okayyyy, someone knows his Shru. ♡",

            wrongMessage: "Hmmmm. Think about it again, Shravya. 👀"
        },

        memory: {
            name: "You Know Me",
            icon: "🧠",
            color: "yellow"
        },

        preparation: null
    },


    // --------------------------------------------------------
    // DAY 7 — REAL LIFE SURPRISE
    // --------------------------------------------------------

    7: {
        type: "real-life",

        title: "This One Leaves The Screen ♡",

        description: "Your surprise today exists in the real world.",

        interaction: "real-life",

        reward: {
            title: "A Little Something From Shru",

            message:
                "Today you get something from me in real life. You won't know exactly what it is until I give it to you. ♡",

            reveal:
                "Your only clue: I chose it because I thought of you."
        },

        memory: {
            name: "Real Life Surprise",
            icon: "🎁",
            color: "yellow"
        },

        preparation: {
            required: true,

            reminder:
                "Prepare today's real-life surprise before he opens this day.",

            note:
                "Choose a small snack, drink, tiny gift, handwritten note, or another personal surprise."
        }
    },


    // --------------------------------------------------------
    // DAY 8 — MUSIC
    // --------------------------------------------------------

    8: {
        type: "music",

        title: "Listen To This With Me 🎧",

        description: "Put your headphones on.",

        interaction: "music",

        music: {
            message:
                "Press play and stay here for a little while.",

            caption:
                "Some songs just feel like people."
        },

        memory: {
            name: "Our Song Moment",
            icon: "🎧",
            color: "yellow"
        },

        preparation: null
    },


    // --------------------------------------------------------
    // DAY 9 — PUZZLE
    // --------------------------------------------------------

    9: {
        type: "puzzle",

        title: "Solve This For Me 🧩",

        description: "A tiny puzzle before you get today's memory.",

        interaction: "puzzle",

        puzzle: {
            question:
                "What becomes more valuable the more you give it away?",

            answer:
                "love",

            hint:
                "You give it freely, but somehow you never run out.",

            success:
                "Exactly. And I have a lot of that for you. ♡"
        },

        memory: {
            name: "Little Puzzle",
            icon: "🧩",
            color: "yellow"
        },

        preparation: null
    },


    // --------------------------------------------------------
    // DAY 10 — DATE CHOICE
    // --------------------------------------------------------

    10: {
        type: "date-choice",

        title: "Choose Our Next Little Date ♡",

        description: "You decide what we should do.",

        interaction: "date-choice",

        choices: [
            {
                text: "🍿 Movie Night",
                result: "Movie night it is. You pick the movie."
            },

            {
                text: "🍜 Food Date",
                result: "Food date locked. Now we just need to decide what we're eating."
            },

            {
                text: "🎸 Music Date",
                result: "Music date. I'll bring the guitar. ♡"
            },

            {
                text: "🌙 Late Night Walk",
                result: "A quiet little walk together. Deal."
            }
        ],

        memory: {
            name: "Our Next Date",
            icon: "💑",
            color: "yellow"
        },

        preparation: {
            required: true,

            reminder:
                "Once he chooses the date, remember what he picked so you can actually plan it."
        }
    }

};


// ============================================================
// FALLBACK DAYS
// ============================================================
//
// This makes sure that Day 11–365 are NEVER empty.
// We can replace these one by one with special surprises later.
// ============================================================

function getFallbackSurprise(day) {

    const fallbackTypes = [
        {
            title: "A Tiny Reminder ♡",
            description: "You made it another day.",

            interaction: "future",

            message:
                "I don't need a special reason to remind you that I love you.",

            icon: "💛",

            memoryName: "Tiny Reminder"
        },

        {
            title: "Panda Says Hi 🐼",

            description:
                "Your little panda came to check on you.",

            interaction: "future",

            message:
                "The panda says you're loved. I agree with the panda.",

            icon: "🐼",

            memoryName: "Panda Visit"
        },

        {
            title: "A Little Kiss 💋",

            description:
                "This one is very simple.",

            interaction: "future",

            message:
                "Consider this your digital kiss until I can give you a real one.",

            icon: "💋",

            memoryName: "Little Kiss"
        },

        {
            title: "You Are My Favourite Person ♡",

            description:
                "No game today. Just facts.",

            interaction: "future",

            message:
                "Out of all the people in this giant world, somehow I got lucky enough to find you.",

            icon: "💛",

            memoryName: "Favourite Person"
        },

        {
            title: "Panda Delivery 📦",

            description:
                "Something tiny has arrived.",

            interaction: "future",

            message:
                "Your package contains one unlimited supply of affection.",

            icon: "📦",

            memoryName: "Panda Delivery"
        }
    ];

    const selected =
        fallbackTypes[(day - 11) % fallbackTypes.length];

    return {
        type: "future",

        title: selected.title,

        description: selected.description,

        interaction: selected.interaction,

        message: selected.message,

        memory: {
            name: selected.memoryName,

            icon: selected.icon,

            color: "yellow"
        },

        preparation: null
    };
}


// ============================================================
// GET SURPRISE FOR A DAY
// ============================================================

function getSurpriseForDay(day) {

    if (dailySurprises[day]) {
        return dailySurprises[day];
    }

    return getFallbackSurprise(day);
}


// ============================================================
// HELPER — CHECK IF A DAY HAS CUSTOM CONTENT
// ============================================================

function hasCustomSurprise(day) {

    return Boolean(dailySurprises[day]);
}


// ============================================================
// HELPER — GET PREPARATION INFORMATION
// ============================================================

function getPreparationForDay(day) {

    const surprise = getSurpriseForDay(day);

    return surprise.preparation || null;
}
module.exports = {
    getSurpriseForDay,
    hasCustomSurprise,
    getPreparationForDay
};
// ============================================================
// SHRU & SHRAVYA
// DAILY SURPRISE DATA
// ============================================================

const TOTAL_DAYS = 365;

const dailySurprises = {

    // ========================================================
    // DAY 1 — FIRST LETTER
    // ========================================================

    1: {
        type: "letter",
        title: "A Little Letter For You ♡",
        description: "You found your first little surprise.",
        interaction: "letter",

        letter: {
            envelopeText: "For Shravya ♡",
            greeting: "Hey, my Shravya.",

            paragraphs: [
                "If you're reading this, you've officially found the beginning of something I made just for you.",

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


    // ========================================================
    // DAY 2 — CHOICE
    // ========================================================

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


    // ========================================================
    // DAY 3 — VIRTUAL YELLOW LILY
    // ========================================================

    3: {
        type: "flower",
        title: "Something Is Growing For You 🌱",
        description: "Take care of your little flower.",
        interaction: "flower",

        // The current renderer uses flower.stage.
        flower: {
            type: "yellow-lily",
            stage: "bud",
            name: "Our Little Lily",
            description: "A tiny yellow lily that will grow with us."
        },

        memory: {
            name: "Our Little Lily",
            icon: "🌱",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 4 — HEART GAME
    // ========================================================

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


    // ========================================================
    // DAY 5 — HUG COUPON
    // ========================================================

    5: {
        type: "coupon",
        title: "You Have A Coupon ♡",
        description: "This one is actually redeemable.",
        interaction: "coupon",

        coupon: {
            title: "ONE FREE HUG",
            description: "Redeem whenever you want. No expiration date."
        },

        memory: {
            name: "Hug Coupon",
            icon: "🫂",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 6 — MEMORY QUESTION
    // ========================================================

    6: {
        type: "memory-question",
        title: "Do You Remember? 👀",
        description: "Let's see how well you remember us.",
        interaction: "memory-question",

        question: "What do I secretly love about you?",

        choices: [
            "Your smile",
            "The way you remember tiny things",
            "How you make me feel safe",
            "All of the above"
        ],

        correctIndex: 3,

        memory: {
            name: "You Know Me",
            icon: "🧠",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 7 — REAL LIFE SURPRISE
    // ========================================================

    7: {
        type: "real-life",
        title: "This One Leaves The Screen ♡",
        description: "Your surprise today exists in the real world.",
        interaction: "real-life",

        icon: "🎁",

        reward: "A Little Something From Shru",

        message:
            "Today you get something from me in real life. You won't know exactly what it is until I give it to you. ♡",

        clue:
            "Your only clue: I chose it because I thought of you.",

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


    // ========================================================
    // DAY 8 — MUSIC
    // ========================================================

    8: {
        type: "music",
        title: "Listen To This With Me 🎧",
        description: "Put your headphones on.",
        interaction: "music",

        message:
            "Press play and stay here for a little while.",

        caption:
            "Some songs just feel like people.",

        memory: {
            name: "Our Song Moment",
            icon: "🎧",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 9 — PUZZLE
    // ========================================================

    9: {
        type: "puzzle",
        title: "Solve This For Me 🧩",
        description: "One tiny question before your surprise is unlocked.",
        interaction: "puzzle",

        question:
            "What becomes more valuable the more you give it away?",

        answer: "love",

        hint:
            "You give it freely, but somehow you never run out.",

        success:
            "Exactly. And I have a lot of that for you. ♡",

        memory: {
            name: "Solved Puzzle",
            icon: "🧩",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 10 — DATE CHOICE
    // ========================================================

    10: {
        type: "date-choice",
        title: "Choose Our Next Date 💑",
        description: "You pick. I'll make it happen.",
        interaction: "date-choice",

        choices: [
            {
                label: "🎬 Movie Date",
                result: "Movie date locked in. You pick the movie. ♡"
            },
            {
                label: "🍜 Food Date",
                result: "Food date locked in. Now I just need to know what we're eating."
            },
            {
                label: "🎸 Music Date",
                result: "Music date locked in. I'll bring the guitar."
            },
            {
                label: "🌙 Late Night Walk",
                result: "A quiet little walk together. Deal. ♡"
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
    },


    // ========================================================
    // DAY 11 — HIDDEN PANDA
    // ========================================================

    11: {
        type: "heart-game",
        title: "Find The Sneaky Panda 🐼",
        description: "Catch the little visitor hiding in your surprise.",
        interaction: "heart-game",

        game: {
            target: 1,
            message:
                "You found him! And he brought you one ridiculous compliment: you're annoyingly adorable. ♡"
        },

        memory: {
            name: "Sneaky Panda",
            icon: "🐼",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 12 — PHOTO MEMORY
    // ========================================================

    12: {
        type: "future",
        title: "One Picture I Secretly Love 📸",
        description: "There's one picture of us I keep coming back to.",
        interaction: "future",

        message:
            "Some pictures are pretty. Some pictures just feel like us. This is one of those.",

        icon: "📸",

        memory: {
            name: "A Picture I Love",
            icon: "📸",
            color: "yellow"
        },

        preparation: {
            required: true,
            reminder:
                "Choose one picture of the two of you before he opens this day.",
            note:
                "You can add the chosen photo to the site later."
        }
    },


    // ========================================================
    // DAY 13 — MEMORY REVEAL
    // ========================================================

    13: {
        type: "letter",
        title: "Before You Knew ♡",
        description: "Three things I noticed about you before you knew I liked you.",
        interaction: "letter",

        letter: {
            envelopeText: "Things I Noticed ♡",
            greeting: "You probably didn't know I was paying attention.",

            paragraphs: [
                "I noticed how seriously you took the things you cared about.",

                "I noticed the tiny ways you tried to help people without making a big deal about it.",

                "And I noticed how easily you could make me smile without even trying.",

                "You were becoming important to me before I had fully admitted it to myself."
            ],

            signature: "Shru 🎀"
        },

        memory: {
            name: "Before You Knew",
            icon: "👀",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 14 — GUITAR SURPRISE
    // ========================================================

    14: {
        type: "music",
        title: "Play Something For Me 🎸",
        description: "A tiny reminder of something that belongs to us now.",
        interaction: "music",

        message:
            "One day I'm going to learn something just because it reminds me of you.",

        caption:
            "Until then, this guitar has officially become part of our little story. ♡",

        memory: {
            name: "Guitar Moment",
            icon: "🎸",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 15 — KISS COUPON
    // ========================================================

    15: {
        type: "coupon",
        title: "Official Kiss Coupon 💋",
        description: "Yes. This one is absolutely redeemable.",
        interaction: "coupon",

        coupon: {
            title: "ONE FREE KISS",
            description:
                "Redeem whenever you want. No expiry. No complicated terms."
        },

        memory: {
            name: "Kiss Coupon",
            icon: "💋",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 16 — RIDICULOUSLY CUTE
    // ========================================================

    16: {
        type: "letter",
        title: "Things You Do That Are Ridiculously Cute ♡",
        description: "You probably don't even realise you do them.",
        interaction: "letter",

        letter: {
            envelopeText: "You Have No Idea ♡",
            greeting: "You are accidentally adorable.",

            paragraphs: [
                "The way you remember tiny things I said.",

                "The way you try to make sure I'm okay without making it dramatic.",

                "The little expressions you make when you're concentrating.",

                "And the way you somehow make ordinary moments feel like something I want to remember."
            ],

            signature: "Your very biased Shru 🎀"
        },

        memory: {
            name: "Ridiculously Cute",
            icon: "🥹",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 17 — THREE TINY TASKS
    // ========================================================

    17: {
        type: "heart-game",
        title: "Panda Delivery Mission 🐼",
        description: "Complete the tiny mission and your panda delivers the package.",
        interaction: "heart-game",

        game: {
            target: 3,
            message:
                "MISSION COMPLETE. The panda approves of you. 📦🐼"
        },

        memory: {
            name: "Panda Mission",
            icon: "📦",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 18 — HANDWRITTEN LETTER
    // ========================================================

    18: {
        type: "real-life",
        title: "This One Is On Paper ♡",
        description: "Some things deserve handwriting.",
        interaction: "real-life",

        icon: "✉️",

        reward:
            "A Handwritten Letter From Shru",

        message:
            "There is a real letter waiting for you today. Not typed. Not digital. Something I actually wrote with my own hands.",

        clue:
            "When you get it, keep it somewhere safe.",

        memory: {
            name: "Handwritten Letter",
            icon: "✉️",
            color: "yellow"
        },

        preparation: {
            required: true,
            reminder:
                "Write and prepare his physical handwritten letter before he opens Day 18."
        }
    },


    // ========================================================
    // DAY 19 — 19 THINGS I LOVE
    // ========================================================

    19: {
        type: "love-cards",
        title: "19 Things I Love About You ♡",
        description: "Open the little cards one choice at a time.",
        interaction: "choice",

        choices: [
            {
                text: "♡ The way you care",
                result: "That's number one. You care more than you realise."
            },
            {
                text: "♡ Your patience",
                result: "You make difficult things feel easier."
            },
            {
                text: "♡ Your stupid little smiles",
                result: "Yes. Especially those."
            },
            {
                text: "♡ The way you remember things",
                result: "You make me feel seen."
            },
            {
                text: "♡ The way you love me",
                result: "And that's the one I could never fit into one card. ♡"
            }
        ],

        memory: {
            name: "19 Things",
            icon: "💛",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 20 — SNACK / DRINK COUPON
    // ========================================================

    20: {
        type: "real-life",
        title: "Pick Something You Want 🍿",
        description: "Today I'm buying you a little something.",
        interaction: "real-life",

        icon: "🍿",

        reward:
            "One Snack Or Drink Of Your Choice",

        message:
            "Choose the snack or drink you want and send me your verdict. Today, that's on me. ♡",

        clue:
            "No overthinking. Pick something you actually want.",

        memory: {
            name: "Snack Date",
            icon: "🍿",
            color: "yellow"
        },

        preparation: {
            required: true,
            reminder:
                "Be ready to get the snack or drink he chooses."
        }
    },


    // ========================================================
    // DAY 21 — SECOND VIRTUAL FLOWER
    // ========================================================

    21: {
        type: "flower",
        title: "Another Little Flower 🌼",
        description: "Our collection is growing.",
        interaction: "flower",

        flower: {
            type: "yellow-flower",
            stage: "bloom",
            name: "Our Second Flower",
            description:
                "One more little bloom for the world we're building together."
        },

        memory: {
            name: "Second Flower",
            icon: "🌼",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 22 — WHO SAID / DID THIS?
    // ========================================================

    22: {
        type: "memory-question",
        title: "Who Said That? 👀",
        description: "Let's see if you remember our little moments.",
        interaction: "memory-question",

        question:
            "Who was more likely to turn a normal moment into something romantic?",

        choices: [
            "Shru",
            "Shravya",
            "Both of us",
            "Neither of us"
        ],

        correctIndex: 2,

        memory: {
            name: "Who Said That?",
            icon: "👀",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 23 — MYSTERY BOX
    // ========================================================

    23: {
        type: "mystery-box",
        title: "Mystery Box 📦",
        message: "Something tiny is hiding inside.",
        interaction: "mystery-box",

        collectibleIcon: "🔑",

reveal:
    "You found the little golden key to our world. Keep it safe. ♡",

        memory: {
            name: "Golden Mystery Key",
            icon: "🔑",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 24 — OPEN WHEN YOU MISS ME
    // ========================================================

    24: {
        type: "letter",
        title: "Open When You Miss Me 💌",
        description: "You can come back to this one whenever you need it.",
        interaction: "letter",

        letter: {
            envelopeText: "Open When You Miss Me ♡",
            greeting: "Hey, you.",

            paragraphs: [
                "If you're here because you miss me, come a little closer through this screen.",

                "Imagine me sitting beside you, stealing your attention, bothering you for no reason and then pretending I wasn't doing anything.",

                "Whatever kind of day you're having, you don't have to make yourself feel okay immediately.",

                "Just remember that somewhere in my little world, there is a person who is very, very happy that you exist.",

                "And yes. I miss you too. ♡"
            ],

            signature: "Love,\nShru 🎀"
        },

        memory: {
            name: "Open When You Miss Me",
            icon: "💌",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 25 — FIRST BIG SURPRISE
    // ========================================================

    25: {
        type: "timeline",
        title: "Our First Big Memory ♡",
        description: "Look how far we've already come.",
        interaction: "letter",

        letter: {
            envelopeText: "25 Days ♡",
            greeting: "Twenty-five days.",

            paragraphs: [
                "Day 1 started with one little letter.",

                "Then came choices, games, tiny rewards, flowers, memories, ridiculous compliments and all the little things in between.",

                "Every day wasn't supposed to be perfect. It was supposed to be ours.",

                "And now you've made it to the first big checkpoint.",

                "So here's your special reminder: this little world is only getting started.",

                "Happy Day 25, my Shravya. ♡"
            ],

            signature: "Still choosing you,\nShru 🎀"
        },

        memory: {
            name: "25 Day Milestone",
            icon: "🏆",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 26 — CHOOSE MY MOOD
    // ========================================================

    26: {
        type: "choice",
        title: "Choose My Mood Today 💛",
        description: "Pick one and see what you unlock.",
        interaction: "choice",

        choices: [
            {
                text: "🎀 Soft Shru",
                result: "Soft Shru says: come here, I want a hug."
            },
            {
                text: "😈 Menace Shru",
                result: "Menace Shru says: congratulations, you've been chosen for bullying."
            },
            {
                text: "🥹 Emotional Shru",
                result: "Emotional Shru says: I really, really love you."
            },
            {
                text: "💋 Flirty Shru",
                result: "Flirty Shru says: come closer and find out."
            }
        ],

        memory: {
            name: "Shru's Mood",
            icon: "🎀",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 27 — SECRET COMPLIMENT VAULT
    // ========================================================

    27: {
        type: "compliment-vault",
        title: "Secret Compliment Vault 🔐",
        description: "Find 5 hidden keys to unlock the vault.",
        interaction: "compliment-vault",

        game: {
            target: 5,
            message:
                "VAULT OPEN. Five compliments for you: handsome, kind, safe, adorable and completely mine to love. ♡"
        },

        memory: {
            name: "Compliment Vault",
            icon: "🔐",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 28 — TINY DATE NIGHT
    // ========================================================

    28: {
        type: "picnic",
title: "Build Our Tiny Date Night 🌙",
description: "Drag everything into place and make our little date night.",
interaction: "picnic",

        choices: [
            {
                text: "🧺 Picnic Blanket",
                result: "Blanket down. Now come sit beside me."
            },
            {
                text: "🍓 Tiny Snacks",
                result: "Snacks secured. You know I was going to steal half."
            },
            {
                text: "🎵 Music",
                result: "Music on. Now the date officially starts."
            },
            {
                text: "🌙 Fairy Lights",
                result: "Lights on. Okay... this is actually really cute."
            }
        ],

        memory: {
            name: "Tiny Date Night",
            icon: "🧺",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 29 — YOU MADE MY LIFE BETTER
    // ========================================================

    29: {
        type: "letter",
        title: "You Made My Life Better ♡",
        description: "Five things I want you to know.",
        interaction: "letter",

        letter: {
            envelopeText: "Five Reasons ♡",
            greeting: "I don't say all of these things enough.",

            paragraphs: [
                "You make ordinary days feel less ordinary.",

                "You make me feel cared for in ways I didn't know I needed.",

                "You make me laugh when I really don't feel like laughing.",

                "You make me want to create little things just so I can watch you discover them.",

                "And somehow, having you in my life makes the future feel a little more exciting."
            ],

            signature: "Thank you for being you.\nShru 🎀"
        },

        memory: {
            name: "You Made My Life Better",
            icon: "💛",
            color: "yellow"
        },

        preparation: null
    },


    // ========================================================
    // DAY 30 — MONTH ONE FINALE
    // ========================================================

    30: {
        type: "real-life",
        title: "MONTH ONE FINALE 🎁",
        description: "You made it through the first month.",
        interaction: "real-life",

        icon: "🏆",

        reward:
            "Your Month One Surprise",

        message:
            "Thirty days of tiny surprises, memories, games, letters and little pieces of us. And now there's one more reward waiting in the real world.",

        clue:
            "You won't know exactly what it is until Shru gives it to you. ♡",

        memory: {
            name: "Month One Finale",
            icon: "🏆",
            color: "yellow"
        },

        preparation: {
            required: true,
            reminder:
                "Prepare the Month One finale reward before he opens Day 30.",
            note:
                "Choose a special personal reward or date-related surprise."
        }
    }

};


// ============================================================
// FALLBACK DAYS 31–365
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
            description: "Your little panda came to check on you.",
            interaction: "future",
            message:
                "The panda says you're loved. I agree with the panda.",
            icon: "🐼",
            memoryName: "Panda Visit"
        },

        {
            title: "A Little Kiss 💋",
            description: "This one is very simple.",
            interaction: "future",
            message:
                "Consider this your digital kiss until I can give you a real one.",
            icon: "💋",
            memoryName: "Little Kiss"
        },

        {
            title: "You Are My Favourite Person ♡",
            description: "No game today. Just facts.",
            interaction: "future",
            message:
                "Out of all the people in this giant world, somehow I got lucky enough to find you.",
            icon: "💛",
            memoryName: "Favourite Person"
        },

        {
            title: "Panda Delivery 📦",
            description: "Something tiny has arrived.",
            interaction: "future",
            message:
                "Your package contains one unlimited supply of affection.",
            icon: "📦",
            memoryName: "Panda Delivery"
        }
    ];

    const selected =
        fallbackTypes[(day - 31) % fallbackTypes.length];

    return {
        type: "future",
        title: selected.title,
        description: selected.description,
        interaction: selected.interaction,
        message: selected.message,
        icon: selected.icon,

        memory: {
            name: selected.memoryName,
            icon: selected.icon,
            color: "yellow"
        },

        preparation: null
    };
}


// ============================================================
// GET SURPRISE
// ============================================================

function getSurpriseForDay(day) {

    if (dailySurprises[day]) {
        return dailySurprises[day];
    }

    return getFallbackSurprise(day);
}


// ============================================================
// HELPERS
// ============================================================

function hasCustomSurprise(day) {
    return Boolean(dailySurprises[day]);
}


function getPreparationForDay(day) {

    const surprise =
        getSurpriseForDay(day);

    return surprise.preparation || null;
}


// ============================================================
// SERVER EXPORT
// ============================================================

module.exports = {
    getSurpriseForDay,
    hasCustomSurprise,
    getPreparationForDay
};
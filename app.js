/* ============================================================
   SHRU & SHRAVYA
   Main Website Logic
============================================================ */


/* ============================================================
   STORAGE
============================================================ */

const STORAGE_KEYS = {
    startDate: "shruShravya_startDate",
    memories: "shruShravya_memories",
    completedDays: "shruShravya_completedDays",
    musicEnabled: "shruShravya_musicEnabled"
};


/* ============================================================
   HTML ELEMENTS
============================================================ */

const homeScreen =
    document.getElementById("homeScreen");

const surpriseScreen =
    document.getElementById("surpriseScreen");

const portalScreen =
    document.getElementById("portalScreen");

const memoryScreen =
    document.getElementById("memoryScreen");


const present =
    document.getElementById("present");

const openSurpriseButton =
    document.getElementById("openSurpriseButton");

const completeSurpriseButton =
    document.getElementById("completeSurpriseButton");

const backHomeButton =
    document.getElementById("backHomeButton");

const memoryBoxButton =
    document.getElementById("memoryBoxButton");

const musicToggle =
    document.getElementById("musicToggle");


const dayNumber =
    document.getElementById("dayNumber");

const countdownTimer =
    document.getElementById("countdownTimer");

const surpriseTitle =
    document.getElementById("surpriseTitle");

const surpriseDescription =
    document.getElementById("surpriseDescription");

const surpriseContent =
    document.getElementById("surpriseContent");


const memoryObjectPreview =
    document.getElementById("memoryObjectPreview");

const memoryBox =
    document.getElementById("memoryBox");

const emptyMemoryMessage =
    document.getElementById("emptyMemoryMessage");


const backgroundMusic =
    document.getElementById("backgroundMusic");


/* ============================================================
   CURRENT STATE
============================================================ */

let currentDay = 1;
let currentSurprise = null;

let isPresentOpening = false;

let countdownInterval = null;
let dayCheckInterval = null;

let viewingOldMemory = false;


/* ============================================================
   INDIA DATE / TIME
============================================================ */

function getIndiaDate() {

    const formatter =
        new Intl.DateTimeFormat(
            "en-CA",
            {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }
        );

    return formatter.format(new Date());
}


function dateToUTC(dateString) {

    const parts =
        dateString
            .split("-")
            .map(Number);

    return Date.UTC(
        parts[0],
        parts[1] - 1,
        parts[2]
    );
}


/* ============================================================
   FIRST VISIT
============================================================ */

function initializeStartDate() {

    let startDate =
        localStorage.getItem(
            STORAGE_KEYS.startDate
        );

    if (!startDate) {

        startDate = getIndiaDate();

        localStorage.setItem(
            STORAGE_KEYS.startDate,
            startDate
        );
    }

    return startDate;
}


/* ============================================================
   CALCULATE CURRENT DAY
============================================================ */

function calculateCurrentDay() {

    const startDate =
        initializeStartDate();

    const today =
        getIndiaDate();

    const difference =
        Math.floor(
            (
                dateToUTC(today) -
                dateToUTC(startDate)
            ) /
            (1000 * 60 * 60 * 24)
        );

    return Math.min(
        Math.max(
            difference + 1,
            1
        ),
        365
    );
}


/* ============================================================
   DAY DISPLAY
============================================================ */

function updateDayDisplay() {

    currentDay =
        calculateCurrentDay();

    if (dayNumber) {

        dayNumber.textContent =
            String(currentDay)
                .padStart(3, "0");
    }
}


/* ============================================================
   COUNTDOWN TO INDIA MIDNIGHT
============================================================ */

function getMillisecondsUntilMidnightIST() {

    const now = new Date();

    const indiaParts =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Asia/Kolkata",
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false
            }
        ).formatToParts(now);

    const values = {};

    indiaParts.forEach(part => {

        if (part.type !== "literal") {

            values[part.type] =
                Number(part.value);
        }
    });

    const currentIndiaSeconds =
        (values.hour * 3600) +
        (values.minute * 60) +
        values.second;

    const secondsRemaining =
        (24 * 60 * 60) -
        currentIndiaSeconds;

    return secondsRemaining * 1000;
}


function updateCountdown() {

    if (!countdownTimer) {
        return;
    }

    const milliseconds =
        getMillisecondsUntilMidnightIST();

    const totalSeconds =
        Math.max(
            0,
            Math.floor(milliseconds / 1000)
        );

    const hours =
        Math.floor(totalSeconds / 3600);

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;

    countdownTimer.textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;
}


/* ============================================================
   SCREEN CONTROL
============================================================ */

function showScreen(screen) {

    const screens = [
        homeScreen,
        surpriseScreen,
        portalScreen,
        memoryScreen
    ];

    screens.forEach(item => {

        if (item === screen) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ============================================================
   LOAD TODAY'S SURPRISE
============================================================ */

async function loadCurrentSurprise() {

    currentDay = calculateCurrentDay();

    try {

        const response = await fetch(
            `/api/surprise?day=${currentDay}`
        );

        if (!response.ok) {
            throw new Error("Could not load today's surprise.");
        }

        const data = await response.json();

        currentDay = data.day;
        currentSurprise = data.surprise;

        surpriseTitle.textContent =
            currentSurprise.title ||
            "A Little Surprise ♡";

        surpriseDescription.textContent =
            currentSurprise.description ||
            "";

        renderSurprise(
            currentSurprise
        );

        updateCompletionButton();

    } catch (error) {

        console.error(
            "Surprise loading error:",
            error
        );

        surpriseTitle.textContent =
            "Oops... ♡";

        surpriseDescription.textContent =
            "Your surprise is hiding right now. Try again in a moment.";

        surpriseContent.innerHTML = "";

    }
}


/* ============================================================
   COMPLETED DAYS
============================================================ */

function getCompletedDays() {

    return (
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.completedDays
            )
        ) || []
    );
}


function isDayCompleted(day) {

    return getCompletedDays()
        .includes(day);
}


function saveCompletedDay(day) {

    const completedDays =
        getCompletedDays();

    if (!completedDays.includes(day)) {

        completedDays.push(day);

        localStorage.setItem(
            STORAGE_KEYS.completedDays,
            JSON.stringify(completedDays)
        );
    }
}


/* ============================================================
   COMPLETION BUTTON
============================================================ */

function updateCompletionButton() {

    if (!completeSurpriseButton) {
        return;
    }

    if (viewingOldMemory) {

        completeSurpriseButton.classList.add(
            "hidden"
        );

        return;
    }

    const completed =
        isDayCompleted(currentDay);

    if (completed) {

        completeSurpriseButton.textContent =
            "ALREADY SAVED ♡";

        completeSurpriseButton.disabled =
            true;

        completeSurpriseButton.classList.remove(
            "hidden"
        );

    } else {

        completeSurpriseButton.textContent =
            "I FOUND IT ♡";

        completeSurpriseButton.disabled =
            false;

        completeSurpriseButton.classList.remove(
            "hidden"
        );
    }
}


/* ============================================================
   OPEN PRESENT
============================================================ */

function openPresent() {

    if (isPresentOpening) {
        return;
    }

    if (isDayCompleted(currentDay)) {

        loadCurrentSurprise();

        showScreen(
            surpriseScreen
        );

        return;
    }

    isPresentOpening = true;

    present.classList.add(
        "opening"
    );

    setTimeout(() => {

        present.classList.remove(
            "opening"
        );

        isPresentOpening = false;

        loadCurrentSurprise();

        showScreen(
            surpriseScreen
        );

    }, 900);
}


/* ============================================================
   SURPRISE RENDERER
============================================================ */

function renderSurprise(surprise) {

    surpriseContent.innerHTML = "";

    switch (surprise.type) {
case "timeline":
    renderTimeline(surprise);
    break;
        case "letter":
            renderLetter(surprise);
            break;

        case "choice":
        case "date-choice":
            renderChoice(surprise);
            break;

        case "flower":
            renderFlower(surprise);
            break;

        case "compliment-vault":
    renderComplimentVault(surprise);
    break;

case "picnic":
    renderPicnic(surprise);
    break;
        case "heart-game":
            renderHeartGame(surprise);
            break;

        case "coupon":
            renderCoupon(surprise);
            break;

        case "memory-question":
            renderMemoryQuestion(surprise);
            break;

        case "real-life":
            renderRealLife(surprise);
            break;

        case "music":
            renderMusicSurprise(surprise);
            break;

        case "puzzle":
            renderPuzzle(surprise);
            break;

       case "love-cards":
    renderLoveCards(surprise);
    break;

case "mystery-box":
    renderMysteryBox(surprise);
    break;

default:
    renderFutureSurprise(surprise);
    break;
    }
}


/* ============================================================
   HELPER: CREATE BUTTON
============================================================ */

function createButton(text, callback) {

    const button =
        document.createElement("button");

    button.type = "button";
    button.textContent = text;

    button.addEventListener(
        "click",
        callback
    );

    return button;
}


/* ============================================================
   DAY 1 — LETTER
============================================================ */

function renderLetter(surprise) {
    surpriseContent.innerHTML = `
        <div class="letter-surprise">
            <div class="letter-envelope" id="letterEnvelope">
                💌
            </div>

            <h3>${surprise.title || "Things You Do That Are Ridiculously Cute ♡"}</h3>

            <button class="surprise-action" id="openLetterButton">
                Open my letter 💌
            </button>

            <div id="letterContent" class="letter-content">
                ${surprise.message || surprise.description || "I wrote this just for you. ♡"}
            </div>
        </div>
    `;

    const envelope = document.getElementById("letterEnvelope");
    const button = document.getElementById("openLetterButton");
    const letterContent = document.getElementById("letterContent");

    letterContent.style.display = "none";

    button.addEventListener("click", () => {
        envelope.classList.add("letter-open");

        letterContent.style.display = "block";

        button.textContent = "Letter opened ♡";
        button.disabled = true;

        completeSurpriseButton.disabled = false;
    });

    completeSurpriseButton.disabled = true;
}
/* ============================================================
   CHOICE SURPRISE
============================================================ */

function renderChoice(surprise) {
    const choices = surprise.choices || [];

    surpriseContent.innerHTML = `
        <div class="choice-surprise">
            <div class="choice-icon">💌</div>

            <h3>${surprise.title || "Choose my mood ♡"}</h3>

            <div class="choice-options">
                ${choices.map((choice, index) => `
                    <button
                        class="choice-option"
                        data-index="${index}"
                    >
                        ${choice.label || choice.text || `Choice ${index + 1}`}
                    </button>
                `).join("")}
            </div>

            <div id="choiceResult" class="mini-message"></div>
        </div>
    `;

    const buttons = document.querySelectorAll(".choice-option");
    const result = document.getElementById("choiceResult");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);
            const selected = choices[index];

            buttons.forEach(item => {
                item.disabled = true;
            });

            button.classList.add("selected");

            result.textContent =
                selected.result || "Okay, it's a date! ♡";

            completeSurpriseButton.disabled = false;
        });
    });

    completeSurpriseButton.disabled = true;
}

/* ============================================================
   FLOWER
============================================================ */
function renderFlower(surprise) {
    const flower = surprise.flower || {};

    surpriseContent.innerHTML = `
        <div class="flower-surprise">
            <div class="flower-bud" id="flowerBud">🌱</div>

            <h3>${flower.name || "Our Little Flower"}</h3>

            <p>${flower.description || "Something small that will grow with us. ♡"}</p>

            <button class="surprise-action" id="growFlowerButton">
                Help it bloom 🌼
            </button>

            <div id="flowerMessage" class="mini-message"></div>
        </div>
    `;

    const growButton = document.getElementById("growFlowerButton");
    const flowerBud = document.getElementById("flowerBud");
    const flowerMessage = document.getElementById("flowerMessage");

    growButton.addEventListener("click", () => {
        flowerBud.textContent = "🌼";
        flowerBud.classList.add("flower-bloom");

        flowerMessage.textContent =
            "Look at our little flower. It started tiny, just like us. ♡";

        growButton.textContent = "It bloomed! 🌼";
        growButton.disabled = true;

        completeSurpriseButton.disabled = false;
    });

    completeSurpriseButton.disabled = true;
}

/* ============================================================
   HEART GAME
============================================================ */

function renderHeartGame(surprise) {
    surpriseContent.innerHTML = `
        <div class="heart-game">
            <div class="game-icon">💛</div>

            <h3>Catch 10 hearts!</h3>
            <p>Click every heart before it disappears. 👀</p>

            <div id="heartGameArea" class="heart-game-area"></div>

            <div id="heartGameStatus" class="mini-message">
                Hearts caught: 0 / 10
            </div>
        </div>
    `;

    const area = document.getElementById("heartGameArea");
    const status = document.getElementById("heartGameStatus");

    let caught = 0;

    function createHeart() {
        if (caught >= 10) return;

        const heart = document.createElement("button");
        heart.textContent = "💛";
        heart.className = "game-heart";

        heart.style.left = `${Math.random() * 80 + 5}%`;
        heart.style.top = `${Math.random() * 70 + 5}%`;

        heart.addEventListener("click", () => {
            caught++;

            heart.remove();

            status.textContent =
                `Hearts caught: ${caught} / 10`;

            if (caught >= 10) {
                status.textContent =
                    "You caught all my hearts. 🥹💛";

                completeSurpriseButton.disabled = false;
            } else {
                createHeart();
            }
        });

        area.appendChild(heart);
    }

    completeSurpriseButton.disabled = true;

    for (let i = 0; i < 3; i++) {
        createHeart();
    }
}

/* ============================================================
   COUPON
============================================================ */

function renderCoupon(surprise) {
    const coupon = surprise.coupon || {};

    surpriseContent.innerHTML = `
        <div class="coupon-card">
            <div class="coupon-icon">${coupon.icon || "🎟️"}</div>

            <h3>${coupon.title || "A Little Coupon For You"}</h3>

            <p>${coupon.description || "Redeem this whenever you want. ♡"}</p>

            <button class="surprise-action" id="revealCouponButton">
                Open Coupon 💌
            </button>

            <div id="couponReveal" class="mini-message"></div>
        </div>
    `;

    const revealButton = document.getElementById("revealCouponButton");
    const couponReveal = document.getElementById("couponReveal");

    revealButton.addEventListener("click", () => {
        couponReveal.textContent =
            "Officially approved by Shru. Valid whenever you need a little love. ♡";

        revealButton.textContent = "Coupon opened! 💛";
        revealButton.disabled = true;

        completeSurpriseButton.disabled = false;
    });

    completeSurpriseButton.disabled = true;
}


/* ============================================================
   MEMORY QUESTION
============================================================ */

function renderMemoryQuestion(surprise) {
    const question = surprise.question || "";
    const choices = surprise.choices || [];
    const correctIndex = surprise.correctIndex;

    surpriseContent.innerHTML = `
        <div class="memory-question">
            <div class="question-icon">💭</div>

            <h3>${question}</h3>

            <div class="question-options" id="questionOptions">
                ${choices.map((choice, index) => `
                    <button class="question-option" data-index="${index}">
                        ${choice}
                    </button>
                `).join("")}
            </div>

            <div id="questionResult" class="mini-message"></div>
        </div>
    `;

    const options = document.querySelectorAll(".question-option");
    const result = document.getElementById("questionResult");

    options.forEach(option => {
        option.addEventListener("click", () => {
            const selectedIndex = Number(option.dataset.index);

            options.forEach(button => {
                button.disabled = true;
            });

            if (selectedIndex === correctIndex) {
                option.classList.add("correct");
                result.textContent = "You got it! You really know us. ♡";
            } else {
                option.classList.add("wrong");
                result.textContent =
                    `Not quite! The answer was "${choices[correctIndex]}". ♡`;
            }

            completeSurpriseButton.disabled = false;
        });
    });

    completeSurpriseButton.disabled = true;
}


/* ============================================================
   REAL LIFE SURPRISE
============================================================ */


function renderRealLife(surprise) {
    surpriseContent.innerHTML = `
        <div class="real-life-surprise">
            <div class="reward-icon">
                ${surprise.icon || "🎁"}
            </div>

            <h3>${surprise.reward || "A Little Something For You"}</h3>

            <p>${surprise.message || "I have something special planned for you. ♡"}</p>

            <button class="surprise-action" id="revealRewardButton">
                Reveal your clue 👀
            </button>

            <div id="rewardClue" class="mini-message"></div>
        </div>
    `;

    const revealButton = document.getElementById("revealRewardButton");
    const rewardClue = document.getElementById("rewardClue");

    revealButton.addEventListener("click", () => {
        rewardClue.textContent =
            surprise.clue || "Your surprise is waiting for you. ♡";

        revealButton.textContent = "Clue revealed! 🎀";
        revealButton.disabled = true;

        completeSurpriseButton.disabled = false;
    });

    completeSurpriseButton.disabled = true;
}

/* ============================================================
   MUSIC SURPRISE
============================================================ */

function renderMusicSurprise(surprise) {
    surpriseContent.innerHTML = `
        <div class="music-surprise">
            <div class="music-icon">🎸</div>

            <h3>${surprise.title || "Our Little Music Room"}</h3>

            <p>${surprise.message || "I have something hidden in this song for you. ♡"}</p>

            <button class="surprise-action" id="playMusicSurpriseButton">
                Play our little song 🎶
            </button>

            <div id="musicSurpriseMessage" class="mini-message"></div>
        </div>
    `;

    const button = document.getElementById("playMusicSurpriseButton");
    const message = document.getElementById("musicSurpriseMessage");

    button.addEventListener("click", () => {
        if (backgroundMusic) {
            backgroundMusic.play().catch(() => {});
        }

        message.textContent =
            surprise.caption || "Some songs just feel like us. ♡";

        button.textContent = "Playing for us 🎶";
        button.disabled = true;

        completeSurpriseButton.disabled = false;
    });

    completeSurpriseButton.disabled = true;
}


/* ============================================================
   PUZZLE
============================================================ */

function renderPuzzle(surprise) {
    surpriseContent.innerHTML = `
        <div class="puzzle-surprise">
            <div class="puzzle-icon">🧩</div>

            <h3>${surprise.question || "Solve this little puzzle ♡"}</h3>

            <input
                type="text"
                id="puzzleAnswer"
                class="puzzle-input"
                placeholder="Type your answer..."
                autocomplete="off"
            >

            <button class="surprise-action" id="checkPuzzleButton">
                Check Answer ✨
            </button>

            <div id="puzzleHint" class="mini-message"></div>
        </div>
    `;

    const answerInput = document.getElementById("puzzleAnswer");
    const checkButton = document.getElementById("checkPuzzleButton");
    const hint = document.getElementById("puzzleHint");

    checkButton.addEventListener("click", () => {
        const answer = answerInput.value.trim().toLowerCase();
        const correctAnswer = String(surprise.answer || "").trim().toLowerCase();

        if (answer === correctAnswer) {
            hint.textContent =
                surprise.success || "You solved it! 🥹♡";

            answerInput.disabled = true;
            checkButton.textContent = "Solved! 🧩";
            checkButton.disabled = true;

            completeSurpriseButton.disabled = false;
        } else {
            hint.textContent =
                surprise.hint || "Hmm... try again. 👀";
        }
    });

    completeSurpriseButton.disabled = true;
}

function renderPandaDelivery(surprise) {
    const tasks = [
        "Give me a tiny compliment ♡",
        "Send me a virtual hug 🤗",
        "Smile for 5 seconds because I said so 😌"
    ];

    surpriseContent.innerHTML = `
        <div class="panda-delivery">
            <div class="panda-icon">🐼</div>

            <h3>${surprise.title || "Panda Delivery!"}</h3>

            <p>${surprise.message || "Your tiny panda has three deliveries for you. ♡"}</p>

            <div id="pandaTasks">
                ${tasks.map((task, index) => `
                    <button class="panda-task" data-index="${index}">
                        ${index + 1}. ${task}
                    </button>
                `).join("")}
            </div>

            <div id="pandaStatus" class="mini-message">
                Complete all 3 tasks 🐼
            </div>
        </div>
    `;

    const taskButtons = document.querySelectorAll(".panda-task");
    const status = document.getElementById("pandaStatus");

    let completed = 0;

    taskButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.disabled) return;

            button.disabled = true;
            button.classList.add("completed");

            completed++;

            if (completed === 3) {
                status.textContent =
                    "Panda delivery complete! 🐼💛";

                completeSurpriseButton.disabled = false;
            } else {
                status.textContent =
                    `${completed} / 3 completed. Keep going! ♡`;
            }
        });
    });

    completeSurpriseButton.disabled = true;
}

function renderLoveCards(surprise) {
    const things = surprise.items || [
        "The way you remember tiny things.",
        "The way you make me laugh.",
        "The way you show up for me.",
        "Your ridiculously cute expressions.",
        "The way you listen.",
        "Your patience with me.",
        "Your smile.",
        "The way you care.",
        "Your silly side.",
        "The way you make ordinary days special.",
        "Your honesty.",
        "Your hugs.",
        "The way you encourage me.",
        "Your voice.",
        "The way you look at me.",
        "Your little habits.",
        "The way you make me feel safe.",
        "Your heart.",
        "Simply... you. ♡"
    ];

    surpriseContent.innerHTML = `
        <div class="love-cards">
            <div class="love-cards-icon">💛</div>

            <h3>19 Things I Love About You</h3>

            <p>Open them one by one. ♡</p>

            <div id="loveCard" class="love-card">
                Tap to reveal
            </div>

            <button class="surprise-action" id="nextLoveCard">
                Reveal #1 💌
            </button>

            <div id="loveCardCounter" class="mini-message">
                0 / ${things.length}
            </div>
        </div>
    `;

    const card = document.getElementById("loveCard");
    const button = document.getElementById("nextLoveCard");
    const counter = document.getElementById("loveCardCounter");

    let index = 0;

    completeSurpriseButton.disabled = true;

    button.addEventListener("click", () => {
        card.textContent = things[index];
        card.classList.add("revealed");

        index++;

        counter.textContent = `${index} / ${things.length}`;

        if (index < things.length) {
            button.textContent = `Reveal #${index + 1} 💌`;
        } else {
            button.textContent = "All 19 revealed ♡";
            button.disabled = true;
            completeSurpriseButton.disabled = false;
        }
    });
}

function renderMysteryBox(surprise) {
    surpriseContent.innerHTML = `
        <div class="mystery-box-surprise">
            <div id="mysteryBoxIcon" class="mystery-box-icon">📦</div>

            <h3>${surprise.title || "A Mystery Box For You"}</h3>

            <p>${surprise.message || "Something tiny is hiding inside..."}</p>

            <button class="surprise-action" id="openMysteryBoxButton">
                Open the box 👀
            </button>

            <div id="mysteryReveal" class="mini-message"></div>
        </div>
    `;

    const box = document.getElementById("mysteryBoxIcon");
    const button = document.getElementById("openMysteryBoxButton");
    const reveal = document.getElementById("mysteryReveal");

    completeSurpriseButton.disabled = true;

    button.addEventListener("click", () => {
        box.textContent = surprise.collectibleIcon || "✨";

        reveal.textContent =
            surprise.reveal ||
            "You found the little collectible! Keep it safe. ♡";

        button.textContent = "Opened! ✨";
        button.disabled = true;

        completeSurpriseButton.disabled = false;
    });
}
function renderTimeline(surprise) {
    const paragraphs = surprise.letter?.paragraphs || [];

    surpriseContent.innerHTML = `
        <div class="timeline-surprise">
            <div class="timeline-icon">🏆</div>

            <h3>${surprise.title || "Our Journey ♡"}</h3>

            <p>Scroll through our little journey.</p>

            <div class="timeline-container">
                ${paragraphs.map((paragraph, index) => `
                    <button class="timeline-card" data-index="${index}">
                        <span class="timeline-number">
                            ${index + 1}
                        </span>

                        <span class="timeline-text">
                            ${paragraph}
                        </span>
                    </button>
                `).join("")}
            </div>

            <div id="timelineProgress" class="mini-message">
                0 / ${paragraphs.length} memories opened
            </div>
        </div>
    `;

    const cards = document.querySelectorAll(".timeline-card");
    const progress = document.getElementById("timelineProgress");

    let opened = 0;

    completeSurpriseButton.disabled = true;

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (card.classList.contains("opened")) return;

            card.classList.add("opened");
            opened++;

            progress.textContent =
                `${opened} / ${paragraphs.length} memories opened`;

            if (opened === paragraphs.length) {
                progress.textContent =
                    "You reached Day 25. Look how far we've come. 🥹💛";

                completeSurpriseButton.disabled = false;
            }
        });
    });
}
function renderPicnic(surprise) {

    surpriseContent.innerHTML = `
        <div class="picnic-surprise">

            <div class="picnic-scene" id="picnicScene">

                <div
                    class="picnic-item picnic-blanket"
                    data-item="blanket"
                >
                    🧺
                </div>

                <div
                    class="picnic-item picnic-snacks"
                    data-item="snacks"
                >
                    🍓
                </div>

                <div
                    class="picnic-item picnic-music"
                    data-item="music"
                >
                    🎵
                </div>

                <div
                    class="picnic-item picnic-lights"
                    data-item="lights"
                >
                    🌙
                </div>

                <div class="picnic-center">
                    <span>Our tiny date night</span>
                    <small>Bring everything onto the blanket ♡</small>
                </div>

            </div>

            <div
                id="picnicStatus"
                class="mini-message"
            >
                0 / 4 pieces placed
            </div>

        </div>
    `;

    const scene =
        document.getElementById("picnicScene");

    const status =
        document.getElementById("picnicStatus");

    const items =
        scene.querySelectorAll(".picnic-item");

    let placed = 0;
    let activeItem = null;

    const targetPositions = {
        blanket: {
            left: "40%",
            top: "48%"
        },

        snacks: {
            left: "53%",
            top: "43%"
        },

        music: {
            left: "38%",
            top: "62%"
        },

        lights: {
            left: "55%",
            top: "62%"
        }
    };

    function finishItem(item) {

        if (item.classList.contains("placed")) {
            return;
        }

        const name =
            item.dataset.item;

        const position =
            targetPositions[name];

        if (!position) {
            return;
        }

        item.style.left =
            position.left;

        item.style.top =
            position.top;

        item.classList.add("placed");

        placed++;

        status.textContent =
            `${placed} / 4 pieces placed`;

        if (placed === 4) {

            status.textContent =
                "Date night complete. Come sit beside me. 🌙🧺💛";

            completeSurpriseButton.disabled =
                false;
        }
    }

    items.forEach(item => {

        item.addEventListener(
            "pointerdown",
            event => {

                if (
                    item.classList.contains("placed")
                ) {
                    return;
                }

                activeItem = item;

                item.setPointerCapture(
                    event.pointerId
                );

                item.classList.add(
                    "dragging"
                );

                event.preventDefault();
            }
        );

        item.addEventListener(
            "pointermove",
            event => {

                if (
                    activeItem !== item ||
                    item.classList.contains("placed")
                ) {
                    return;
                }

                const rect =
                    scene.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    item.offsetWidth / 2;

                const y =
                    event.clientY -
                    rect.top -
                    item.offsetHeight / 2;

                const maxX =
                    scene.clientWidth -
                    item.offsetWidth;

                const maxY =
                    scene.clientHeight -
                    item.offsetHeight;

                item.style.left =
                    `${Math.max(
                        0,
                        Math.min(x, maxX)
                    )}px`;

                item.style.top =
                    `${Math.max(
                        0,
                        Math.min(y, maxY)
                    )}px`;
            }
        );

        item.addEventListener(
            "pointerup",
            event => {

                if (activeItem !== item) {
                    return;
                }

                activeItem = null;

                item.classList.remove(
                    "dragging"
                );

                try {
                    item.releasePointerCapture(
                        event.pointerId
                    );
                } catch (error) {
                    /* Pointer already released */
                }

                const itemRect =
                    item.getBoundingClientRect();

                const centerRect =
                    scene
                        .querySelector(".picnic-center")
                        .getBoundingClientRect();

                const itemCenterX =
                    itemRect.left +
                    itemRect.width / 2;

                const itemCenterY =
                    itemRect.top +
                    itemRect.height / 2;

                const insideCenter =
                    itemCenterX >= centerRect.left &&
                    itemCenterX <= centerRect.right &&
                    itemCenterY >= centerRect.top &&
                    itemCenterY <= centerRect.bottom;

                if (insideCenter) {
                    finishItem(item);
                }
            }
        );

        item.addEventListener(
            "pointercancel",
            () => {

                activeItem = null;

                item.classList.remove(
                    "dragging"
                );
            }
        );
    });

    completeSurpriseButton.disabled = true;
}
/* ============================================================
   FUTURE / FALLBACK SURPRISE
============================================================ */

function renderFutureSurprise(surprise) {
    surpriseContent.innerHTML = `
        <div class="future-surprise">
            <div class="future-icon">
                ${surprise.icon || "🎁"}
            </div>

            <h3>${surprise.title || "A Little Secret For You"}</h3>

            <p>${surprise.message || "There is something waiting for you. ♡"}</p>

            <button class="surprise-action" id="revealFutureButton">
                Open it 👀
            </button>

            <div id="futureReveal" class="mini-message"></div>
        </div>
    `;

    const button = document.getElementById("revealFutureButton");
    const reveal = document.getElementById("futureReveal");

    button.addEventListener("click", () => {
        reveal.textContent =
            surprise.clue ||
            "It's one of those little moments I secretly keep close to my heart. ♡";

        button.textContent = "Opened! 💛";
        button.disabled = true;

        completeSurpriseButton.disabled = false;
    });

    completeSurpriseButton.disabled = true;
}

/* ============================================================
   COMPLETE TODAY'S SURPRISE
============================================================ */

function completeSurprise() {

    if (viewingOldMemory) {
        return;
    }

    if (
        !currentSurprise ||
        isDayCompleted(currentDay)
    ) {
        return;
    }

    saveCompletedDay(
        currentDay
    );

    saveMemory(
        currentDay,
        currentSurprise
    );

    updateCompletionButton();

    showPortal(
        currentSurprise
    );
}


/* ============================================================
   SAVE MEMORY
============================================================ */

function saveMemory(day, surprise) {

    const memories =
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.memories
            )
        ) || [];

    const alreadyExists =
        memories.some(
            memory =>
                Number(memory.day) ===
                Number(day)
        );

    if (alreadyExists) {
        return;
    }

    const memoryData = {

        day: day,

        name:
            surprise.memory?.name ||
            surprise.title ||
            `Day ${day}`,

        icon:
            surprise.memory?.icon ||
            surprise.icon ||
            "💛",

        color:
            surprise.memory?.color ||
            "yellow",

        title:
            surprise.title ||
            "",

        createdAt:
            new Date().toISOString()
    };

    memories.push(
        memoryData
    );

    localStorage.setItem(
        STORAGE_KEYS.memories,
        JSON.stringify(memories)
    );
}


/* ============================================================
   PORTAL
============================================================ */

function showPortal(surprise) {

    const memory =
        surprise.memory || {};

    memoryObjectPreview.textContent =
        memory.icon ||
        surprise.icon ||
        "💛";

    memoryObjectPreview.classList.remove(
        "portal-object-animation"
    );

    void memoryObjectPreview.offsetWidth;

    memoryObjectPreview.classList.add(
        "portal-object-animation"
    );

    showScreen(
        portalScreen
    );

    setTimeout(() => {

        renderMemoryBox();

        showScreen(
            homeScreen
        );

        updateDayDisplay();
        updateCountdown();
        loadCurrentSurprise();

    }, 2200);
}


/* ============================================================
   MEMORY BOX
============================================================ */

function getMemories() {

    return (
        JSON.parse(
            localStorage.getItem(
                STORAGE_KEYS.memories
            )
        ) || []
    );
}


function renderMemoryBox() {

    const memories =
        getMemories();


    /*
       IMPORTANT:

       Do NOT use:

       memoryBox.innerHTML = "";

       because emptyMemoryMessage lives
       INSIDE memoryBox.
    */

       memoryBoxInside
    .querySelectorAll(
        ".memory-object"
    )
    .forEach(
        object => object.remove()
    );


    /* EMPTY MEMORY BOX */

    if (memories.length === 0) {

        emptyMemoryMessage
            .classList.remove(
                "hidden"
            );

        return;
    }


    /* MEMORIES EXIST */

    emptyMemoryMessage
        .classList.add(
            "hidden"
        );


    memories.forEach(
        (memory, index) => {

            createMemoryObject(
                memory,
                index
            );
        }
    );
}


/* ============================================================
   CREATE MEMORY OBJECT
============================================================ */

function createMemoryObject(
    memory,
    index
) {

    const object =
        document.createElement("button");

    object.type = "button";

    object.className =
        "memory-object";

    object.dataset.day =
        memory.day;

    object.dataset.index =
        index;

    object.textContent =
        memory.icon ||
        "💛";

    object.title =
        `${memory.name || "Memory"} — Day ${memory.day}`;

    /*
       Spread objects around the Memory Box.
    */

    const positions = [
        [12, 18],
        [35, 15],
        [62, 20],
        [78, 16],
        [20, 48],
        [48, 45],
        [72, 50],
        [32, 75],
        [60, 72],
        [82, 76]
    ];

    const position =
        positions[
            index % positions.length
        ];

    object.style.left =
        `${position[0]}%`;

    object.style.top =
        `${position[1]}%`;

    object.style.setProperty(
        "--memory-rotation",
        `${-8 + Math.random() * 16}deg`
    );


    /* DOUBLE CLICK = REVISIT */

    object.addEventListener(
        "dblclick",
        event => {

            event.preventDefault();

            revisitMemory(
                Number(memory.day)
            );
        }
    );


    /* SINGLE CLICK = SMALL BOUNCE */

    object.addEventListener(
        "click",
        () => {

            object.classList.remove(
                "memory-pop"
            );

            void object.offsetWidth;

            object.classList.add(
                "memory-pop"
            );
        }
    );


    /* DRAG */

    makeMemoryDraggable(
        object
    );


   memoryBoxInside.appendChild(
    object
);
}


/* ============================================================
   DRAGGABLE MEMORY OBJECTS
============================================================ */

function makeMemoryDraggable(object) {

    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;


    function getPointerPosition(event) {

        const rect =
            memoryBox.getBoundingClientRect();

        return {
            x:
                event.clientX -
                rect.left,

            y:
                event.clientY -
                rect.top
        };
    }


    object.addEventListener(
        "pointerdown",
        event => {

            dragging = true;

            object.setPointerCapture(
                event.pointerId
            );

            const rect =
                object.getBoundingClientRect();

            offsetX =
                event.clientX -
                rect.left;

            offsetY =
                event.clientY -
                rect.top;

            object.classList.add(
                "dragging"
            );

            event.preventDefault();
        }
    );


    object.addEventListener(
        "pointermove",
        event => {

            if (!dragging) {
                return;
            }

            const position =
                getPointerPosition(event);

            const x =
                position.x -
                offsetX;

            const y =
                position.y -
                offsetY;

            const maxX =
                memoryBox.clientWidth -
                object.offsetWidth;

            const maxY =
                memoryBox.clientHeight -
                object.offsetHeight;

            object.style.left =
                `${Math.max(
                    0,
                    Math.min(x, maxX)
                )}px`;

            object.style.top =
                `${Math.max(
                    0,
                    Math.min(y, maxY)
                )}px`;
        }
    );


    function stopDragging(event) {

        if (!dragging) {
            return;
        }

        dragging = false;

        object.classList.remove(
            "dragging"
        );

        try {

            object.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {
            /* pointer may already be released */
        }
    }


    object.addEventListener(
        "pointerup",
        stopDragging
    );

    object.addEventListener(
        "pointercancel",
        stopDragging
    );
}


/* ============================================================
   REVISIT OLD MEMORY
============================================================ */

async function revisitMemory(day) {

    try {

        const response = await fetch(
            `/api/surprise?day=${day}`
        );

        if (!response.ok) {
            throw new Error("Could not load old memory.");
        }

        const data = await response.json();

        const surprise = data.surprise;

        if (!surprise) {
            return;
        }

        viewingOldMemory = true;

        currentDay = day;

        currentSurprise = surprise;

        surpriseTitle.textContent =
            surprise.title ||
            "An Old Little Memory ♡";

        surpriseDescription.textContent =
            `Day ${String(day).padStart(3, "0")} — a memory from our little world.`;

        renderSurprise(surprise);

        showScreen(surpriseScreen);

    } catch (error) {

        console.error(
            "Memory loading error:",
            error
        );

    }

}
/* ============================================================
   MUSIC
============================================================ */

function initializeMusic() {

    const saved =
        localStorage.getItem(
            STORAGE_KEYS.musicEnabled
        );

    const enabled =
        saved === "true";

    updateMusicButton(
        enabled
    );

    if (enabled) {

        backgroundMusic.volume =
            0.35;
    }
}


function updateMusicButton(enabled) {

    if (!musicToggle) {
        return;
    }

    musicToggle.textContent =
        enabled
            ? "♫ ON"
            : "♫";
}


async function toggleMusic() {

    const currentlyPlaying =
        !backgroundMusic.paused;

    if (currentlyPlaying) {

        backgroundMusic.pause();

        localStorage.setItem(
            STORAGE_KEYS.musicEnabled,
            "false"
        );

        updateMusicButton(
            false
        );

        return;
    }

    try {

        backgroundMusic.volume =
            0.35;

        await backgroundMusic.play();

        localStorage.setItem(
            STORAGE_KEYS.musicEnabled,
            "true"
        );

        updateMusicButton(
            true
        );

    } catch (error) {

        console.log(
            "Music needs a user click first.",
            error
        );
    }
}


/* ============================================================
   MIDNIGHT CHECK
============================================================ */

function checkForNewDay() {

    const calculatedDay =
        calculateCurrentDay();

    if (
        calculatedDay !==
        currentDay
    ) {

        currentDay =
            calculatedDay;

        updateDayDisplay();
        updateCountdown();

        loadCurrentSurprise();

        showScreen(
            homeScreen
        );
    }
}


/* ============================================================
   EVENT LISTENERS
============================================================ */

if (openSurpriseButton) {

    openSurpriseButton.addEventListener(
        "click",
        openPresent
    );
}


if (present) {

    present.addEventListener(
        "click",
        openPresent
    );
}


if (completeSurpriseButton) {

    completeSurpriseButton.addEventListener(
        "click",
        completeSurprise
    );
}


if (memoryBoxButton) {

    memoryBoxButton.addEventListener(
        "click",
        () => {

            renderMemoryBox();

            showScreen(
                memoryScreen
            );
        }
    );
}

memoryBackButton.addEventListener("click", () => {
    viewingOldMemory = false;
    showScreen(homeScreen);
});
if (backHomeButton) {

    backHomeButton.addEventListener(
        "click",
        () => {

            viewingOldMemory = false;

            updateDayDisplay();
            loadCurrentSurprise();
            updateCountdown();

            showScreen(
                homeScreen
            );
        }
    );
}


if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        toggleMusic
    );
}


/* ============================================================
   INITIALIZE
============================================================ */

function initializeApp() {

    initializeStartDate();

    updateDayDisplay();

    updateCountdown();

    loadCurrentSurprise();

    renderMemoryBox();

    initializeMusic();

    showScreen(
        homeScreen
    );


    /*
       Update countdown every second.
    */

    if (countdownInterval) {
        clearInterval(
            countdownInterval
        );
    }

    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );


    /*
       Check for Indian midnight.
    */

    if (dayCheckInterval) {
        clearInterval(
            dayCheckInterval
        );
    }

    dayCheckInterval =
        setInterval(
            checkForNewDay,
            5000
        );
}


/* ============================================================
   START
============================================================ */

initializeApp();
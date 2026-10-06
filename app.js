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

    const letter =
        surprise.letter;

    if (!letter) {
        renderFutureSurprise(surprise);
        return;
    }

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "letter-card";

    const envelope =
        document.createElement("div");

    envelope.className =
        "letter-envelope";

    envelope.textContent =
        letter.envelopeText ||
        "For you ♡";

    wrapper.appendChild(envelope);

    const greeting =
        document.createElement("h3");

    greeting.textContent =
        letter.greeting || "";

    wrapper.appendChild(greeting);

    (letter.paragraphs || [])
        .forEach(paragraph => {

            const p =
                document.createElement("p");

            p.textContent =
                paragraph;

            wrapper.appendChild(p);
        });

    const signature =
        document.createElement("p");

    signature.className =
        "letter-signature";

    signature.textContent =
        letter.signature || "";

    wrapper.appendChild(signature);

    surpriseContent.appendChild(
        wrapper
    );
}


/* ============================================================
   CHOICE SURPRISE
============================================================ */

function renderChoice(surprise) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "choice-container";

    const result =
        document.createElement("p");

    result.className =
        "choice-result";

    result.textContent =
        "Choose one ♡";

    wrapper.appendChild(result);

    (surprise.choices || [])
        .forEach(choice => {

            const button =
                createButton(
                    choice.text,
                    () => {

                        result.textContent =
                            choice.result;

                        wrapper
                            .querySelectorAll("button")
                            .forEach(
                                btn => {
                                    btn.disabled =
                                        true;
                                }
                            );
                    }
                );

            wrapper.appendChild(
                button
            );
        });

    surpriseContent.appendChild(
        wrapper
    );
}


/* ============================================================
   FLOWER
============================================================ */

function renderFlower(surprise) {

    const flower =
        surprise.flower;

    if (!flower) {
        renderFutureSurprise(surprise);
        return;
    }

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "flower-container";

    const icon =
        document.createElement("div");

    icon.className =
        "flower-display";

    icon.textContent =
        flower.stages?.[0]?.icon ||
        "🌱";

    wrapper.appendChild(icon);

    const message =
        document.createElement("p");

    message.textContent =
        flower.stages?.[0]?.message ||
        "Something is growing...";

    wrapper.appendChild(message);

    const button =
        createButton(
            "CARE FOR MY FLOWER 🌱",
            () => {

                let stage =
                    Number(
                        wrapper.dataset.stage || 0
                    );

                stage =
                    Math.min(
                        stage + 1,
                        flower.stages.length - 1
                    );

                wrapper.dataset.stage =
                    String(stage);

                icon.textContent =
                    flower.stages[stage].icon;

                message.textContent =
                    flower.stages[stage].message;

                if (
                    stage ===
                    flower.stages.length - 1
                ) {

                    button.textContent =
                        "SHE'S PRESERVED FOREVER ♡";

                    button.disabled = true;
                }
            }
        );

    wrapper.appendChild(button);

    surpriseContent.appendChild(
        wrapper
    );
}


/* ============================================================
   HEART GAME
============================================================ */

function renderHeartGame(surprise) {

    const game =
        surprise.game || {
            target: 10,
            message: "You caught them all ♡"
        };

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "heart-game";

    const score =
        document.createElement("p");

    score.textContent =
        `Hearts caught: 0 / ${game.target}`;

    wrapper.appendChild(score);

    const playArea =
        document.createElement("div");

    playArea.className =
        "heart-game-area";

    wrapper.appendChild(playArea);

    let caught = 0;

    function spawnHeart() {

        if (caught >= game.target) {
            return;
        }

        const heart =
            document.createElement("button");

        heart.type = "button";
        heart.className =
            "game-heart";

        heart.textContent = "💛";

        heart.style.left =
            `${10 + Math.random() * 80}%`;

        heart.style.top =
            `${10 + Math.random() * 70}%`;

        heart.addEventListener(
            "click",
            () => {

                caught++;

                score.textContent =
                    `Hearts caught: ${caught} / ${game.target}`;

                heart.remove();

                if (
                    caught >=
                    game.target
                ) {

                    score.textContent =
                        game.message ||
                        "You caught all my hearts. ♡";

                } else {

                    spawnHeart();
                }
            }
        );

        playArea.appendChild(
            heart
        );
    }

    spawnHeart();

    surpriseContent.appendChild(
        wrapper
    );
}


/* ============================================================
   COUPON
============================================================ */

function renderCoupon(surprise) {

    const coupon =
        surprise.coupon;

    if (!coupon) {
        renderFutureSurprise(surprise);
        return;
    }

    const card =
        document.createElement("div");

    card.className =
        "coupon-card";

    const title =
        document.createElement("h3");

    title.textContent =
        coupon.title;

    card.appendChild(title);

    const text =
        document.createElement("p");

    text.textContent =
        coupon.text;

    card.appendChild(text);

    const stamp =
        document.createElement("div");

    stamp.className =
        "coupon-stamp";

    stamp.textContent =
        coupon.stamp;

    card.appendChild(stamp);

    surpriseContent.appendChild(
        card
    );
}


/* ============================================================
   MEMORY QUESTION
============================================================ */

function renderMemoryQuestion(surprise) {

    const question =
        surprise.question;

    if (!question) {
        renderFutureSurprise(surprise);
        return;
    }

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "question-container";

    const questionText =
        document.createElement("h3");

    questionText.textContent =
        question.text;

    wrapper.appendChild(
        questionText
    );

    const result =
        document.createElement("p");

    result.className =
        "question-result";

    wrapper.appendChild(
        result
    );

    question.options.forEach(
        (option, index) => {

            const button =
                createButton(
                    option,
                    () => {

                        if (
                            index ===
                            question.correct
                        ) {

                            result.textContent =
                                question.correctMessage;

                        } else {

                            result.textContent =
                                question.wrongMessage;
                        }
                    }
                );

            wrapper.appendChild(
                button
            );
        }
    );

    surpriseContent.appendChild(
        wrapper
    );
}


/* ============================================================
   REAL LIFE SURPRISE
============================================================ */

function renderRealLife(surprise) {

    const reward =
        surprise.reward;

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "real-life-card";

    if (reward) {

        const title =
            document.createElement("h3");

        title.textContent =
            reward.title || "";

        wrapper.appendChild(title);

        const message =
            document.createElement("p");

        message.textContent =
            reward.message || "";

        wrapper.appendChild(message);

        const revealButton =
            createButton(
                "REVEAL MY CLUE 👀",
                () => {

                    const clue =
                        document.createElement("p");

                    clue.className =
                        "reward-reveal";

                    clue.textContent =
                        reward.reveal || "";

                    wrapper.appendChild(
                        clue
                    );

                    revealButton.disabled =
                        true;
                }
            );

        wrapper.appendChild(
            revealButton
        );
    }

    surpriseContent.appendChild(
        wrapper
    );
}


/* ============================================================
   MUSIC SURPRISE
============================================================ */

function renderMusicSurprise(surprise) {

    const music =
        surprise.music;

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "music-surprise";

    const message =
        document.createElement("p");

    message.textContent =
        music?.message ||
        "Press play and stay here for a little while.";

    wrapper.appendChild(
        message
    );

    const button =
        createButton(
            "♫ PLAY OUR SONG",
            async () => {

                try {

                    await backgroundMusic.play();

                    musicToggle.textContent =
                        "♫ ON";

                } catch (error) {

                    console.log(
                        "Music could not autoplay:",
                        error
                    );
                }
            }
        );

    wrapper.appendChild(
        button
    );

    const caption =
        document.createElement("p");

    caption.className =
        "music-caption";

    caption.textContent =
        music?.caption || "";

    wrapper.appendChild(
        caption
    );

    surpriseContent.appendChild(
        wrapper
    );
}


/* ============================================================
   PUZZLE
============================================================ */

function renderPuzzle(surprise) {

    const puzzle =
        surprise.puzzle;

    if (!puzzle) {
        renderFutureSurprise(surprise);
        return;
    }

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "puzzle-container";

    const question =
        document.createElement("h3");

    question.textContent =
        puzzle.question;

    wrapper.appendChild(
        question
    );

    const input =
        document.createElement("input");

    input.type = "text";
    input.placeholder =
        "Your answer...";

    wrapper.appendChild(
        input
    );

    const result =
        document.createElement("p");

    wrapper.appendChild(
        result
    );

    const button =
        createButton(
            "CHECK ANSWER ♡",
            () => {

                const answer =
                    input.value
                        .trim()
                        .toLowerCase();

                if (
                    answer ===
                    String(
                        puzzle.answer
                    ).toLowerCase()
                ) {

                    result.textContent =
                        puzzle.success ||
                        "Correct ♡";

                    button.disabled =
                        true;

                    input.disabled =
                        true;

                } else {

                    result.textContent =
                        puzzle.hint ||
                        "Try again 👀";
                }
            }
        );

    wrapper.appendChild(
        button
    );

    surpriseContent.appendChild(
        wrapper
    );
}


/* ============================================================
   FUTURE / FALLBACK SURPRISE
============================================================ */

function renderFutureSurprise(surprise) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "future-surprise";

    const icon =
        document.createElement("div");

    icon.className =
        "future-icon";

    icon.textContent =
        surprise.icon ||
        "💛";

    wrapper.appendChild(
        icon
    );

    const message =
        document.createElement("p");

    message.textContent =
        surprise.message ||
        "I wanted to leave you a little reminder today. ♡";

    wrapper.appendChild(
        message
    );

    const button =
        createButton(
            "I FOUND MY LITTLE SURPRISE ♡",
            () => {

                button.textContent =
                    "SAVED ♡";

                button.disabled =
                    true;
            }
        );

    wrapper.appendChild(
        button
    );

    surpriseContent.appendChild(
        wrapper
    );
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

    memoryBox
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


    memoryBox.appendChild(
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

        showScreen("surprise");

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
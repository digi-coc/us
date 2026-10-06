const {
    getSurpriseForDay
} = require("./surprise-data");

function getIndiaDate() {
    return new Intl.DateTimeFormat(
        "en-CA",
        {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }
    ).format(new Date());
}

function dateToUTC(dateString) {
    const parts = dateString
        .split("-")
        .map(Number);

    return Date.UTC(
        parts[0],
        parts[1] - 1,
        parts[2]
    );
}

function calculateDay() {

    // TOMORROW IS DAY 1
    const startDate = "2026-10-06";

    const today = getIndiaDate();

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

module.exports = (req, res) => {

    try {

       const currentDay = calculateDay();

const requestedDay =
    Number(req.query?.day);

const day =
    Number.isInteger(requestedDay) &&
    requestedDay >= 1 &&
    requestedDay <= currentDay
        ? requestedDay
        : currentDay;

const surprise =
    getSurpriseForDay(day);
        if (!surprise) {

            return res.status(404).json({
                error: "No surprise found."
            });

        }

        return res.status(200).json({
            day: day,
            surprise: surprise
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Something went wrong."
        });

    }

};
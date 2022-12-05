const OFFSET = 7 // (UTC+7)

convertEpochToSpecificTimezone = (timeEpoch) => {
    const d = new Date(timeEpoch)
    const utc = d.getTime() + d.getTimezoneOffset() * 60000 //This converts to UTC 00:00
    const nd = new Date(utc + 3600000 * OFFSET)
    return nd //.toLocaleString()
}

convertSpecificTimezoneToEpoch = (time) => {
    const d = new Date(time)
    const utc = d.getTime() + d.getTimezoneOffset() * 60000 //This converts to UTC 00:00
    const epoch = new Date(utc) / 1000
    return epoch
}

module.exports = {
    getHumanReadableTime: convertEpochToSpecificTimezone,
    getEpoch: convertSpecificTimezoneToEpoch,
}

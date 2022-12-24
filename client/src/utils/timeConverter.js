const OFFSET = 7; // GMT+0700 (Indochina Time)

convertEpochTimestampToSpecificTimezone = (epoch) => {
    const d = new Date(epoch * 1000);
    const utc = d.getTime() + d.getTimezoneOffset() * 60000; //This converts to UTC 00:00
    const nd = new Date(utc + 3600000 * OFFSET);
    return nd;
};

convertSpecificTimezoneToEpochTimestamp = (time) => {
    const d = new Date(time).toUTCString();
    const nd = new Date(d + 3600000 * OFFSET).getTime() / 1000;
    return nd;
};

export default {
    getTime: convertEpochTimestampToSpecificTimezone,
    getEpoch: convertSpecificTimezoneToEpochTimestamp,
};

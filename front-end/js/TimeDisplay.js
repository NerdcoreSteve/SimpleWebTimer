const
    React = require('react'),
    moment = require('moment'),
    formatSeconds = seconds => moment.utc(seconds * 1000).format('HH:mm:ss'),
    TimeDisplay = ({timeInSeconds}) =>
        <p>{formatSeconds(timeInSeconds)}</p>

module.exports = TimeDisplay

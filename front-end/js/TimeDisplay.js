const
    React = require('react'),
    moment = require('moment'),
    originalStyle = {
        marginBottom: '0vmin',
        marginTop: '-3vmin',
    },
    formatSeconds = seconds => moment.utc(seconds * 1000).format('HH:mm:ss'),
    TimeDisplay = ({style = {}, timeInSeconds}) =>
        <p style={{...originalStyle, ...style}}>{formatSeconds(timeInSeconds)}</p>

module.exports = TimeDisplay

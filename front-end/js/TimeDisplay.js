const
    React = require('react'),
    moment = require('moment'),
    originalStyle = {
        fontSize: '15rem',
        marginBottom: '0rem',
        marginTop: '0rem',
    },
    formatSeconds = seconds => moment.utc(seconds * 1000).format('HH:mm:ss'),
    TimeDisplay = ({style = {}, timeInSeconds}) =>
        <p style={{...originalStyle, ...style}}>{formatSeconds(timeInSeconds)}</p>

module.exports = TimeDisplay

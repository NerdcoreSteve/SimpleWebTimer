const
    React = require('react'),
    originalStyle = {
        fontFamily: 'VT323, serif',
        backgroundColor: '#343D35',
        color: '#27E52A',
        borderColor: '#27E52A',
        borderWidth: '2vmin',
        margin: '2vmin',
        marginLeft: '0',
    },
    Button = ({style={}, onClick, text}) =>
        <button
            style={{...originalStyle, ...style}}
            onClick={onClick}
            type="button">
            {text}
        </button>

module.exports = Button

const
    React = require('react'),
    style = {
        fontSize: '5rem',
        fontFamily: 'VT323, serif',
        backgroundColor: '#343D35',
        color: '#27E52A',
        borderColor: '#27E52A',
        borderWidth: '0.5rem',
        margin: '1rem',
        marginLeft: '0',
    },
    Button = ({onClick, text}) =>
        <button
            style={style}
            onClick={onClick}
            type="button">
            {text}
        </button>

module.exports = Button

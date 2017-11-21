const
    React = require('react'),
    
    Button = ({onClick, text}) =>
        <button onClick={onClick} type="button">
            {text}
        </button>

module.exports = Button

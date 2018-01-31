const
    React = require('react'),
    originalStyle = {
        fontFamily: 'VT323, serif',
        width: '100%',
        backgroundColor: '#343D35',
        color: '#27E52A',
        borderColor: '#27E52A',
        borderWidth: '2vw',
    },
    TextInput = ({style={}, text, onBlurOrEnter, onChange}) =>
        <input
            style={{...originalStyle, ...style}}
            type="text"
            value={text}
            onChange={({target:{value: text}}) => onChange(text)}
            onKeyPress={({key}) => {
                if(key === 'Enter') {
                    onBlurOrEnter()
                }
            }}
            onBlur ={onBlurOrEnter}/>

module.exports = TextInput

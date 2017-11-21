const
    React = require('react'),
    TextInput = ({text, onBlurOrEnter, onChange}) =>
        <input
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

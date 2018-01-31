const
    React = require('react'),
    {connect} = require('react-redux')

const
    TimeDisplay = require('./TimeDisplay'),
    TextInput = require('./TextInput')

const
    mapStateToProps = ({paused, text, interval}) => ({paused, text, interval}),
    mapDispatchToProps = dispatch => ({
        changeText: text => dispatch({type: 'CHANGE_TEXT', text}),
        changeInterval: () => dispatch({type: 'CHANGE_INTERVAL'}),
    })

const
    RunningOrPaused = ({style={}, paused, text, interval, changeText, changeInterval}) =>
        paused
            ? <TextInput
                style={style}
                text={text}
                onBlurOrEnter={changeInterval}
                onChange={changeText}/>
            : <TimeDisplay
                style={{marginBottom: '4.1vmin', ...style}}
                timeInSeconds={interval}/>

module.exports = connect(mapStateToProps, mapDispatchToProps)(RunningOrPaused)

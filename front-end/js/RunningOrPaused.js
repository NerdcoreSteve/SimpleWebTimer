const
    React = require('react'),
    {connect} = require('react-redux')

const
    TimeDisplay = require('./TimeDisplay'),
    StartResume = require('./StartResume'),
    TextInput = require('./TextInput')

const
    mapStateToProps = ({paused, text, interval}) => ({paused, text, interval}),
    mapDispatchToProps = dispatch => ({
        startResume: () => dispatch({type: 'START_RESUME'}),
        changeText: text => dispatch({type: 'CHANGE_TEXT', text}),
        changeInterval: () => dispatch({type: 'CHANGE_INTERVAL'}),
        pause: () => dispatch({type: 'PAUSE'}),
    }),
    RunningOrPaused = ({paused, text, interval, startResume, changeText, changeInterval, pause}) =>
        paused
            ? <div>
                <StartResume startResume={startResume}/>
                <br/>
                <TextInput text={text} onBlurOrEnter={changeInterval} onChange={changeText}/>
            </div>
            : <div>
                <button onClick={pause} type="button"> Pause </button>
                <TimeDisplay timeInSeconds={interval}/>
            </div>

module.exports = connect(mapStateToProps, mapDispatchToProps)(RunningOrPaused)

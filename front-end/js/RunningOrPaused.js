const
    React = require('react'),
    {connect} = require('react-redux')

const
    TimeDisplay = require('./TimeDisplay'),
    Button = require('./Button'),
    TextInput = require('./TextInput')

const
    StartResumeAndTextInput = ({startResume, text, changeInterval, changeText}) =>
        <div>
            <Button onClick={startResume} text={'Start/Resume'}/>
            <br/>
            <TextInput text={text} onBlurOrEnter={changeInterval} onChange={changeText}/>
        </div>,
    PauseAndTimeDisplay = ({pause, interval}) =>
        <div>
            <Button onClick={pause} text={'Pause'}/>
            <TimeDisplay timeInSeconds={interval}/>
        </div>

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
            ? <StartResumeAndTextInput
                startResume={startResume}
                text={text}
                changeInterval={changeInterval}
                changeText={changeText}/>
            : <PauseAndTimeDisplay pause={pause} interval={interval}/>

module.exports = connect(mapStateToProps, mapDispatchToProps)(RunningOrPaused)

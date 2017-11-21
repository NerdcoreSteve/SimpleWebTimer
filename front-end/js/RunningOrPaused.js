const
    React = require('react'),
    {connect} = require('react-redux')

const
    TimeDisplay = require('./TimeDisplay')

const
    mapStateToProps = ({paused, text, interval}) => ({paused, text, interval}),
    mapDispatchToProps = dispatch => ({
        startResume: () => dispatch({type: 'START_RESUME'}),
        changeText: text => dispatch({type: 'CHANGE_TEXT', text}),
        changeInterval: () => dispatch({type: 'CHANGE_INTERVAL'}),
        pause: () => dispatch({type: 'PAUSE'})
    }),
    RunningOrPaused = ({paused, text, interval, startResume, changeText, changeInterval, pause}) =>
        paused
            ? <div>
                <button
                    onClick={startResume}
                    type="button">
                        Start/Resume
                </button>
                <br/>
                <input
                    type="text"
                    value={text}
                    onChange={({target:{value: text}}) => changeText(text)}
                    onKeyPress={({key}) => {
                        if(key === 'Enter') {
                            changeInterval()
                        }
                    }}
                    onBlur ={changeInterval}/>
            </div>
            : <div>
                <button
                    onClick={pause}
                    type="button">
                        Pause
                </button>
                <TimeDisplay timeInSeconds={interval}/>
            </div>

module.exports = connect(mapStateToProps, mapDispatchToProps)(RunningOrPaused)

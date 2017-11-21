const
    React = require('react'),
    {connect} = require('react-redux'),
    TimeDisplay = require('./TimeDisplay'),
    mapStateToProps = 
        ({paused, text, interval, dispatch}) => ({paused, text, interval, dispatch}),
    RunningOrPaused = connect(mapStateToProps)(({paused, text, interval, dispatch}) =>
        paused
            ? <div>
                <button
                    onClick={() => dispatch({
                        type: 'START_RESUME'
                    })}
                    type="button">
                        Start/Resume
                </button>
                <br/>
                <input
                    type="text"
                    value={text}
                    onChange={({target:{value: text}}) => {
                        dispatch({type: 'CHANGE_TEXT', text})
                    }}
                    onKeyPress={({key}) => {
                        if(key === 'Enter') {
                            dispatch({type: 'CHANGE_INTERVAL'})
                        }
                    }}
                    onBlur ={() => dispatch({type: 'CHANGE_INTERVAL'})}/>
            </div>
            : <div>
                <button
                    onClick={() => dispatch({
                        type: 'PAUSE'
                    })}
                    type="button">
                        Pause
                </button>
                <TimeDisplay timeInSeconds={interval}/>
            </div>)

module.exports = RunningOrPaused

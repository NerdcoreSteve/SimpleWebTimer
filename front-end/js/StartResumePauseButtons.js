const
    React = require('react'),
    {connect} = require('react-redux'),
    Button = require('./Button')

const
    mapStateToProps = ({paused}) => ({paused}),
    mapDispatchToProps = dispatch => ({
        startResume: () => dispatch({type: 'START_RESUME'}),
        pause: () => dispatch({type: 'PAUSE'}),
        reset: () => dispatch({type: 'RESET'}),
    })

const
    StartResumePauseButtons = ({style, paused, startResume, pause, reset}) =>
        <div>
            <Button
                style={{width: '55vmin', ...style}}
                onClick={paused ? startResume : pause}
                text={paused ? 'Start/Resume' : 'Pause'}/>
            <Button
                style={{width: '28vmin', ...style}}
                onClick={reset} text={'Reset'}/>
        </div>

module.exports = connect(mapStateToProps, mapDispatchToProps)(StartResumePauseButtons)

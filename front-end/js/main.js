require('whatwg-fetch')
require('babel-polyfill')

const
    React = require('react'),
    ReactDOM = require('react-dom'),
    {createStore, applyMiddleware} = require('redux'),
    {default: createSagaMiddleware} = require('redux-saga'),
    {Provider} = require('react-redux')

const
    createTimerAndHookUpToStore = require('./createTimerAndHookUpToStore'),
    createRootSaga = require('./createRootSaga'),
    reducer = require('./reducer'),
    TimeDisplay = require('./TimeDisplay'),
    Button = require('./Button'),
    RunningOrPaused = require('./RunningOrPaused'),
    StartResumePauseButtons = require('./StartResumePauseButtons')

const {fontStuff} = require('./styles')

const buttonStyle = {
    ...fontStuff,
    fontSize: '10vmin',
}

const textStyle = {
    fontSize: '5vmin',
    marginBottom: '0vmin',
    marginTop: '0vmin',
}

const paragraphStyle = {
    ...textStyle,
    backgroundColor: '#4b504b',
    padding: '1vmin',
}

const headerStyle = {
    ...textStyle,
    fontSize: '10vmin',
    textTransform: 'uppercase',
}

const
    App = ({store}) =>
        <Provider store={store}>
            <div>
                <header style={headerStyle}>
                    Simple Web Timer
                </header>
                <p style={{...paragraphStyle, width: '93vmin'}}>
                    Click where it says '25' and type another number
                    if you want to change the number of minutes before
                    the alarm goes off. Hit 'Start/Resume' to start
                    the timer.
                </p>
                <TimeDisplay
                    style={fontStuff}
                    timeInSeconds={store.getState().time}/>
                <RunningOrPaused style={fontStuff}/>
                <StartResumePauseButtons style={buttonStyle}/>
            </div>
        </Provider>

const
    sagaMiddleware = createSagaMiddleware(),
    store = createStore(reducer, applyMiddleware(sagaMiddleware)),
    timer = createTimerAndHookUpToStore(store),
    rootSaga = createRootSaga(timer),
    render = () =>
        ReactDOM.render(
            <App store={store}/>,
            document.getElementById('root'))

sagaMiddleware.run(rootSaga)
store.subscribe(render)
render()

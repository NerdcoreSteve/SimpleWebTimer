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
    fontSize: '10vmin',
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
    marginLeft: '11vmin',
}

const
    App = ({store}) =>
        <Provider store={store}>
            <div>
                <header style={headerStyle}>
                    Simple Web Timer
                </header>
                <TimeDisplay
                    style={fontStuff}
                    timeInSeconds={store.getState().time}/>
                <RunningOrPaused style={fontStuff}/>
                <StartResumePauseButtons style={buttonStyle}/>
                <p style={{...paragraphStyle, width: '83vmin'}}>
                    Click on the '25' to change the number of minutes
                    before the alarm goes off.
                </p>
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

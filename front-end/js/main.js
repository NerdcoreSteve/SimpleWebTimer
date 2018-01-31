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

const buttonFont = {
    ...fontStuff,
    fontSize: '10vw',
}

const
    App = ({store}) =>
        <Provider store={store}>
            <div>
                <TimeDisplay
                    style={fontStuff}
                    timeInSeconds={store.getState().time}/>
                <RunningOrPaused style={fontStuff}/>
                <StartResumePauseButtons style={buttonFont}/>
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

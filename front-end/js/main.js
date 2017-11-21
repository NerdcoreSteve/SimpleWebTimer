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
    ResetButton = require('./ResetButton'),
    RunningOrPaused = require('./RunningOrPaused')

const
    sagaMiddleware = createSagaMiddleware(),
    store = createStore(reducer, applyMiddleware(sagaMiddleware)),
    timer = createTimerAndHookUpToStore(store),
    rootSaga = createRootSaga(timer),
    render = () =>
        ReactDOM.render(
            <Provider store={store}>
                <div>
                    <TimeDisplay timeInSeconds={store.getState().time}/>
                    <RunningOrPaused/>
                    <ResetButton reset={() => store.dispatch({type: 'RESET'})}/>
                </div>
            </Provider>,
            document.getElementById('root'))

sagaMiddleware.run(rootSaga)
store.subscribe(render)
render()

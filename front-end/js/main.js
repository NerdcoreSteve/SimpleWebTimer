require('whatwg-fetch')
require('babel-polyfill')

const
    R = require('ramda'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    {createStore, applyMiddleware} = require('redux'),
    {default: createSagaMiddleware} = require('redux-saga')

const
    createTimerAndHookUpToStore = require('./createTimerAndHookUpToStore'),
    createRootSaga = require('./createRootSaga'),
    reducer = require('./reducer'),
    TimeDisplay = require('./TimeDisplay')

const
    sagaMiddleware = createSagaMiddleware(),
    store = createStore(reducer, applyMiddleware(sagaMiddleware)),
    timer = createTimerAndHookUpToStore(store),
    rootSaga = createRootSaga(timer),
    render = () =>
        ReactDOM.render(
            <div>
                <TimeDisplay timeInSeconds={store.getState().time}/>
                {function () {
                    if(store.getState().paused) {
                        return <div>
                            <button
                                onClick={() => store.dispatch({
                                    type: 'START_RESUME'
                                })}
                                type="button">
                                    Start/Resume
                            </button>
                            <br/>
                            <input
                                type="text"
                                value={store.getState().text}
                                onChange={({target:{value: text}}) => {
                                    store.dispatch({type: 'CHANGE_TEXT', text})
                                }}
                                onKeyPress={({key}) => {
                                    if(key === 'Enter') {
                                        store.dispatch({type: 'CHANGE_INTERVAL'})
                                    }
                                }}
                                onBlur ={() => store.dispatch({type: 'CHANGE_INTERVAL'})}/>
                        </div>
                    } else {
                        return <div>
                            <button
                                onClick={() => store.dispatch({
                                    type: 'PAUSE'
                                })}
                                type="button">
                                    Pause
                            </button>
                            <TimeDisplay timeInSeconds={store.getState().interval}/>
                        </div>
                    }
                }()}
                <button
                    onClick={() => store.dispatch({
                        type: 'RESET'
                    })}
                    type="button">
                        Reset
                </button>
            </div>,
            document.getElementById('root'))

sagaMiddleware.run(rootSaga)
store.subscribe(render)
render()

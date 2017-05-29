require('whatwg-fetch')
require('babel-polyfill')
/*
TODO
make a single pause/unpause button
textbox for the number of minutes until the timer goes off
timer textbox is only a textbox when timer is paused, otherwise paragraph element or similar
alert when timer goes off
notification when timer goes off
Done? Put up on heroku
blog about it
*/

const
    R = require('ramda'),
    Rx = require('rx'),
    tap = x => { console.log(x); return x },
    React = require('react'),
    ReactDOM = require('react-dom'),
    {createStore, applyMiddleware} = require('redux'),
    {default: createSagaMiddleware, takeEvery, effects: {put, call}} = require('redux-saga'),
    sagaMiddleware = createSagaMiddleware(),
    reducer = (state = {time: 0, paused: true}, action) => {
        switch(action.type) {
            case 'INCREMENT':
                return {
                    time: (state.time + 1) % 26
                }
            case 'STARTED_RESUMED':
                return {
                    ...state,
                    paused: false
                }
            case 'PAUSED':
                return {
                    ...state,
                    paused: true
                }
            default:
                return state
        }
    },
    store = createStore(reducer, applyMiddleware(sagaMiddleware)),
    timer = Rx.Observable.interval(1000).pausable(new Rx.Subject()),
    notificationSaga = function* (action) {
        alert(action.notification)
        yield put({type: 'NOTIFIED'})
    },
    timerSaga = function* (action) {
        if(action.type === 'START_RESUME' && store.getState().paused) {
            timer.resume()
            yield put({type: 'STARTED_RESUMED'})
        } else if(action.type === 'PAUSE' && !store.getState().paused) {
            timer.pause()
            yield put({type: 'PAUSED'})
        }
    },
    rootSaga = function* () {
        yield takeEvery('NOTIFICATION', notificationSaga)
        yield takeEvery('START_RESUME', timerSaga)
        yield takeEvery('PAUSE', timerSaga)
    },
    render = () =>
        ReactDOM.render(
            <div>
                <p>{store.getState().time}</p>
                <button
                    onClick={() => store.dispatch({
                        type: 'NOTIFICATION',
                        notification: 'I\'ve put you on notice!'
                    })}
                    type="button">
                        notify
                </button>
                <button
                    onClick={() => store.dispatch({
                        type: 'START_RESUME'
                    })}
                    type="button">
                        Start/Resume
                </button>
                <button
                    onClick={() => store.dispatch({
                        type: 'PAUSE'
                    })}
                    type="button">
                        Pause
                </button>
            </div>,
            document.getElementById('root'))

sagaMiddleware.run(rootSaga)
store.subscribe(render)
timer.subscribe(() => store.dispatch({type: 'INCREMENT'}))
render()

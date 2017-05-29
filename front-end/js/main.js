require('whatwg-fetch')
require('babel-polyfill')
/*
TODO
textbox for the number of minutes until the timer goes off
timer textbox is only a textbox when timer is paused, otherwise paragraph element or similar
format into minutes and seconds
html notification when timer goes off
make stopped mode and stop button. Stop mode means button says "start".
    paused mode only says "pause"
style it up simply so it looks fine desktop or mobile mode
Can I do html notifications on the phone?
Done? Put up on heroku
add login when you've learned it
start adding recording
make this a react native app?
make this a desktop app?
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
                {function () {
                    if(store.getState().paused) {
                        return <button
                            onClick={() => store.dispatch({
                                type: 'START_RESUME'
                            })}
                            type="button">
                                Start/Resume
                        </button>
                    } else {
                        return <button
                            onClick={() => store.dispatch({
                                type: 'PAUSE'
                            })}
                            type="button">
                                Pause
                        </button>
                    }
                }()}
            </div>,
            document.getElementById('root'))

timer.subscribe(() => {
    store.dispatch({type: 'INCREMENT'})
    if(store.getState().time == 0) {
        store.dispatch({type: 'PAUSE'})
        store.dispatch({type: 'NOTIFICATION', notification: 'timer\'s done!'})
    }
})

sagaMiddleware.run(rootSaga)
store.subscribe(render)
render()

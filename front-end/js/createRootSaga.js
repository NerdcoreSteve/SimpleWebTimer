const
    R = require('ramda'),
    {takeEvery, effects: {put, select}} = require('redux-saga'),
    notificationSaga = function* (action) {
        alert(action.notification)
        yield put({type: 'NOTIFIED'})
    },
    createTimerSaga = timer => function* (action) {
        const
            paused = yield select(R.prop('paused'))

        if(action.type === 'START_RESUME' && paused) {
            timer.resume()
            yield put({type: 'STARTED_RESUMED'})
        } else if(action.type === 'PAUSE' && !paused) {
            timer.pause()
            yield put({type: 'PAUSED'})
        } else if(action.type === 'RESET') {
            if(!paused) {
                timer.pause()
            }
            yield put({type: 'RESET_STATE'})
        }
    },
    createRootSaga = timer => function* () {
        const
            timerSaga = createTimerSaga(timer)

        yield takeEvery('NOTIFICATION', notificationSaga)
        yield takeEvery('START_RESUME', timerSaga)
        yield takeEvery('PAUSE', timerSaga)
        yield takeEvery('RESET', timerSaga)
    }

module.exports = createRootSaga

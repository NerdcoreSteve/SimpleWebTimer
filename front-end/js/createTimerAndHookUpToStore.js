const
    Rx = require('rx')

module.exports = store => {
    const
        timer = Rx.Observable.interval(1000).pausable(new Rx.Subject())

    timer.subscribe(() => {
        store.dispatch({type: 'INCREMENT'})
        if(store.getState().time == 60) {
            store.dispatch({type: 'PAUSE'})
            store.dispatch({type: 'NOTIFICATION', notification: 'timer\'s done!'})
        }
    })

    return timer
}

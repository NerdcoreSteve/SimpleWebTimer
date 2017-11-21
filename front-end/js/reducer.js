const
    {Left, Right} = require('data.either'),
    initialInterval = 25 * 60,
    reset = interval => ({
        time: 0,
        paused: true,
        interval: interval,
        text: `${interval / 60}`,
    }),
    initialState = reset(initialInterval),
    reducer = (state = initialState, action) => {
        switch(action.type) {
            case 'INCREMENT':
                return {
                    ...state,
                    time: (state.time + 1) % (state.interval + 1),
                }
            case 'STARTED_RESUMED':
                return {
                    ...state,
                    paused: false,
                }
            case 'PAUSED':
                return {
                    ...state,
                    paused: true,
                }
            case 'CHANGE_TEXT':
                return {
                    ...state,
                    text: action.text
                }
            case 'CHANGE_INTERVAL':
                return Right(state)
                    .map(R.prop('text'))
                    .map(parseInt)
                    .chain(interval =>
                        isNaN(interval)
                            ? Left(state.interval)
                            : Right(interval))
                    .map(R.multiply(60))
                    .fold(reset, reset)
            case 'RESET_STATE':
                return reset(state.interval)
            default:
                return state
        }
    }

module.exports = reducer

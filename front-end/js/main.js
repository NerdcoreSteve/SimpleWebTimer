require('whatwg-fetch')

const
    R = require('ramda'),
    tap = x => { console.log(x); return x },
    React = require('react'),
    ReactDOM = require('react-dom'),
    {createStore} = require('redux'),
    reducer = (state = '', action) => {
        switch(action.type) {
            case 'ADD_TEXT':
                return action.text
            default:
                return state
        }
    },
    store = createStore(reducer),
    render = () =>
        ReactDOM.render(
            <div>
                <p>{store.getState()}</p>
                <input
                    type="text"
                    onChange={({target:{value: text}}) => store.dispatch({type: 'ADD_TEXT', text})}/>
            </div>,
            document.getElementById('root'))

store.subscribe(render)
render()

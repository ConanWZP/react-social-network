import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/redux-store";
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import MainApp from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));

/*let rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                {/!*<App AppState={state} dispatch={store.dispatch.bind(store)} store={store} />*!/}
                <App  />
            </Provider>
        </React.StrictMode>
    );
}*/


root.render(
    /*<React.StrictMode>
        <Provider store={store}>
            {/!*<App AppState={state} dispatch={store.dispatch.bind(store)} store={store} />*!/}
            <App  />
        </Provider>
    </React.StrictMode>*/
    <React.StrictMode>
        <MainApp />
    </React.StrictMode>

);





/*rerenderEntireTree(store.getState());*/

/*store.subscribe(rerenderEntireTree);*/
/*store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});*/


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




import logo from './logo.svg';
import './App.css';



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Cheks <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const App = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Cheks <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// import Technologies from './Technologies';
// import Header from './Header';

import React from 'react';
import {BrowserRouter, HashRouter, Route, Routes, Navigate} from "react-router-dom";
//import Music from "./components/Music/Music";
//import News from "./components/News/News";
//import Settings from "./components/Settings/Settings";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
//import UsersContainer from "./components/Users/UsersContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
//import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";



const Music = React.lazy(() => import('./components/Music/Music'));
const News = React.lazy(() => import('./components/News/News'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));


class App extends React.Component {

    catchAllUnhandledErrors = () => {
        //alert('some error occured')
    }

    componentDidMount() {

        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors )
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }


    render() {

        /*if (!this.props.initialized) {
            return <Preloader/>
        }*/


        return (
            <HashRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <NavbarContainer/>
                    <div className='app-wrapper-content'>
                        <React.Suspense fallback={<Preloader />}>
                            <Routes>
                                <Route path='/' element={<Navigate to='/profile' />} />
                                {/*<Route path='/profile' element={<Profile postsDataToProfile={postsDataFromIndex}/>}/>
                        <Route path='/dialogs/*' element={<Dialogs dialogsDataToDialogs={dialogsDataFromIndex} messagesDataToDialogs={messagesDataFromIndex} />}/>*/}

                                {/*<Route path='/profile' element={<Profile state={props.AppState.profilePage}
                                                                 dispatch={props.dispatch} />}/>*/}
                                <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                                <Route path='/profile/' element={<ProfileContainer/>}/>
                                <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                                <Route path='/news' element={<News/>}/>
                                <Route path='/music' element={<Music/>}/>
                                <Route path='/settings' element={<Settings/>}/>
                                <Route path='/users' element={<UsersContainer/>}/>
                                <Route path='/login' element={<LoginPage/>}/>
                                <Route path='*' element={<div>404 NOT FOUND</div>} />
                            </Routes>
                        </React.Suspense>
                    </div>
                    {/* <Profile />*/}

                </div>
            </HashRouter>
        );
    }
}


const Mes = (props) => {
    return (
        props.eng + props.ru
    )
}


let oldArray = [{eng: "text", ru: "текст"}, {eng: "cat", ru: "кот"}];

/*let newArray = oldArray.map((el) => {
    return (
        <Mes eng={el.eng} ru={el.ru} />
    )
})*/

let newArray = oldArray.map((el) => (<Mes eng={el.eng} ru={el.ru}/>))


console.log(newArray[0].props);


let a = {
    name: 'Jarix',
    students: ['ivan', 'andrey'],
    classroom: {
        teacher: {
            name: 'Jo',
            age: 21
        }
    }
}

let b = {...a};

//b.name = 'Conan'

/*console.log(b===a);
console.log(a.name)
b.name = 'Conan';
console.log(a, b)*/

console.log(b === a);

b.classroom.teacher.name = 25;
console.log(b.classroom.teacher.name === a.classroom.teacher.name);


let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }

}

let AppContainer = connect(mapStateToProps, {initializeApp})(App);

let MainApp = (props) => {
    return (
        <Provider store={store}>

            <AppContainer/>

        </Provider>
    )
}

export default MainApp
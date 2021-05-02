import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';
import createStore from './reducers/store'
import StartPage from './components/StartPage';
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

import { TestComponent } from './components/TestComponent';

const store = createStore()

function App(props) {
  console.log(props.tournamentData)

  return (
    <Provider store={store}>
    <Router>
      <StartPage />
    </Router>

    </Provider>
  );
}

export default App

import logo from './logo.svg';
import './App.css';
import {Login} from './components/Login';
import {Clock} from "./components/counter/Counter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Andrew <code>src/App.js</code> and save to reload.
        </p>
        <Clock></Clock>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

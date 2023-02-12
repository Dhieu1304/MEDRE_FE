import logo from "./assets/images/logo.svg";
import "./App.css";
// import localStorageUtil from "./utils/localStorageUtil";

function App() {
  const testCode = () => {
    // console.log("Local: ", localStorageUtil.LOCAL_STORAGE);
    return 1;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>

        <button onClick={testCode} type="submit">
          test code
        </button>
      </header>
    </div>
  );
}

export default App;

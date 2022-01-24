import "./App.css";
import { CountButton } from "./component/CountButton";
import { storedCounter } from "./store/counter";
import { useAtom } from "./store/store";

function App() {
  const [counter, setCounter] = useAtom(storedCounter);

  return (
    <div className="app">
      <header className="app-header">
        <p>
          Demystifying the internal of <a href="https://jotai.org">jotai</a>, an
          atomic state management solution for @ReactJS.
        </p>
        <p>Here's a simplified version of the core.</p>
      </header>
      <main className="container">
        <div className="card">
          <p>
            Counter : {counter.count} updated from {counter.from}
          </p>
          <p>
            <button
              onClick={() =>
                setCounter({ count: counter.count + 1, from: "App" })
              }
            >
              Increment
            </button>
          </p>
        </div>

        <CountButton id={1} />
        <CountButton id={2} />
      </main>
      <footer>Camilab @2022 - see code</footer>
    </div>
  );
}

export default App;

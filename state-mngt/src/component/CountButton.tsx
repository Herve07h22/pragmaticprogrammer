import { storedCounter } from "../store/counter";
import { useAtom } from "../store/store";

export const CountButton: React.FC<{ id: number }> = ({ id }) => {
  const [counter, setCounter] = useAtom(storedCounter);
  return (
    <div className="card">
      <p>
        Counter : {counter.count} updated from {counter.from}
      </p>
      <p>
        <button
          onClick={() =>
            setCounter({
              count: counter.count + 1,
              from: "CountButton " + id,
            })
          }
        >
          Increment from CountButton {id}
        </button>
      </p>
    </div>
  );
};

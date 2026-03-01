import React, { useCallback, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [xCount, setXCount] = useState(3);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleXCount = useCallback(() => {
    setXCount(xCount + 1);
  }, [xCount]);
  console.log("rerender called");

  return (
    <div>
      <p>
        count {count}
        XCount: {xCount}
      </p>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleXCount}>xCount +</button>
      <X handleXCount={handleXCount} />
    </div>
  );
}

function X(props: { handleXCount: () => void }) {
  console.log("render called in X");
  return (
    <div>
      <button onClick={props.handleXCount}>Incremtn X</button>
    </div>
  );
}

export default App;

import { useCallback, useState, memo } from "react";
import { View, Text, Button } from "react-native";

export default function App() {
  //console.log("rerender");
  const [count, setCount] = useState(0);

  const [xCount, setXCount] = useState(3);

  const handleClick = () => {
    console.log("new created handleClick");
    setCount(count + 1);
  };
  const handleXCount = () => {
    setXCount(xCount + 1);
  };
  //   console.log("render");
  return (
    <View>
      <Text>count:{count}</Text>
      <Text>xCount:{xCount}</Text>
      <Button title="Click" onPress={handleClick} />
      <Button title="xCount" onPress={handleXCount} />
      <Child handleClick={handleClick} />
    </View>
  );
}

function Child_(props: { handleClick: () => void }) {
  return (
    <View>
      <Button title="On Press" onPress={props.handleClick} />
    </View>
  );
}

const Child = memo(Child_);

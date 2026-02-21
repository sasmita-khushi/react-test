import { View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className=" flex-1 justify-center items-center bg-sky-200">
      <Link href="/image">Go To Image Page</Link>
      <Link href="/a">Go to a page</Link>
    </View>
  );
}

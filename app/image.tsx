import { useState, useRef } from "react";
import {
  View,
  Alert,
  Image,
  ScrollView,
  Pressable,
  Modal,
  FlatList,
  Dimensions,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Index() {
  const [images, setImages] = useState<string[]>([]); //To show image
  const [modalVisible, setModalVisible] = useState(false); //To preview in large screen
  const [activeIndex, setActiveIndex] = useState(0);

  // Ref for FlatList to control initial scroll accurately
  const flatListRef = useRef<FlatList>(null);

  // 📸 CAMERA PERMISSION
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Camera permission is required to take photos.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  // 🖼 GALLERY PERMISSION
  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Gallery permission is required to select photos.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...selectedUris]);
    }
  };

  const openImageOptions = () => {
    Alert.alert("Select Image", "Choose an option", [
      {
        text: "Take Photo",
        onPress: takePhoto,
      },
      {
        text: "Choose from Gallery",
        onPress: pickFromGallery,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  //DELETE IMAGE
  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  //OPEN MODAL
  const openModal = (index: number) => {
    setActiveIndex(index);
    setModalVisible(true);
  };

  // Update dots based on scroll position
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    //console.log("handlescroll", event.nativeEvent.contentOffset.x);
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / SCREEN_WIDTH);
    //console.log("index", currentIndex);
    setActiveIndex(currentIndex);
  };

  return (
    <View className="flex-1 bg-white pt-10 px-4">
      <Text className="text-2xl font-bold mb-4">Post Images : </Text>
      <View className="flex-row items-center">
        {/* Add Button */}
        <Pressable
          onPress={openImageOptions}
          className="w-20 h-20 bg-gray-100 rounded-md justify-center items-center border border-dashed border-gray-400 mr-3"
        >
          <Ionicons name="camera-outline" size={30} color="gray" />
        </Pressable>

        {/* Small Preview Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {images.map((uri, index) => (
            <View key={index} className="relative">
              <Pressable onPress={() => openModal(index)}>
                <Image source={{ uri }} className="w-20 h-20 rounded-md" />
              </Pressable>
              <Pressable
                onPress={() => deleteImage(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full"
              >
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* FULL SCREEN PREVIEW MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black justify-center items-center">
          {/* Close Button */}
          <Pressable
            className="absolute top-12 right-6 z-10 p-2"
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={32} color="white" />
          </Pressable>

          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            initialScrollIndex={activeIndex}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View
                style={{ width: SCREEN_WIDTH }}
                className="justify-center items-center"
              >
                <Image
                  source={{ uri: item }}
                  className="w-full h-3/4"
                  resizeMode="contain"
                />
              </View>
            )}
          />

          {/* INSTAGRAM STYLE PAGINATION DOTS */}
          <View className="absolute bottom-16 flex-row items-center justify-center w-full space-x-2">
            {images.length > 1 &&
              images.map((_, index) => (
                <View
                  key={index}
                  className={`rounded-full transition-all duration-200 ${
                    activeIndex === index
                      ? "bg-white w-2.5 h-2.5"
                      : "bg-gray-500 w-2 h-2"
                  }`}
                  style={{
                    opacity: activeIndex === index ? 1 : 0.5,
                    marginHorizontal: 4,
                  }}
                />
              ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

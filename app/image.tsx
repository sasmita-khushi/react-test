import {
  View,
  Alert,
  Button,
  Image,
  ScrollView,
  Pressable,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [images, setImages] = useState<string[]>([]); //To show the Image
  const [modalVisible, setModalVisible] = useState(false); //to preview the image in large screen
  const [selectedImage, setSelectedImage] = useState<string | null>(null); //to know which image is selected
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); //to know the selected image index

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

  // 📸 CAMERA
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Camera permission is required");
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

  // 🖼 GALLERY
  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Gallery permission is required");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...selectedImages]);
    }
  };

  const deleteImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Button title="Pick Image" onPress={openImageOptions} />
      <ScrollView horizontal contentContainerStyle={{ gap: 10, marginTop: 20 }}>
        {images.map((uri, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setSelectedImage(uri);
              setSelectedIndex(index);
              setModalVisible(true);
            }}
          >
            <View className="relative">
              <Image source={{ uri }} className="w-20 h-20 rounded-md" />
              <Pressable
                onPress={() => deleteImage(index)}
                className="absolute top-0 right-0"
              >
                <Ionicons name="close-circle-outline" size={22} color="red" />
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/90">
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            initialScrollIndex={selectedIndex ?? 0}
            getItemLayout={(data, index) => ({
              length: Dimensions.get("window").width,
              offset: Dimensions.get("window").width * index,
              index,
            })}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View className="w-screen h-full justify-center items-center">
                <Image
                  source={{ uri: item }}
                  className="w-full h-3/4"
                  resizeMode="contain"
                />
              </View>
            )}
          />
          <Pressable
            className="absolute top-10 right-6"
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={30} color="white" />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform } from "react-native";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";


export default function NewPlant() {
  const iconColor: string = "#555555"

  const [plantName, setPlantName] = useState<string>("");
  const [plantDescription, setPlantDescription] = useState<string>("");
  const [plantImage, setPlantImage] = useState<string>("");
  const [addPlantDisabled, setAddPlantDisabled] = useState<boolean>(true);

  const { allPlants, setAllPlants } = useAppContext();

  // Check if form is filled out completely
  useEffect(() => {
    setAddPlantDisabled(!plantName || !plantDescription || !plantImage)
  }, [plantName, plantDescription, plantImage])

  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPlantImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.pageTitle}>Add a new plant 🌿</Text>
      </View>
      
      <View style={styles.formBox}>
        <View>
          <View style={styles.labelIconBox}>
            <MaterialCommunityIcons name="flower" color={iconColor} size={20} top={4} />
            <Text style={styles.inputLabel}>Name</Text>
          </View>
          <TextInput
            style={styles.inputField}
            placeholder="Enter the plants name..."
            value={plantName}
            onChangeText={(input: string) => {setPlantName(input)}}
          />
        </View>

        <View>
          <View style={styles.labelIconBox}>
            <FontAwesome name="pencil" color={iconColor} size={20} top={4} />
            <Text style={styles.inputLabel}>Description</Text>
          </View>
          <TextInput
            style={[styles.inputField, {height: 100}]}
            placeholder="Enter a short description..."
            multiline={true} 
            textAlignVertical="top"
            value={plantDescription}
            onChangeText={(input: string) => {setPlantDescription(input)}}
          />
        </View>

        <View>
          <View style={styles.labelIconBox}>
            <Entypo name="image-inverted" color={iconColor} size={20} top={4} />
            <Text style={styles.inputLabel}>Image</Text>
          </View>
          <TouchableOpacity style={[styles.addButton, {width: "100%"}]} onPress={pickImage}>
            <Text style={styles.addButtonText}>Upload image</Text>
          </TouchableOpacity>
        </View>

        { plantImage ?
          <View style={styles.previewImageContainer}>
            <Image source={{ uri: plantImage }} style={styles.previewImage} />
          </View>
          : null
        }
      </View>
      
      <View>
        <TouchableOpacity
          style={[styles.addButton, addPlantDisabled ? {backgroundColor: "gray"}: null]}
          disabled={addPlantDisabled}
          onPress={() => {
            alert(`Plant "${plantName}" added!`),
            setAllPlants([
              {
                name: plantName,
                description: plantDescription,
                image: plantImage
              },
              ...allPlants
            ])

            // Reset form
            setPlantName(""),
            setPlantDescription(""),
            setPlantImage("")               
          }}
        >
          <Text style={styles.addButtonText}>Add plant +</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "web" ? 20 : 50,
    paddingHorizontal: 20,
    height: "100%",
    backgroundColor: "#ebefe5",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
  },
  titleBox: {
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white"
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    textAlignVertical: "center"
  },
  formBox: {
    width: "100%",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20
  },
  labelIconBox: {
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555555",
  },
  inputField: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: "#96c347",
    height: 35,
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold"
  },
  previewImageContainer: {
    display: "flex",
    alignItems: "center"
  },
  previewImage: {
    width: 150,
    aspectRatio: 1
  }
});

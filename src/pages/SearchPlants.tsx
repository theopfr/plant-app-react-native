import { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import PlantList from "../components/PlantList";
import { PlantData } from "../types/types";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchPlants() {
  const [foundPlants, setFoundPlants] = useState<PlantData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [emptyListMessage, setEmptyListMessage] = useState<string>("Time to find new plants!");

  const searchPlant = () => {
    const plantURL = `https://perenual.com/api/species-list?q=${searchTerm}&key=${process.env.EXPO_PUBLIC_TOKEN}`;
  
    fetch(plantURL)
      .then(response => {
        if (!response.ok) {
          alert(`There has been an error (status ${response.status})!`);
          setSearchTerm("");
          throw new Error('Network response was not ok');
        }
        return response.text().then(text => {
          return JSON.parse(text);
        });
      })
      .then(data => {
        if (data.data.length === 0) {
          setEmptyListMessage("No plants found!");
          return;
        }
  
        const plants = data.data.map((plant: { common_name: any; scientific_name: any[]; default_image: { regular_url?: any; }; }) => {
          let plantImageURL = plant.default_image?.regular_url;
          if (plantImageURL && plantImageURL.includes("upgrade_access.jpg")) {
            plantImageURL = undefined;
          }

          return {
            name: plant.common_name || plant.scientific_name,
            description: plant.scientific_name[0] || "No description available",
            image: plantImageURL
          }
        });
  
        setFoundPlants(plants);
      })
      .catch(error => {
        alert("Failed to fetch plant data! " + error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchTitleBox}>
        <Text style={styles.pageTitle}>Search plants 🔍</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.plantSearchInput}
            placeholder="Enter a plants name..."
            value={searchTerm}
            onChangeText={(input: string) => {setSearchTerm(input)}}
          />
          <TouchableHighlight style={styles.searchButton} onPress={() => {
            searchPlant();
          }}>
            <FontAwesome name="search" color={"white"} size={20} />
          </TouchableHighlight>
        </View>
        
      </View>
      {
        foundPlants.length > 0 ?
          <View style={{flex: 1, paddingBottom: 20}}>
            <PlantList plantDataList={foundPlants}/>
          </View>
        : 
          <Text style={styles.emptyResultsPlaceholder}>{emptyListMessage}</Text>
      }
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
  },
  searchTitleBox: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    paddingTop: 10,
    backgroundColor: "white"
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  searchBox: {
    height: 40,
    width: "100%",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5
  },
  plantSearchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    flex: 6
  },
  searchButton: {
    backgroundColor: "#96c347",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  emptyResultsPlaceholder: {
    color: "gray",
    marginHorizontal: "10%",
    textAlign: "center",
    fontSize: 17,
    marginTop: 50
  }
});


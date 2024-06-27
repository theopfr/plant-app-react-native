import { Platform, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../AppContext";
import PlantList from "../components/PlantList"

export default function MyPlants() {
  const { allPlants, setAllPlants } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.pageTitle}>My plants 🌱</Text>
      </View>
      {
        allPlants.length > 0 ?
          <View style={{flex: 1, paddingBottom: 20}}>
            <PlantList plantDataList={allPlants}/>
          </View>
        : 
          <Text style={styles.emptyResultsPlaceholder}>Your garden is empty!</Text>
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "web" ? 20 : 50,
    paddingHorizontal: 20,
    backgroundColor: "#ebefe5",
    display: "flex",
    height: "100%",
    flexDirection: "column",
    gap: 20,
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
  emptyResultsPlaceholder: {
    color: "gray",
    textAlign: "center",
    marginHorizontal: "10%",
    fontSize: 17,
    marginTop: 50
  }
});

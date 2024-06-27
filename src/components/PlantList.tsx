import { StyleSheet, View, ScrollView } from "react-native";
import PlantCard from "./PlantCard";


interface PlantData {
  name: string,
  description: string,
  image: string,
}


export default function PlantList(props: { plantDataList: PlantData[] }) {
  return (
    <View style={styles.plantList}>
      <ScrollView contentContainerStyle={styles.scrollList}>
        {props.plantDataList.map((plant, idx) => {
          return (
            <PlantCard key={idx} plantData={plant} />
          )
        })}
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  plantList: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
  },
  scrollList: {
    display: "flex",
    flexDirection: "column",
    rowGap: 20,
    padding: 20,
  },
});

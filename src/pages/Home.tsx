import { Platform, StyleSheet, Text, View } from "react-native";
import ImageRow from "../components/ImageRow";


export default function HomePage() {
  return (
    <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.mainTitle}>Welcome to</Text>
          <Text style={[styles.mainTitle, styles.appName]}>GardenGuru 🌱</Text>
          <Text style={styles.secondaryTitle}>Your #1 App for managing your plants and garden.</Text>
        </View>
        <View style={styles.imageContainer}>
          <ImageRow imagePaths={[require("../../assets/can.jpg"), require("../../assets/monsterra.jpg")]} />
          <ImageRow imagePaths={[require("../../assets/gardeners.jpg"), require("../../assets/phone.jpg")]} />
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "web" ? 20 : 50,
    paddingHorizontal: 20,
    display: "flex",
    gap: 20,
    height: "100%",
    backgroundColor: "#ebefe5",
  },
  titleBox: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 0,
    lineHeight: 20
  },
  appName: {
    fontSize: 42,
    lineHeight: 50
  },
  secondaryTitle: {
    marginTop: 10,
    fontSize: 20,
    lineHeight: 20,
    color: "#4e4e4e",
  },
  imageContainer: {
    display: "flex",
    flex: 1,
    gap: 20,
    marginBottom: 20
  }
});

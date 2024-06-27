import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable, Dimensions } from "react-native";
import { useState } from "react";
import { PlantData } from "../types/types";


export default function PlantCard(props: { plantData: PlantData }) {
  const [showPlantPopup, setShowPlantPopup] = useState<boolean>(false);
  
  const closeImagePopup = () => {
    setTimeout(() => {
      setShowPlantPopup(false);
    }, 1000);
  };
  
  return (
    <View style={styles.plantCard}>
    <View style={styles.plantInfos}>
      <Text style={styles.plantName}>{props.plantData.name}</Text>
      <Text style={styles.plantDescription}>{props.plantData.description}</Text>
    </View>
    <TouchableOpacity style={styles.plantImageButton} onPress={() => setShowPlantPopup(true)}>
      <Image
        source={props.plantData.image ? { uri: props.plantData.image} : require("../../assets/placeholder-flower.png")}
        style={styles.plantImage}
      />
    </TouchableOpacity>
  
    <PlantImagePopup imageURI={props.plantData.image} visible={showPlantPopup} onClose={closeImagePopup} />
    </View>
  );
}
  
function PlantImagePopup (props: { imageURI: string, visible: boolean, onClose: () => void }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}
    >
      <Pressable onPress={props.onClose}>
      <View style={styles.imagePopup}>
        <View style={styles.imageFullContainer}>
          <Image
            source={props.imageURI ? { uri: props.imageURI} : require("../../assets/placeholder-flower.png")}
            style={styles.plantImageFull}
          />
        </View>
      </View>
      </Pressable>
    </Modal>
  );
}
  

const styles = StyleSheet.create({
	plantCard: {
		backgroundColor: "#f0f0f0",
		borderRadius: 10,
		height: "auto",
    maxHeight: 200,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
		padding: 10
  },
	plantInfos: {
		flex: 2,
  },
	plantName: {
		fontWeight: "bold",
		fontSize: 17,
		lineHeight: 17
  },
	plantDescription: {
		flexWrap: "wrap",
		marginTop: 0,
  	fontSize: 14
  },
	plantImageButton: {
		flex: 1,
		height: 100
  },
  plantImage: {
		height: "100%",
		width: "100%",
		objectFit: "cover",
		borderRadius: 10
  },
  imagePopup: {
		height: Dimensions.get('window').height,
		backgroundColor: "rgba(0,0,0,0.75)",
		padding: 20,
		display: "flex",
		flexDirection: "column",
		gap: 20
  },
  imageFullContainer: {
  	flex: 15,
  },
  plantImageFull: {
		height: "100%",
		width: "100%",
		borderRadius: 10
  },
  closeButtonField: {
		flex: 1,
		backgroundColor: "#96c347",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
  },
  closeButton: {
		color: "white",
		fontSize: 20,
  }
})
import { StyleSheet, View, Image } from "react-native";


export default function ImageRow(props: {imagePaths: NodeRequire[]}) {
  return (
    <View style={styles.imageRow}>
      {
        props.imagePaths.map((path: NodeRequire, idx: number) => {
          return (
            <Image key={idx} source={path} style={styles.image} />
          )
        })
      }
    </View>
  );
}


const styles = StyleSheet.create({
  imageRow: {
    flex: 1,
    display: "flex",
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "50%",
    objectFit: "cover",
    borderRadius: 20,
  },
});
  
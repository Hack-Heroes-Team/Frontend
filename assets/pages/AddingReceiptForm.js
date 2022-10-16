import { StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";

export default function AddingReceiptForm({ navigation }) {
	return (
		<>
			{/* Go to adding receipe by camera window */}
			<TouchableOpacity onPress={() => navigation.goBack()} style={styles.cameraIcon}>
				<Icon name="camera" style={{ color: "#fff" }} size={25} />
			</TouchableOpacity>

			{/* Forward icon */}
			<TouchableOpacity onPress={() => navigation} style={styles.iconForward}>
				<Icon name="arrow-right" style={{ color: "#fff" }} size={25} />
			</TouchableOpacity>
		</>
	);
}

// Style sheet
const styles = StyleSheet.create({
	cameraIcon: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		left: 10,
		padding: 15,
		borderRadius: 50,
	},
	iconForward: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		right: 10,
		padding: 15,
		borderRadius: 50,
	},
});

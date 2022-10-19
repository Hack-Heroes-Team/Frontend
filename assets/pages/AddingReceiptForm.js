import { StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import Icon from "react-native-vector-icons/Entypo";

export default function AddingReceiptForm({ navigation }) {
	// Setting up navbar settings
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => <Button onPress={() => navigation.navigate("Main")} title="Anuluj" color="#fff" />,

			headerStyle: {
				backgroundColor: "#002047",
			},
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerTintColor: "#fff",
			title: "Dodaj nowy pargon",
		});
	});

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

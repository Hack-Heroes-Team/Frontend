import { ScrollView, View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function Dashboard() {
	// Adding font
	const [fontsLoaded] = useFonts({
		Lato_Black: require("../fonts/Lato-Black.ttf"),
	});

	// Waiting for font to load
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			{/* Title */}
			<Text style={styles.title}>Statystyki</Text>

			{/* Container for data */}
			<ScrollView horizontal="true" showsHorizontalScrollIndicator="false" style={styles.container} contentContainerStyle={{ flexDirection: "row" }}>
				{/* Data */}

				<View style={styles.box}></View>
				<View style={styles.box}></View>
				<View style={styles.box}></View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	title: {
		marginLeft: 20,
		marginTop: 20,
		marginBottom: -5,
		fontSize: 30,
		fontFamily: "Lato_Black",
		color: "#fff",
	},
	container: {
		padding: 15,
		flexDirection: "row",
	},
	box: {
		backgroundColor: "#fff",
		borderRadius: 5,
		width: 150,
		height: 75,
		margin: 7.5,
	},
});

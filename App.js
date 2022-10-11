import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
	const [search, onChangeSearch] = useState("");

	return (
		<ScrollView style={{ backgroundColor: "#fff" }}>
			<SafeAreaView style={stylesTopBar.topBar}>
				<View style={{ marginTop: 15, flexDirection: "row", justifyContent: "space-evenly" }}>
					<View style={stylesTopBar.search}>
						<Icon style={{ lineHeight: 37.5, color: "#fe2926" }} name="search" size={15} />
						<TextInput style={{ paddingLeft: 10 }} onChangeText={onChangeSearch} value={search} placeholder="Wyszukaj..." />
					</View>
					<Image source={require("./assets/person-icon.png")} style={stylesTopBar.user} />
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}

const stylesTopBar = StyleSheet.create({
	topBar: {
		backgroundColor: "#002047",
		paddingTop: Platform.OS === "android" ? StatusBar.curentHeight : 0,
	},
	user: {
		borderColor: "#fff",
		borderWidth: 1,
		width: 40,
		height: 40,
		borderRadius: "50%",
	},
	search: {
		backgroundColor: "#fff",
		marginBottom: 70,
		height: 40,
		width: "75%",
		paddingHorizontal: 20,
		flexDirection: "row",
		color: "red",
		borderRadius: "50%",
	},
});

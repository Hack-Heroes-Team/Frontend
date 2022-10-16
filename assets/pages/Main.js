import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Image, Platform, StatusBar, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import ShopsContainer from "./ShopsContainer";
import Dashboard from "./Dashboard";

export default function Main({ navigation }) {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ backgroundColor: "#f9f9ff" }}>
				<TopBar navigation={navigation} />
				<ShopsContainer navigation={navigation} />
			</ScrollView>

			<TouchableOpacity onPress={() => navigation.navigate("AddingReceipt")} style={styles.icon}>
				<Icon name="plus" style={{ color: "#fff" }} size={50} />
			</TouchableOpacity>
		</View>
	);
}

function TopBar({ navigation }) {
	const [search, onChangeSearch] = useState("");
	return (
		<SafeAreaView style={styles.topBar}>
			<View style={{ marginTop: 15, marginBottom: 10, flexDirection: "row", justifyContent: "space-evenly" }}>
				<View style={styles.search}>
					<Icon style={{ lineHeight: 35, color: "#fe2926" }} name="magnifying-glass" size={20} />
					<TextInput style={{ paddingLeft: 10, width: "95%" }} onChangeText={onChangeSearch} value={search} placeholder="Wyszukaj..." autoCorrect={true} placeholderTextColor={"#002047"} />
				</View>
				<TouchableOpacity onPress={() => navigation.navigate("Account")}>
					<Image source={require("../person-icon.png")} style={styles.user} />
				</TouchableOpacity>
			</View>

			<Dashboard />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	topBar: {
		backgroundColor: "#002047",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	user: {
		borderColor: "#fff",
		borderWidth: 1,
		width: 35,
		height: 35,
		borderRadius: 50,
	},
	search: {
		backgroundColor: "#fff",
		width: "75%",
		height: 35,
		paddingHorizontal: 20,
		flexDirection: "row",
		color: "red",
		borderRadius: 50,
	},
	verticalContainer: {
		flexDirection: "row",
		marginLeft: 25,
		marginTop: 10,
	},
	icon: {
		backgroundColor: "#fe2926",
		position: "absolute",
		bottom: 25,
		padding: 10,
		alignSelf: "center",
		borderRadius: 50,
	},
});

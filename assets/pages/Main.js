import React, { useState, useEffect, useReducer } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Platform, StatusBar, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

// Importing Dashboard and component with Top Shops
import ShopsContainer from "./ShopsContainer";
import Dashboard from "./Dashboard";

// Main view of app
export default function Main({ navigation }) {
	// Reloading on load
	const reload = React.useRef(null);
	useEffect(() => {
		const focusHandler = navigation.addListener("focus", () => {
			reload.current();
		});
		return focusHandler;
	}, [navigation]);

	return (
		<View style={{ flex: 1 }}>
			{/* Scrollable part of view */}
			<ScrollView style={{ backgroundColor: "#f9f9ff" }}>
				{/* Adding TopBar component (underneath) */}
				<TopBar navigation={navigation} />

				{/* Adding ShopContainer component (from imports) */}
				<ShopsContainer navigation={navigation} reload={reload} />
			</ScrollView>

			{/* 'Add receipt' button  */}
			<TouchableOpacity onPress={() => navigation.navigate("AddingReceiptCamera")} style={styles.addReceiptIcon}>
				<Icon name="plus" style={{ color: "#fff" }} size={50} />
			</TouchableOpacity>
		</View>
	);
}

// Top Bar component
function TopBar({ navigation }) {
	// Setting up variable to handle data in search bar
	const [search, onChangeSearch] = useState("");

	// Reloading on load
	const reload = React.useRef(null);
	useEffect(() => {
		const focusHandler = navigation.addListener("focus", () => {
			reload.current();
		});
		return focusHandler;
	}, [navigation]);

	return (
		<SafeAreaView style={styles.topBar}>
			<View style={styles.searchAndIconContainer}>
				{/* Search window */}
				<View style={styles.searchBar}>
					<Icon style={{ lineHeight: 35, color: "#fe2926" }} name="magnifying-glass" size={20} />
					<TextInput style={{ paddingLeft: 10, width: "95%" }} onChangeText={onChangeSearch} value={search} placeholder="Wyszukaj..." autoCorrect={true} placeholderTextColor={"#002047"} />
				</View>

				{/* User and app setting */}
				<TouchableOpacity onPress={() => navigation.navigate("Settings")}>
					<Icon style={styles.settingsIcon} name="cog" size={30} />
				</TouchableOpacity>
			</View>

			{/* Adding ShopContainer componetn (from imports) */}
			<Dashboard reload={reload} />
		</SafeAreaView>
	);
}

// Style sheet
const styles = StyleSheet.create({
	addReceiptIcon: {
		backgroundColor: "#fe2926",
		position: "absolute",
		bottom: 25,
		padding: 10,
		alignSelf: "center",
		borderRadius: 50,
	},

	// TopBar styles
	topBar: {
		backgroundColor: "#002047",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	searchAndIconContainer: {
		marginTop: 15,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	settingsIcon: {
		lineHeight: 35,
		color: "#fff",
	},
	searchBar: {
		backgroundColor: "#fff",
		width: "75%",
		height: 35,
		paddingHorizontal: 20,
		flexDirection: "row",
		borderRadius: 50,
	},
});

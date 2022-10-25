import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useState, useLayoutEffect, useCallback, useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthContext } from "../UseAuth";

export default function AddingItems({ navigation, route }) {
	// Setting up variable to handle data in form
	const [items, setItems] = useState([]);
	const [tempItem, setTempItem] = useState({ name: "", price: "", error: false });

	// Setting up variable to handle from db

	const [dataFromDB, setDataFromDB] = useState([]);

	// Getting email from context
	const { email, city } = useContext(AuthContext);

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
			title: "Dodaj produkty",
		});
	});

	// Getting previous receipts from db
	const getData = async () => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({
				id: route.params.id,
			}),
		};
		const shopItems = await fetch("https://hack-heroes-back.herokuapp.com/findReceipt", requestOptions);
		const data = await shopItems.json();
		setDataFromDB(data.receipt.Items);
	};
	// On load trigger
	useEffect(() => {
		getData();
	}, []);

	// Function handling adding new item to receipt
	const handleNewItem = async () => {
		if (tempItem.name && tempItem.price) {
			setItems([
				...items,
				{
					Receiptid: route.params.id,
					Owner: email,
					Place: route.params.place,
					Shop: route.params.shop,
					City: city,
					LocalId: Math.floor(Math.random() * (1000000000 - 1) + 1),
					Name: tempItem.name,
					Price: parseFloat(tempItem.price),
				},
			]);
			setTempItem({ name: "", price: "", error: false });
		} else setTempItem({ ...tempItem, error: true });
	};

	// Send items to database
	const handleItemsToDb = async () => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(items),
		};
		const newItems = await fetch("https://hack-heroes-back.herokuapp.com/addItem", requestOptions);

		// Navigate to main after adding items to db
		navigation.navigate("Main");
	};

	// Adding fonts
	const [fontsLoaded] = useFonts({
		Ubuntu_Bold: require("../fonts/Ubuntu-Bold.ttf"),
		Montserrat_Regular: require("../fonts/Montserrat-Regular.ttf"),
	});

	// Waiting for fonts to load
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={{ backgroundColor: "#f9f9ff", flex: 1, paddingHorizontal: "5%" }}>
			{/* Subtitle */}
			<Text style={styles.subtitle}>Dodaj nowy produkt</Text>
			{/* Adding new products to receipt */}
			<View style={styles.inputsContainer}>
				{/* Form inputs */}
				<TextInput
					value={tempItem.name}
					onChangeText={(name) => setTempItem({ ...tempItem, name: name })}
					style={{ ...styles.input, width: "80%" }}
					placeholder="Nazwa produktu..."
					placeholderTextColor={"#00204750"}
				/>
				<TextInput
					keyboardType="numeric"
					value={tempItem.price}
					onChangeText={(price) => setTempItem({ ...tempItem, price: price })}
					style={{ ...styles.input, textAlign: "center", width: "17.5%", marginStart: "2.5%" }}
					placeholder="Cena"
					placeholderTextColor={"#00204750"}
				/>

				{/* Confirm button */}
				<TouchableOpacity style={styles.buttonConfirm} onPress={() => handleNewItem()}>
					<Text style={styles.buttonsText}>Dodaj nowy produkt</Text>
				</TouchableOpacity>

				{/* Error display */}
				{tempItem.error ? <Text style={styles.errorText}>Uzupełnij wszystkie pola</Text> : null}
			</View>
			{/* Subtitle */}
			<Text style={styles.subtitle}>Produkty:</Text>

			{/* Displaying products on list */}
			<ScrollView>
				{/* Displaying local items */}
				{items.map((item) => {
					return (
						<View style={styles.productBox} key={item.LocalId}>
							<Text style={styles.productName}>- {item.Name}</Text>
							<Text style={styles.productPrice}>{item.Price.toFixed(2)}zł</Text>
							<TouchableOpacity
								style={styles.productDeleteBox}
								onPress={() => {
									let afterDelete = items.filter((product) => product.LocalId != item.LocalId);
									setItems(afterDelete);
								}}
							>
								<Icon name="cross" style={{ color: "#fe2926" }} size={25} />
							</TouchableOpacity>
						</View>
					);
				})}

				{/* Displaying items from db */}
				{dataFromDB.map((item) => {
					return (
						<View style={styles.productBox} key={item.Id}>
							<Text style={styles.productName}>- {item.Name}</Text>
							<Text style={styles.productPrice}>{item.Price.toFixed(2)}zł</Text>
							<TouchableOpacity
								style={styles.productDeleteBox}
								// Deleting item in db
								onPress={async () => {
									const requestOptions = {
										method: "POST",
										body: JSON.stringify({
											place: item.Place,
											name: item.Name,
											id: item.Id,
										}),
									};
									const deleteItem = await fetch("https://hack-heroes-back.herokuapp.com/deleteItem", requestOptions);
									getData();
								}}
							>
								<Icon name="cross" style={{ color: "#fe2926" }} size={25} />
							</TouchableOpacity>
						</View>
					);
				})}
			</ScrollView>

			{/* Go to adding receipt by camera window */}
			<TouchableOpacity onPress={() => navigation.goBack()} style={{ ...styles.icon, left: 10 }}>
				<Icon name="arrow-left" style={{ color: "#fff" }} size={30} />
			</TouchableOpacity>

			{/* Check icon */}
			<TouchableOpacity onPress={() => handleItemsToDb()} style={{ ...styles.icon, right: 10 }}>
				<Icon name="check" style={{ color: "#fff" }} size={30} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	icon: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		padding: 15,
		borderRadius: 50,
	},

	subtitle: {
		fontFamily: "Ubuntu_Bold",
		fontSize: 20,
		marginTop: 25,
		color: "#002047",
	},

	// Adding item styling
	inputsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	input: {
		marginTop: 20,
		padding: 15,
		borderColor: "#002047",
		borderWidth: 2,
		borderRadius: 12,
	},
	buttonConfirm: {
		marginVertical: 12,
		padding: 12,
		borderColor: "#002047",
		borderWidth: 2,
		width: "100%",
		borderRadius: 12,
	},
	buttonsText: {
		textAlign: "center",
		fontFamily: "Ubuntu_Bold",
		color: "#002047",
		fontSize: 20,
	},
	errorText: {
		textAlign: "left",
		width: "80%",
		marginTop: 5,
		color: "#fe2926",
	},

	// Products styling
	productBox: {
		marginTop: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	productName: {
		fontSize: 17.5,
	},
	productPrice: {
		fontFamily: "Montserrat_Regular",
		fontSize: 17.5,
		marginEnd: 25,
	},
	productDeleteBox: {
		position: "absolute",
		right: 0,
	},
});

import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";

export default function ShopScreen({ navigation, route }) {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: "#002047",
			},
			headerTitleStyle: {
				fontWeight: "bold",
				color: "#fff",
			},
			title: route.params.name,
		});
	});
	return (
		<View>
			<Text>ShopScreen</Text>
		</View>
	);
}

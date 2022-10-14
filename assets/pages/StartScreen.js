import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";

export default function StartScreen() {
	return (
		<SafeAreaView style={styles.screen}>
			<Text>startScreen</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({ screen: { backgroundColor: "#002047", flex: 1 } });

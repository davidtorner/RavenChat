import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, Dimensions } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

let ScreenHeight = Dimensions.get("window").height;

export default SideBar = props => (
    <ScrollView
    scrollEnabled={false}
    >
            <View style={styles.topScroll}>
            <Image source={require("../assets/avatars/profile-pic.png")} style={styles.profile} />
            <Text style={styles.name}>Sajad Roudbari</Text>

            <View style={{ flexDirection: "row", flex: 1 }}>
                <Text style={styles.phoneNumber}>+98 434 784 68 02</Text>
                <Ionicons name="md-arrow-dropdown" size={16} style={styles.arrowDown}></Ionicons>
            </View>
            </View>

        <View 
        style={styles.botScroll}>
        <View style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
        </View>
        </View>

    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    arrowDown: {
        color: "#fff",
        position: "absolute",
        right: 5,
    },
    topScroll: {
        backgroundColor: "#212D3B",
        paddingHorizontal: 20,
        paddingVertical: 20,
        elevation: 2
    },
    botScroll: {
        flex: 1,
        backgroundColor: "#1D2733",
        height: ScreenHeight
    },
    name: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "400",
        marginTop: 8
    },
    phoneNumber: {
        color: "#7D8B97",
        fontSize: 14,
        marginRight: 4
    }
});

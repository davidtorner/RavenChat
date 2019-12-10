import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as firebase from "firebase";

export default class Screen extends React.Component {
    signOutUser = () => {
        firebase.auth().signOut();
    };


    render() {
        return (
            <View style={styles.container}
            >
                <SafeAreaView style={{ flex: 1, paddingTop: 16 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-end" }}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
});

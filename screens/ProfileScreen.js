import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";

export default class ProfileScreen extends React.Component {
    signOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
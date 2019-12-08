import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'

posts = [
    {
        id: "1",
        name: "Felan Store",
        text:
            "🎉 Last of Us: Part II - price: 2…",
        timestamp: 1569109273726,
        avatar: require("../assets/avatars/avatar-1.png"),
        hasNotification: true,
        notifications: "3",
    },
    {
        id: "2",
        name: "Amolika Shaikh",
        text:
            "Salavati Khatm bfrmaid",
        timestamp: 1569109273726,
        avatar: require("../assets/avatars/avatar-8.png"),
        hasNotification: true,
        notifications: "1"
    },
    {
        id: "3",
        name: "Sunstra Maneerattana",
        text:
            "Say hello to Vahid & ossi!",
        timestamp: 1569109273726,
        avatar: require("../assets/avatars/avatar-2.png"),
        hasNotification: false,
    },
    {
        id: "4",
        name: "Nawf El Azam",
        text:
            "Please check the prototype",
        timestamp: 1569109273726,
        avatar: require("../assets/avatars/avatar-3.png"),
        hasNotification: false,
    },
    {
        id: "5",
        name: "Luvleen Lawrence",
        text:
            "Hi...! anyone's there?",
        timestamp: 1569109273726,
        avatar: require("../assets/avatars/avatar-4.png"),
        hasNotification: false,
    },
    {
        id: "6",
        name: "GUCCI Tehran",
        text:
            "Amir: They are looking at lay...",
        timestamp: 1569109273726,
        avatar: require("../assets/avatars/avatar-5.png"),
        hasNotification: true,
        notifications: "7"
    },
    {
        id: "7",
        name: "Leo Knight",
        text:
            "Well, you don’t read this! but I…",
        timestamp: 1569109273726,
        avatar: require("../assets/avatars/avatar-6.png"),
        hasNotification: false,
    },
    {
        id: "8",
        name: "Redhat store!",
        text:
            "Amir Masoud joined the gr…",
        timestamp: 1569109273726,
        avatar: require("../assets/avatars/avatar-7.png"),
        hasNotification: false,
    },
    {
        id: "9",
        name: "Leonardo Oliveira",
        text:
            "Why you’re here?! It’s invisible dada",
        timestamp: 1569109273726,
        avatar: require("../assets/avatars/avatar-8.png"),
        hasNotification: false,
    }
];

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasNotification: posts.hasNotification
        }
    }

    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={post.avatar} style={styles.avatar}></Image>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                        </View>

                        <Text style={styles.deliveryTime}>7:42 PM</Text>

                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.post}>{post.text}</Text>
                        </View>

                        <View>
                            <Text>
                                {/* Adding notification if exists otherwise ignore */}
                                {post.hasNotification ? post.notifications: ''}
                            </Text>
                        </View>

                    </View>

                </View>
            </View>
        )
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* <View style={styles.headerIcon}>
                        <Ionicons name="md-arrow-back" size={24} color="#FFF" style={{ alignSelf: 'flex-start', marginLeft: 30 }}></Ionicons>
                    </View> */}

                    <View style={styles.headerIcon}>
                        <Ionicons name="md-menu" size={24} color="#FFF" style={{ alignSelf: 'flex-end' }}></Ionicons>
                    </View>

                    <View style={styles.headerTitleWrap}>
                        <Text style={styles.headerTitle}>RavenChat</Text>
                    </View>

                </View>

                <FlatList
                    style={styles.feed}
                    data={posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1D2733"
    },
    header: {
        flexDirection: 'row',
        elevation: 2,
        paddingTop: 38,
        paddingBottom: 16,
        backgroundColor: "#212D3B",
        justifyContent: 'space-between',
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerIcon: {
        marginTop: 4,
        marginLeft: 25,
    },
    headerTitle: {
        marginLeft: 30,
        fontSize: 20,
        color: "white",
        fontWeight: "500",
    },
    headerTitleWrap: {
        flex: 1,
        marginLeft: 10
    },
    feed: {
        marginHorizontal: 0
    },
    feedItem: {
        borderRadius: 5,
        padding: 12,
        flexDirection: "row",
        borderBottomColor: "#0D1117",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 25,
        marginRight: 16
    },
    name: {
        fontSize: 16,
        fontWeight: "400",
        color: "#E9EEF4"
    },
    post: {
        marginTop: 4,
        fontSize: 16,
        color: "#7D8B97"
    },
    notifications: {
        backgroundColor: "#5FA3DE",
        width: 25,
        height: 25,
        textAlign: "center",
        marginRight: 5,
        marginTop: 5,
        color: "#FFF",
        alignContent: "flex-end",
        borderRadius: 15
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    },
    deliveryTime: {
        paddingTop: 4,
        fontSize: 12,
        color: "#7D8B97"
    }
})
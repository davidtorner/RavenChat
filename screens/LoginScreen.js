import React, { Component } from 'react'
import { Button, KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, LayoutAnimation, Picker } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { WebView } from 'react-native-webview';

import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyDoob2Bv_Q2pFivBbvW7laWJvBOaVxGtuU",
    authDomain: "chatapp-16e54.firebaseapp.com",
    databaseURL: "https://chatapp-16e54.firebaseio.com",
    projectId: "chatapp-16e54",
    storageBucket: "chatapp-16e54.appspot.com",
    messagingSenderId: "906356887558",
    appId: "1:906356887558:web:d8ad4bc8bd64ee32ea7387"
});

const captchaUrl = 'https://chatapp-16e54.web.app/captcha.html';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            phoneSubmitted: false,
            promptSmsCode: false,
            smsCode: '',
            smsCodeSubmitted: false
        }
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = async user => {
        if (user) {
            const token = await firebase.auth().currentUser.getIdToken();
            if (token) {
                    
            }
        }
    }

    updatePhoneNumber = phoneNumber => this.setState({phoneNumber});
    updateSmsCode = smsCode => this.setState({smsCode});

    onSubmitPhoneNumber = () => this.setState({phoneSubmitted: true});

    onGetMessage = async event => {
        const { phoneNumber } = this.state;
        const message = event.nativeEvent.data;

        switch (message) {
            case "DOMLoaded":
                this.webviewRef.injectJavaScript(`getToken('${phoneNumber}')`);
                return;
            case "ErrorSmsCode":
                // SMS Not sent or Captcha verification failed. You can do whatever you want here
                return;
            case "":
                return;
            default: {
                this.setState({
                    promptSmsCode: true,
                    verificationId: message,
                })
            }
        }
    }

    onSignIn = async () => {
        this.setState({smsCodeSubmitted: true});
        const { smsCode, verificationId } = this.state;
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, smsCode);
        firebase.auth().signInWithCredential(credential);
    }

    render() {
        LayoutAnimation.easeInEaseOut();

        const { phoneSubmitted, phoneNumber, phoneFormat, promptSmsCode, smsCode, smsCodeSubmitted } = this.state;

        if (!phoneSubmitted) return (
            <View style={styles.container}>

                <View style={styles.header}>
                    {/* <View style={styles.headerIcon}>
                        <Ionicons name="md-arrow-back" size={24} color="#FFF" style={{ alignSelf: 'flex-start', marginLeft: 30 }}></Ionicons>
                    </View> */}

                    <View style={styles.headerTitleWrap}>
                        <Text style={styles.headerTitle}>Enter your number</Text>
                    </View>
                    <View style={styles.headerIcon}>
                        <Ionicons name="md-more" size={24} color="#FFF" style={{ alignSelf: 'flex-end' }}></Ionicons>
                    </View>
                </View>

                <StatusBar barStyle="light-content"></StatusBar>

                <Image source={require('../assets/loginLogo.png')} style={{ marginTop: 30, alignSelf: "center" }}></Image>

                <Text style={styles.greeting}>
                    {'RavenChat'}
                </Text>

                <Text style={styles.greetingDesc}>
                    {'We need to send you a SMS-message to verify your phone number.'}
                </Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View style={styles.formInitial}>
                        <View style={styles.pickerWrap}>
                            <Picker
                                selectedValue={this.state.phoneFormat}
                                style={{
                                    height: 40, width: 100, borderBottomColor: "#8A8F9E",
                                    borderBottomWidth: StyleSheet.hairlineWidth, color: "white"
                                }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ phoneFormat: itemValue })
                                }>
                                <Picker.Item label="+46" value="+46" />
                                <Picker.Item label="+47" value="+47" />
                            </Picker>
                        </View>
                        <TextInput
                            placeholder="Enter your phone number..."
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={this.updatePhoneNumber}
                            value={phoneNumber}
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.onSubmitPhoneNumber}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Next</Text>
                </TouchableOpacity>
            </View>
        );

        if (!promptSmsCode) return (
            <WebView
                ref={r => (this.webviewRef = r)}
                source={{ uri: captchaUrl }}
                onMessage={this.onGetMessage}
            />
        )

        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    {/* <View style={styles.headerIcon}>
                        <Ionicons name="md-arrow-back" size={24} color="#FFF" style={{ alignSelf: 'flex-start', marginLeft: 30 }}></Ionicons>
                    </View> */}

                    <View style={styles.headerTitleWrap}>
                <Text style={styles.headerTitle}>Verify {phoneNumber}</Text>
                    </View>
                    <View style={styles.headerIcon}>
                        <Ionicons name="md-more" size={24} color="#FFF" style={{ alignSelf: 'flex-end' }}></Ionicons>
                    </View>
                </View>

                <StatusBar barStyle="light-content"></StatusBar>

                <Image source={require('../assets/loginLogo.png')} style={{ marginTop: 30, alignSelf: "center" }}></Image>

                <Text style={styles.greeting}>
                    {'RavenChat'}
                </Text>
                
                <View style={styles.confirmTextWrap}>
                <Text style={styles.greetingDesc}>
                    Enter the code that was sent to {'\n'} <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
                </Text>
                </View>
                
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View style={styles.formInitialSecond}>
                        <TextInput
                            style={styles.input}
                            textAlign={'center'}
                            placeholder='Verification code'
                            value={smsCode}
                            onChangeText={this.updateSmsCode}
                            mode="outlined"
                            disabled={smsCodeSubmitted}
                            keyboardType='numeric'
                        ></TextInput>
                        <Text style={styles.underInputText}>Enter 6 digit code</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.onSignIn} disabled={smsCodeSubmitted}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        );
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
        marginRight: 30,
    },
    headerTitle: {
        marginLeft: 30,
        fontSize: 20,
        color: "white",
        fontWeight: "500",
    },
    headerTitleWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    greeting: {
        marginTop: -32,
        fontSize: 26,
        fontWeight: "500",
        textAlign: "center",
        color: "white"
    },
    pickerWrap: {
        borderBottomColor: "#7D8B97",
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: 80,
        marginRight: 25
    },
    greetingDesc: {
        fontSize: 16,
        textAlign: "center",
        justifyContent: "center",
        color: "#7D8B97",
        marginHorizontal: 30,
        lineHeight: 18,
        marginTop: 15,
        marginBottom: -20
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginTop: -30,
        marginBottom: 30,
        marginHorizontal: 30,
        alignItems: "center"
    },
    formInitial: {
        flexDirection: 'row',
        alignItems: "center"
    },
    formInitialSecond: {
        flexDirection: 'column',
        alignItems: "center"
    },  
    confirmTextWrap: {
        flexDirection: 'column',
        alignItems: "center",
    },  
    underInputText: {
        color: '#7D8B97',
        fontSize: 14
    },
    phoneNumberText: {
        fontWeight: '500',
        color: 'white'
    },
    inputTitle: {
        color: "white",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: "#7D8B97",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        color: "white",
        fontSize: 15
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#4875CE",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    codeWrap: {
        marginTop: 40
    }
})
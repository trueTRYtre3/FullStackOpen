import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import SignInTab from './SignInTab';

const style = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        backgroundColor: '#24292e',
        display: 'flex',
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 15,
    },
});

const AppBar = () => {
    return ( 
        <View style={style.container}>
            <AppBarTab />
            <SignInTab />
        </View>
    );
};

export default AppBar;
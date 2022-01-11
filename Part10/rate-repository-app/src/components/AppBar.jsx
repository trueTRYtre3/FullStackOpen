import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const style = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        backgroundColor: '#24292e',
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
        </View>
    );
};

export default AppBar;
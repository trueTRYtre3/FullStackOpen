import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const style = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: Constants.statusBarHeight,
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
            <Pressable>
                <Text style={style.text}>Repositories</Text>
            </Pressable>
        </View>
    );
};

export default AppBar;
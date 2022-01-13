import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import SignInTab from './SignInTab';

const style = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        backgroundColor: '#24292e',
    },
});

const AppBar = () => {
    return ( 
        <View style={style.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <AppBarTab />
                <SignInTab /> 
            </ScrollView>
        </View>
    );
};

export default AppBar;
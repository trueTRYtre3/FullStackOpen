import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

const style = StyleSheet.create({
    repositories: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 15,
    },
});

const AppBarTab = () => {
    return (
        <Pressable>
            <Text style={style.repositories}>Repositories</Text>
        </Pressable>
    );
};

export default AppBarTab;

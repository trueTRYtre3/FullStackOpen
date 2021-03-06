import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';

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
            <Link to='/' underlayColor="transparent">
                <Text style={style.repositories}>Repositories</Text>
            </Link>
        </Pressable>
    );
};

export default AppBarTab;

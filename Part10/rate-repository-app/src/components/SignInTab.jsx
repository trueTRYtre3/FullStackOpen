import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const style = StyleSheet.create({
    repositories: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 15,
    },
});

const SignInTab = () => {
    return (
        <Pressable>
            <Link to='/login' underlayColor="transparent">
                <Text style={style.repositories}>Sign In</Text>
            </Link>
        </Pressable>
    );
};

export default SignInTab;
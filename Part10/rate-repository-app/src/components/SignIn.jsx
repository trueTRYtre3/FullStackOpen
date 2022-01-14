import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';

const initialValues = {
    username: '',
    password: '',
};

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 20,
        paddingBottom: 20,
    },
    button: {
        height: 60,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'stretch',
        backgroundColor: '#138acf',
        padding: 5, 
        borderRadius: 5,
        overflow: 'hidden',
    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold',
        textAlign: 'center',
        top: '30%',
    }
})

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.flexContainer}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" />
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const onSubmit = values => {
        console.log('username', values.username);
        console.log('password', values.password);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            { ({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;
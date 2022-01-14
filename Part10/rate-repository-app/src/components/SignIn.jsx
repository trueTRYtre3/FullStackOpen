import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 20,
    },
    button: {
        height: 60,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
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

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup.string()
            .min(2, 'Too short!')
            .max(30, 'Too long')
            .required('Username required'),
    password: yup.string()
            .min(5, 'Too short!')
            .max(30, 'Too long!')
            .required('Password required'),
});

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
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}    
        >
            { ({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;
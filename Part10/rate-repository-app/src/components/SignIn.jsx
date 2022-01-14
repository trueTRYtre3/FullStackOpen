import React from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';

const initialValues = {
    username: '',
    password: '',
};

const SignInForm = ({ onSubmit }) => {
    return (
        <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" />
            <Pressable onPress={onSubmit}>
                <Text>Sign In</Text>
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
import React from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { Formik, useField } from 'formik';

const initialValues = {
    username: '',
    password: '',
};

const SignInForm = ({ onSubmit }) => {
    const [userField, userMeta, userHelper] = useField('username');
    const [passwordField, passwordMeta, passwordHelper] = useField('password');

    return (
        <View>
            
        </View>
    );
};

export default SignIn;
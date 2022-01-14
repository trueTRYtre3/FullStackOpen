import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
    },
    input: {
        height: 60,
        textAlign: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'lightgray',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        borderRadius: 5,
        alignSelf: 'stretch',
    }
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)} 
                value={field.value}
                error={showError}
                style={styles.input}
                name={name}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;
import React from 'react';
import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, error, name, ...props }) => {
    const textInputStyle = [style];
    const inputShow = name === 'password' ? true : false

    return <NativeTextInput secureTextEntry={inputShow} style={textInputStyle} {...props} />
};

export default TextInput;
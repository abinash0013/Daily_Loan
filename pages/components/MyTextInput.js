import React from 'react';
import { View, TextInput } from 'react-native';

const Mytextinput = (props) => {
  return (
    <View
      style={{
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        borderColor: '#999',
        borderWidth: 1, 
        paddingLeft: 10
      }}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#999"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={[props.style,{color:"#000"}]}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};

export default Mytextinput;
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mybutton from './components/MyButton';
import Mytextinput from './components/MyTextInput'
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const RegisterUser = ({ navigation, route }) => {
  let [userName, setUserName] = useState('');
  let [amount, setAmount] = useState('');
  let [date, setDate] = useState('');
  let [status, setStatus] = useState('');

  const { onRegister } = route.params;

  let register_user = () => {
    // console.log(userName, amount, date, status); 
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, amount, date, status) VALUES (?,?,?,?)',
        [userName, amount, date, status],
        (tx, results) => { 
          console.log('Results2', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Record Added Successfully',
              [
                {
                  text: 'Ok',
                  // onPress: () => navigation.navigate('ViewAll'),
                  onPress: () => {
                    onRegister();
                    navigation.goBack();
                  },
                },
              ],
              { cancelable: false }
            );
          } else alert('Sorry, Unable to Add New Records');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{ padding: 5}}
              />
              <Mytextinput
                placeholder="Enter Amount"
                onChangeText={
                  (amount) => setAmount(amount)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 5}}
              /> 
              <Mytextinput
                placeholder="Enter Date"
                onChangeText={
                  (date) => setDate(date)
                }
                maxLength={10} 
                style={{ padding: 5}}
              /> 
              <Mytextinput
                placeholder="Enter status"
                onChangeText={
                  (status) => setStatus(status)
                }
                maxLength={10} 
                style={{ padding: 5}}
              /> 
              {/* <View style={{flex:1, marginBottom:10}}> */}
                <Mybutton title="Submit" customClick={register_user} />
              {/* </View> */}
            </KeyboardAvoidingView>
          </ScrollView>
        </View> 
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
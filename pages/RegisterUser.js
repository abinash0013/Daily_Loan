import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';
import Mybutton from './components/MyButton';
import Mytextinput from './components/MyTextInput'
import { openDatabase } from 'react-native-sqlite-storage';
import DatePicker from './components/DatePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from './utils/formatDateUtils';

var db = openDatabase({ name: 'UserDatabase.db' });

const RegisterUser = ({ navigation, route }) => {
  const [userName, setUserName] = useState('');
  const [amount, setAmount] = useState(''); 
  const [status, setStatus] = useState('');  

  let date = formatDate(new Date().toISOString())
  console.log("currentDateeee", date);

  const { onRegister } = route.params;  

  let register_user = () => {
    if(userName == ""){ 
      ToastAndroid.show("UserName is Mandatory", ToastAndroid.SHORT);
    } else if(amount == ""){
      ToastAndroid.show("Amount is Mandatory", ToastAndroid.SHORT);
    } else if(date == ""){
      ToastAndroid.show("Date is Mandatory", ToastAndroid.SHORT);
    } else if(status == ""){
      ToastAndroid.show("Status is Mandatory", ToastAndroid.SHORT);
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO table_user (user_name, amount, date, status) VALUES (?,?,?,?)',
          [userName, amount, date, status],
          (tx, results) => { 
            console.log('Results2', results.rowsAffected);
            if (results.rowsAffected > 0) { 
              ToastAndroid.show("New Record Added Successfully", ToastAndroid.SHORT);
              onRegister();
              navigation.goBack();
            } else alert('Sorry, Unable to Add New Records');
          }
        );
      });
    }
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
              <View style={{ paddingHorizontal: 15}}> 
                {/* need to un comment if user wants to change date */}
                {/* {showDatePicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                  />
                )}  */}
                <Text
                  style={{
                    alignItems:"center",
                    justifyContent:"center",
                    flexDirection:"row", 
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 15,
                    paddingHorizontal: 10,
                    color:"#000",
                    padding: 10
                  }}
                  // onPress={() => setShowDatePicker(true)}
                >
                  {date}
                </Text>
              </View>  
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
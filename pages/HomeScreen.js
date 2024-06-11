import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Mybutton from './components/MyButton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(50), amount INT(10), date VARCHAR(50), status VARCHAR(50))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "orange"}}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection:"row" }}>  
          <Mybutton
            title="List"
            customClick={() => navigation.navigate('ViewAll')}
          /> 
        </View> 
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ 
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // top: 10
  }, 
  floatingButton: {
    // position: 'absolute',
    // width: 30,
    // height: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
    // right: 30,
    // bottom: 30,
    // backgroundColor: '#6200ee',
    // borderRadius: 30,
    // elevation: 8,
    position: 'absolute',
    // top: 100,
    bottom: 0,
    left: 30,
    backgroundColor: '#1e90ff',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  floatingButtonIcon:{
    fontSize:25,
    color:"#fff"
  }
})

export default HomeScreen;
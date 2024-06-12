import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, Button } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mybutton from './components/MyButton';
import DatePicker from './components/DatePicker';
import { useFocusEffect } from '@react-navigation/native';
import Dropdown from './components/Dropdown';
import { formatDate, getYesterdayDate } from './utils/formatDateUtils';

var db = openDatabase({ name: 'UserDatabase.db' });

const ViewAllUser = ({navigation}) => { 
  const [flatListItems, setFlatListItems] = useState([]); 

  const data = [
    { label: 'Yesterday', value: getYesterdayDate() },
    { label: 'Today', value: new Date().toISOString() },
  ];

  const handleSelect = (item) => {   
    fetchRecordsForDate(formatDate(item.value));
  };

  const fetchRecordsForDate = (date) => {
    console.log("fetchRecordsForDatedate", date);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user WHERE date = ?',
        [date],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) temp.push(results.rows.item(i));
          setFlatListItems(temp);
        },
        (tx, error) => {
          console.log('Error fetching records:', error);
        }
      );
    });
  };

  const loadUsers = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            const item = results.rows.item(i);
            console.log("Row_item:", item); // Log each item
            temp.push(item);
          }
          setFlatListItems(temp);
        }
      );
    });
  };

  useEffect(() => {
    setFlatListItems([]) 
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
 
  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [])
  );
 
  let listItemView = (item, index) => {  
    return (
      <View
        key={index}
        style={{flexDirection:"row", backgroundColor: index % 2 === 0 ? "#fff" : "#e8e6e3"}}
      >
        {/* <Text style={styles.row}>{item.user_id}</Text> */}
        <Text style={styles.row}>{item.user_name}</Text>
        <Text style={styles.row}>{item.amount}</Text>
        <Text style={styles.row}>{item.date}</Text>
        <Text style={styles.row}>{item.status}</Text>  
      </View>
    );
  };

  return (
    <> 
      <View style={{}}>
        <Dropdown label="Select Date:" data={data} onSelect={handleSelect} />  
      </View> 
      <SafeAreaView style={{ flex: 9 }}> 
        <View style={styles.tableContainer}>
          <View style={styles.tableHeaderInnerContainer}>
            {/* <View style={styles.tableHeaderTag}><Text style={styles.tableHeaderText}>Sl.</Text></View> */}
            <View style={styles.tableHeaderTag}><Text style={styles.tableHeaderText}>Name</Text></View>
            <View style={styles.tableHeaderTag}><Text style={styles.tableHeaderText}>Amount</Text></View>
            <View style={styles.tableHeaderTag}><Text style={styles.tableHeaderText}>Date</Text></View>
            <View style={styles.tableHeaderTag}><Text style={styles.tableHeaderText}>Status</Text></View>
          </View>
          <View style={{ flex: 1, marginHorizontal:10 }}>
            <FlatList
              data={flatListItems} 
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => listItemView(item, index)}
            />
          </View> 
        </View>
      </SafeAreaView>
      <View style={{flex:1, marginBottom:11}}>
        <Mybutton
          title="Add New Record"
          customClick={() => navigation.navigate('Register', { onRegister: loadUsers })}
        /> 
      </View>
    </>
  );
};

const styles = StyleSheet.create({  
  row: {
    color:"#000", 
    flex:1, 
    textAlign:"center", 
    borderWidth:1, 
    borderColor:"#000", 
    padding:5
  },
  evenRow: {
    backgroundColor: '#f05555', 
  },
  oddRow: {
    backgroundColor: '#fff',   
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
  },
  tableContainer: {
    flex: 1, 
    backgroundColor: 'white'
  },
  tableHeaderInnerContainer: {
    flexDirection:"row", 
    marginHorizontal:10, 
  },
  tableHeaderTag: {
    flex:1,
    backgroundColor:"#f05555", 
    padding:5, borderColor:"#000", 
    borderWidth:1
  },
  tableHeaderText: {
    color:"#fff", 
    fontWeight:"bold", 
    textAlign:"center"
  }
})

export default ViewAllUser;
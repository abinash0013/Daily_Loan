import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, Button } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Mybutton from './components/MyButton';
import DatePicker from './components/DatePicker';
import { useFocusEffect } from '@react-navigation/native';

var db = openDatabase({ name: 'UserDatabase.db' });

const ViewAllUser = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [flatListItems, setFlatListItems] = useState([]); 
 
  const onChangeDate = (selectedDate) => {
    console.log("selectedDateLo",selectedDate);
    const formattedDate = moment(selectedDate).format("DD/MM/YYYY");
    console.log("formattedDate",moment(selectedDate).format("DD/MM/YYYY"));

    setDate(moment(selectedDate).format("DD/MM/YYYY"));
  };

  // Get today's date
  const today = new Date();

  // Calculate yesterday's date
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const loadUsers = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) temp.push(results.rows.item(i));
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
        <Text style={styles.row}>{item.user_id}</Text>
        <Text style={styles.row}>{item.user_name}</Text>
        <Text style={styles.row}>{item.amount}</Text>
        <Text style={styles.row}>{item.date}</Text>
        <Text style={styles.row}>{item.status}</Text>  
      </View>
    );
  };

  return (
    <> 
      <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}> 
        <View style={{ }}>
          <Text style={{color:"#000", fontWeight:"bold"}}>
            Selected Date: 
            {date.toLocaleDateString()}
          </Text> 
        </View>
        <DatePicker 
          date={date} 
          onChange={onChangeDate} 
          // maximumDate={today}
          minimumDate={yesterday}
        />
      </View>
      <SafeAreaView style={{ flex: 9 }}> 
        <View style={styles.tableContainer}>
          <View style={styles.tableHeaderInnerContainer}>
            <View style={styles.tableHeaderTag}><Text style={styles.tableHeaderText}>Sl. No.</Text></View>
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
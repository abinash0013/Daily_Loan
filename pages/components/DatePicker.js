// DatePicker.js
import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ date, onChange, minimumDate, maximumDate }) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    onChange(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={{margin:10}}>
      <Button onPress={showDatePicker} title="Select date!" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export default DatePicker;

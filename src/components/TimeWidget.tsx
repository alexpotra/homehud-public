// Widget for HomeHUD to display Time and Date.

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

function TimeWidget() {
  const [time, setTime] = useState(Date.now());
  const date = new Date(time);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime(Date.now());
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatAMPM(date)}</Text>
      <Text style={styles.date}>
        {dayNames[date.getDay()] +
          ', ' +
          monthNames[date.getMonth()] +
          ' ' +
          date.getDate()}
      </Text>
    </View>
  );
}

function makeTimeNumber(n: number): string {
  return n.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function formatAMPM(date: Date): string {
  let hours = date.getHours();
  const minutes = makeTimeNumber(date.getMinutes());
  const seconds = makeTimeNumber(date.getSeconds());
  hours = hours > 12 ? hours - 12 : hours;
  return hours + ':' + minutes + ':' + seconds;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  time: {
    fontSize: 140,
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
    color: 'grey',
    textAlign: 'center',
  },
  date: {
    fontSize: 45,
    fontWeight: '300',
    color: 'grey',
    textAlign: 'center',
  },
});

export default TimeWidget;

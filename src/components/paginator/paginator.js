import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const Paginator = ({pages}) => {
  const buttons = pages.map((page, index) =>
    (
      <View key={index}>
        <TouchableOpacity >
          <Text>{page.number}</Text>
        </TouchableOpacity>
      </View>
    )
  )
  return buttons;
}

export default Paginator;

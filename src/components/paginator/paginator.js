import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const Paginator = ({pages, onPageClick}) => {
  const buttons = pages.map((page, index) =>
    (
      <View style={{paddingHorizontal: 10}} key={index}>
        <TouchableOpacity onPress={() => onPageClick(page.number)}>
          <Text style={{fontSize: 25, color: 'blue'}}>{page.number}</Text>
        </TouchableOpacity>
      </View>
    )
  )
  return buttons;
}

export default Paginator;

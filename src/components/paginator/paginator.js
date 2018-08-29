import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const Paginator = ({pages, onPageClick}) => {
  const buttons = pages.map((page, index) =>
    (
      <View style={{paddingHorizontal: 20}} key={index}>
        <TouchableOpacity onPress={() => onPageClick(page.number)}>
          <Text style={{fontSize: page.current ? 30 : 25, color: page.current ? 'black' : 'blue'}}>{page.number}</Text>
        </TouchableOpacity>
      </View>
    )
  )
  return buttons;
}

export default Paginator;

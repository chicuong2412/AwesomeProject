/* eslint-disable react-native/no-inline-styles */
// components/Text/WhiteText.tsx
import React from 'react';
import {Text, TextStyle} from 'react-native';

interface WhiteTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export default function WhiteText({children, style}: WhiteTextProps) {
  return (
    <Text
      style={[
        {
          color: 'white',
          fontFamily: 'DFVNGuardilostra',
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

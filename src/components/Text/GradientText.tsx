import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

type GradientTextProps = {
  text: string;
  fontSize?: number;
};

export default function GradientText({text, fontSize = 48}: GradientTextProps) {
  return (
    <Svg height={fontSize + 10} width="100%">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#C33EEA" />
          <Stop offset="0.33" stopColor="#DC34CE" />
          <Stop offset="0.66" stopColor="#FFD144" />
          <Stop offset="1" stopColor="#FBAA14" />
        </LinearGradient>
      </Defs>
      <SvgText
        fill="url(#grad)"
        fontSize={fontSize}
        fontWeight="bold"
        fontFamily="DFVNGuardilostra"
        x="50%"
        y={fontSize}
        textAnchor="middle">
        {text}
      </SvgText>
    </Svg>
  );
}

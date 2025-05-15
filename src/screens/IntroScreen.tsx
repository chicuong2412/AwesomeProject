import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {StackRootIn} from '../interfaces/interfaces';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type IntroScreenNavigationProp = NativeStackNavigationProp<
  StackRootIn,
  'Intro'
>;

export default function IntroScreen() {
  const navigation = useNavigation<IntroScreenNavigationProp>();

  const handleVideoEnd = () => {
    navigation.navigate('MainStack');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Video
        source={require('../assets/opening/opening.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        onEnd={handleVideoEnd}
        repeat={false}
        muted={false}
        controls={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../constants/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackRootIn} from '../interfaces/interfaces';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<StackRootIn, 'GettingStarted'>;

export default function GettingStartedScreen() {
  const translateX = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -width * 0.2,
          duration: 6000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 6000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.backgroundWrapper, {transform: [{translateX}]}]}>
        <ImageBackground
          source={images.cover}
          style={styles.backgroundImage}
          resizeMode="cover">
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)']}
            style={styles.overlay}
          />
        </ImageBackground>
      </Animated.View>

      <View style={styles.bottomContent}>
        <Image source={images.logoblack} style={styles.logoImage} />
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            navigation.replace('Login');
          }}>
          <LinearGradient
            colors={['#AB8BFF', '#C4C3C3']}
            style={styles.button}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.buttonText}>GETTING STARTED</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: width * 1.2,
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    opacity: 1,
    marginBottom: 20,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

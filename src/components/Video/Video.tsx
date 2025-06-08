/* eslint-disable react-native/no-inline-styles */
import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video, {VideoRef} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

export default function VideoPlayer({url}: {url: string}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = React.useRef<VideoRef | null>(null);

  useEffect(() => {
    async function loadVideo() {
      if (!url.includes('null') && url !== '' && !url.includes('undefined')) {
        videoRef.current?.setSource({
          uri: url,
        });
        setLoading(false);
      }
    }

    loadVideo();
  }, [url]);

  return (
    <>
      {loading && !error && (
        <View className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-2">Loading video...</Text>
        </View>
      )}
      {error && (
        <View className="absolute inset-0 z-20 flex items-center justify-center bg-black/80">
          <Text className="text-red-500 text-lg">Failed to load video.</Text>
        </View>
      )}
      <Video
        ref={videoRef}
        source={{uri: url}}
        controls
        resizeMode="contain"
        style={{
          height: 250,
        }}
        className="w-full bg-primary sticky"
        fullscreenAutorotate={true}
        onFullscreenPlayerWillPresent={() => Orientation.lockToLandscape()}
        onFullscreenPlayerWillDismiss={() => Orientation.lockToPortrait()}
        onLoadStart={() => {
          setLoading(true);
          setError(false);
        }}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </>
  );
}

import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {RouteProp} from '@react-navigation/native';
import {useFetch} from '../../hooks/useFetch';
import {fetchData, fetchDataMovieDetail} from '../../services/DataService';

export default function DetailScreen({
  route,
}: {
  route: RouteProp<StackRootIn, 'Details'>;
}) {
  const {itemId} = route.params;
  console.log(itemId);

  const {data, loading, errors, refetch, reset} = useFetch<MovieDetails>(() => {
    return fetchDataMovieDetail(itemId.toString());
  }, false);
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<View className="bg-primary flex-1">
    <Image source={{
        uri: "https://image.tmdb.org/t/p/original/" + data?.backdrop_path
    }} className='w-full h-[120]' />
    <Text className='text-white'>{data?.overview}</Text>

  </View>);
}

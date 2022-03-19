import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {RootStackParamList} from '../navigation';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

interface ShowScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'Show'> {}

const ShowScreen: React.FC<ShowScreenProps> = ({navigation, route}) => {
  const {state} = useContext(Context)!;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Edit', {id: route.params.id})}>
          <EvilIcons name="pencil" size={35} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, route.params.id]);

  const post = state.find(p => p.id === route.params.id);

  return (
    <View>
      <Text>{post ? post.title : ''}</Text>
      <Text>{post ? post.content : ''}</Text>
    </View>
  );
};

export default ShowScreen;

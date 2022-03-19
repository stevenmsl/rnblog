import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation';
import {Context} from '../context/BlogContext';
import Feather from 'react-native-vector-icons/Feather';

interface IndexScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'Index'> {}

const IndexScreen: React.FC<IndexScreenProps> = ({navigation}) => {
  const context = useContext(Context);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Feather name="plus" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (context === null) {
    return (
      <View>
        <Text>Oops...context is null</Text>
      </View>
    );
  }
  const {state: posts, delPost} = context;

  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={post => post.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Show', {id: item.id})}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => delPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;

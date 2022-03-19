import React, {useContext} from 'react';
import {Context} from '../context/BlogContext';
import BlogPostForm from '../component/BlogPostForm';
import {RootStackParamList} from '../navigation';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
interface CreateScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'Create'> {}
const CreateScreen: React.FC<CreateScreenProps> = ({navigation}) => {
  const context = useContext(Context);
  if (context === null) {
    return (
      <View>
        <Text>Oops...context is null</Text>
      </View>
    );
  }
  const {addPost} = context;

  return (
    <BlogPostForm
      onSumit={(title, content) => {
        addPost(title, content, () => navigation.navigate('Index'));
      }}
    />
  );
};

export default CreateScreen;

import React, {useContext} from 'react';
import {Context} from '../context/BlogContext';
import BlogPostForm from '../component/BlogPostForm';

import {RootStackParamList} from '../navigation';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

interface EditScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'Edit'> {}

const EditScreen: React.FC<EditScreenProps> = ({navigation, route}) => {
  const id = route.params.id;
  const {state, editPost} = useContext(Context)!;
  const post = state.find(p => p.id === id);
  return (
    <BlogPostForm
      initialPost={post}
      onSumit={(title, content) => {
        editPost(id, title, content, () => navigation.pop());
      }}
    />
  );
};

export default EditScreen;

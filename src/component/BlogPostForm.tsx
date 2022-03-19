import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {BlogPost} from '../service';

interface BlogPostFormProps {
  onSumit: (title: string, content: string) => void;
  initialPost?: BlogPost;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({onSumit, initialPost}) => {
  const [title, setTitle] = useState(initialPost ? initialPost.title : '');
  const [content, setContent] = useState(
    initialPost ? initialPost.content : '',
  );

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={text => setContent(text)}
      />
      <Button title="Save" onPress={() => onSumit(title, content)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default BlogPostForm;

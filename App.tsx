import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

interface PictureResponse {
  fileSizeBytes: number;
  url: string;
}

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<PictureResponse | null>(null);

  const loadPicture = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://random.dog/woof.json');
      const responseBody = await response.json();
      setData(responseBody);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPicture();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {isLoading ? (
        <View style={styles.loadingText}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <Image
          source={{uri: data?.url}}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          loadPicture();
        }}>
        <Text style={styles.text}>Show random dog!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
  button: {
    borderWidth: 1,
    width: '60%',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 8,
    marginTop: 10,
  },
  text: {
    fontSize: 22,
    alignSelf: 'center',
  },
});

export default App;

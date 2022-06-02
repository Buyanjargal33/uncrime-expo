import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Button
} from 'react-native';

let test = {};

const getImeiNumber = () =>{
  const IMEI = require('react-native-imei');
  IMEI.getImei().then(imeiList => {
    test = imeiList;
    console.log(test[1]);
  })
}

const requestImeiPermission = async () =>{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      {
        title: "Phone state permission",
        message: "Uncrime App needs access to your phone state",
        buttonNeutral: "Ask me later",
        buttonNegative: "Cancel",
        buttonPositive: "Ok"
      }
    );
    if(granted === PermissionsAndroid.RESULTS.GRANTED){
      try {
        getImeiNumber();
        console.log(typeof(test));
      } catch (error) {
        console.log(error);
      }
    }else{
      console.log("Permission denied");
    }
  } catch (error) {
    console.warn(error);
  }
}


export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={requestImeiPermission}><Text>Click here</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 100,
    width: 200,
    backgroundColor: 'orange',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginLeft: 10
  }
});

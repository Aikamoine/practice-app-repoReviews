import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:token`    
    )
    return accessToken
  }

  async setAccessToken(accessToken) {
    console.log('setting token', accessToken)
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      accessToken,
    );
  }

  async removeAccessToken() {
    console.log('removing token')
    await AsyncStorage.removeItem(`${this.namespace}:token`)
  }
}

export default AuthStorage;
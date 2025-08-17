/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
enableScreens();
if (__DEV__) {
    require("./ReactotronConfig");
}
AppRegistry.registerComponent(appName, () => App);

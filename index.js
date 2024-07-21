/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
LogBox.ignoreLogs(['Warning: ...', 'ERROR: ...']);
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);

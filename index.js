/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
YellowBox.ignoreWarnings([
  'Require cycle:',
]);

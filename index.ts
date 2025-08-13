import 'react-native-get-random-values';
// Para executar o Storybook, comente a linha abaixo e descomente a do Storybook
// import 'expo-router/entry';
import { registerRootComponent } from 'expo';
import StorybookUIRoot from './Storybook';
registerRootComponent(StorybookUIRoot);

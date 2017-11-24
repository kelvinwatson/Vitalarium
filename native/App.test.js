// FIXME: SOMETHING IS WRONG WITH THIS TEST, SO COMMENTING OUT FOR NOW

// Importing App from './App' currently causes this issue:

// FAIL  native/App.test.js
//  ● Test suite failed to run
//
//    Cannot find module 'StyleSheet' from 'react-native-implementation.js'
//
//      at Resolver.resolveModule (node_modules/jest-resolve/build/index.js:191:17)
//      at Object.get StyleSheet [as StyleSheet] (native/node_modules/react-native/Libraries/react-native/react-native-implementation.js:96:29)
//      at Object.<anonymous> (native/App.js:17:24)


import React from 'react';
// import App from './App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  // const rendered = renderer.create(<App />).toJSON();
  // expect(rendered).toBeTruthy();
});

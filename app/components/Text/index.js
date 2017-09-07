import React from 'react';

import { castArray } from 'lodash';
import { Text } from 'react-native';

const fontStyles = [{ fontFamily: 'Futurice' }];

const MyText = ({ children, style, ...props }) => (
  <Text style={[fontStyles.concat(castArray(style))]} {...props} >
    {children}
  </Text>
);

export default MyText;

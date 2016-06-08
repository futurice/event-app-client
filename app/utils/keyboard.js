'use strict';

import React from 'react-native';

/**
 * Call this with a reference to a parent scroll view and a text input
 * on TextInput.onFocus to scroll the parent view up when the keyboard
 * appears. Offset can be provided to control the amount of buffer that
 * should be left between the input and the keyboard
 */
export function onInputFocus(scrollViewRef, inputRef, offset = 90) {
  const PREVENT_NEGATIVE_SCROLL_OFFSET = true;
  setTimeout(() => {
    scrollViewRef
      .getScrollResponder()
      .scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(inputRef),
        offset,
        PREVENT_NEGATIVE_SCROLL_OFFSET
      );
  }, 0);
}

/**
 * Call this with a reference to a parent scrollview on TextInput.onBlur
 * to scroll the view back to its original position
 */
export function onInputBlur(scrollViewRef) {
  scrollViewRef
    .getScrollResponder()
    .scrollResponderScrollTo({x: 0, y:0});
}

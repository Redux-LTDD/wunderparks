import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import { unmountComponentAtNode } from 'react-dom';
// import { act } from 'react-dom/test-utils';

describe('these tests should test react front-end', () => {
  it('this is just a test ', () => {
    const { parsed } = renderHook(() => {
      'console log';
    });
  });
});

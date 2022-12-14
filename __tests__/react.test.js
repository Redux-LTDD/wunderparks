import React from 'React';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../client/components/App';

describe('Testing App component functions and state', () => {
  test('1. The onEvent() function should only call once on App render', () => {
    const props = { test: jest.fn() };
    render(<App {...props} />);
    expect(props.test).toHaveBeenCalledTimes(1);
  });
});

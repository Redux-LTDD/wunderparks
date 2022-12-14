import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import fetch from '../jest-setup';

import App from '../client/components/App.jsx';

describe('these tests should test react front-end', () => {
  test('renders the app', () => {
    const App = (props) => {
      const [codes, setCodes] = useState([]);
      test = jest.fn();

      useEffect(() => {
        test();
        test();
      }, []);

      return (
        <div className='app'>
          {/* <SidebarContainer codes={codes} /> */}
          <div className='right'>
            <div className='float'>
              <h1> WÜNDER PARKS</h1>
            </div>
            {/* <MainContainer codes={codes} /> */}
          </div>
        </div>
      );
    };
    render(<App />);
    expect(test).toHaveBeenCalledTimes(2);
  });

  ////////////////////////////////////////////////////////////////////////////////
  // test('fetch in useEffect returns data', () => {
  //   render(<App />);
  // });

  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('renders user data', async () => {
    const fakeUser = ['acad', 'arch'];
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(JSON.stringify(fakeUser)),
      })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<App />, container);
    });
    expect(document.getElementById(`TEST ${fakeUser[0]}`)).toBe(null);
    expect(document.getElementById(`TEST bisc`)).not.toBe(null);
    global.fetch.mockRestore();
  });

  // test('renders user data', async () => {
  //   const fakeUser = ['acad', 'arch'];
  //   jest.spyOn(global, 'fetch').mockImplementation(() =>
  //     Promise.resolve({
  //       json: () => Promise.resolve(JSON.stringify(fakeUser)),
  //     })
  //   );

  //   // Use the asynchronous version of act to apply resolved promises
  //   await act(async () => {
  //     render(<App />, container);
  //   });
  //   expect(document.getElementById(`TEST bisc`)).not.toBe(null);
  //   global.fetch.mockRestore();
  // });

  //////
  //   beforeEach(() => {
  //     fetch.resetMocks;
  //   });
  //   it('renders user data', async () => {
  //     fetch.mockResponseOnce(JSON.stringify(['acad', 'arch']));
  //     const res = await App.userData;
  //     expect(res).toEqual(['acad', 'arch']);
  //   });
});

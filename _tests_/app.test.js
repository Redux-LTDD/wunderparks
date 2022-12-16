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
import axios from 'axios';
import renderer from 'react-test-renderer';

import fetch from '../jest-setup';
import { BASE_URL, fetchUsers } from '../testUtils.js';
import App from '../client/components/App.jsx';
import * as api from '../client/components/api.js';

describe('testing useEffect', () => {
  test('calls twice on render', () => {
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
});

describe('testings snapshots', () => {
  it('renders correctly according to snapshot', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// describe('testing fetch functionality', () => {
//   let container = null;
//   beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement('div');
//     document.body.appendChild(container);
//   });

//   afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
//   });

//   test('fill with fake fetch data', async () => {
//     const fakeUser = ['acad', 'arch'];
//     jest.spyOn(global, 'fetch').mockImplementation(() =>
//       Promise.resolve({
//         json: () => Promise.resolve(JSON.stringify(fakeUser)),
//       })
//     );

//     // Use the asynchronous version of act to apply resolved promises
//     await act(async () => {
//       render(<App />, container);
//     });
//     expect(document.getElementById(`TEST ${fakeUser[0]}`)).toBe(null);
//     expect(document.getElementById(`TEST bisc`)).not.toBe(null);
//     global.fetch.mockRestore();
//   });
// });

jest.mock('../client/components/api');

describe('mocking the whole app', () => {
  describe('when the call is successful', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should return users list', async () => {
      const fakeUser = ['bgte', 'arch'];

      api.firstFetch.mockResolvedValueOnce(fakeUser);

      render(<App />);
      await waitFor(() => {
        screen.getByText('WÜNDER PARKS Arthur');
      });
    });
  });
});

jest.mock('axios');

// axios utils function to text axios functionality
describe('AXIOS', () => {
  describe('when the call is successful', () => {
    it('should return users list', async () => {
      const fakeUser = ['bgte', 'arch']; //memory location 0

      axios.get.mockResolvedValueOnce(fakeUser);
      // axios.get.mockResolvedValueOnce(['bgte', 'arch']); //memory location 1

      const result = await fetchUsers();
      console.debug(result === fakeUser);

      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/user');
      expect(result).toEqual(fakeUser); //YES //memory location 0
      expect(result).toBe(fakeUser); //YES //memory location 0
      // expect(result).toEqual(['bgte', 'arch']); //YES //memory location 2
      // expect(result).toBe(['bgte', 'arch']); //NO //memory location 3
    });
    describe('when API call fails', () => {
      it('should return empty users list', async () => {
        // given
        const message = 'Network Error';
        axios.get.mockRejectedValueOnce(new Error(message));

        // when
        const result = await fetchUsers();

        // then
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/user');
        expect(result).toEqual([]);
      });
    });
  });
});

// describe('DOM tests', () => {
//   beforeEach(async () => {
//     render(<App />);
//   });
//   test('Title renders correclty', () => {
//     expect(screen.getByRole('header'));
//   });
// });

// getByRole(expectedRole, { name: 'The name' }).

// describe('MOCKING AXIOS on APP', () => {
//   describe('when the APP CALL is successful', () => {
//     it('should return codes', async () => {
//       const fakeUser = ['bgte', 'arch'];

//       axios.get.mockResolvedValueOnce(fakeUser);

//       render(<App />);

//       expect(document.getElementById(`TEST ${fakeUser[0]}`)).toBe(null);
//       expect(document.getElementById(`TEST bisc`)).not.toBe(null);
//     });
//   });
// });

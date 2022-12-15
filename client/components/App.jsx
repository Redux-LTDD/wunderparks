import React, { useEffect, useState, useLayoutEffect } from 'react';
import SidebarContainer from '../containers/SidebarContainer.jsx';
import MainContainer from '../containers/MainContainer.jsx';
import { firstFetch } from './api';

const App = () => {
  // let codes = [];
  const [codes, setCodes] = useState([]);
  const [users, queryUsers] = useState(['Arthur', 'Jacob', 'Max', 'Kyle']);
  const [user, setUser] = useState('Arthur');

  const handleUpdate = (newData) => {
    setData([newData, ...data]);
  };

  useEffect(() => {
    firstFetch(user)
      .then((data) => {
        setCodes(data);
      })
      .catch((err) => console.log('AddPark fetch POST to api: ERROR: ', err));
  }, [user]);

  return (
    <div className='app'>
      <SidebarContainer
        codes={codes}
        users={users}
        user={user}
        setUser={setUser}
      />
      <div className='right'>
        <div className='float'>
          <h1> WÜNDER PARKS {user}</h1>
          {/* <h2>Natty Parks</h2> */}
        </div>
        <MainContainer codes={codes} user={user} />
      </div>
    </div>
  );
};

export default App;

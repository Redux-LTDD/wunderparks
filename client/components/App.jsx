import React, { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';

import SidebarContainer from '../containers/SidebarContainer.jsx';
import MainContainer from '../containers/MainContainer.jsx';

const App = (props) => {
  // let codes = [];
  const [codes, setCodes] = useState([]);

  const handleUpdate = (newData) => {
    setData([newData, ...data]);
  };

  useEffect(() => {
    console.log('CODES HERE++++++++++++++++ ', codes);
    axios
      .get('http://localhost:3000/user/')
      .then((data) => {
        console.log('CODES HERE++++++++++++++++ ', data);
        return setCodes(data);
      })
      .catch((err) => err); //console.log('AddPark fetch POST to api: ERROR: ', err));
  }, []);

  return (
    <div className='app'>
      <SidebarContainer codes={codes} />
      <div className='right'>
        <div className='float'>
          <h1> WÜNDER PARKS</h1>
        </div>
        <MainContainer codes={codes} />
      </div>
    </div>
  );
};

export default App;

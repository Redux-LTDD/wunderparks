import React, { useState, useEffect } from 'react';
import Form from '../components/Form.jsx';
import ParkTally from '../components/ParkTally.jsx';

const SidebarContainer = (props) => {
  return (
    <div key='ignore' className='sidebarContainer'>
      <Form
        codes={props.codes}
        user={props.user}
        users={props.users}
        setUser={props.setUser}
      />
      <ParkTally codes={props.codes} />
    </div>
  );
};

export default SidebarContainer;

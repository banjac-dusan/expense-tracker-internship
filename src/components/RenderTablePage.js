import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Buttons from './Buttons';
import TableComponent from './Table';

const RenderTablePage = () => {
  const [showTable, setShowTable] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    setShowTable(true);
  };

  const handleRoute = () => {
    history.push('/another-page');
  };

  return (
    <div>
      <Buttons onClick={handleClick} />
      {showTable && <TableComponent />}
      <button onClick={handleRoute}>Go to Another Page</button>
    </div>
  );
};

export default RenderTablePage;

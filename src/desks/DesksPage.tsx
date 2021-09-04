import React from 'react'

import DeskForm from './components/DeskForm';

const DesksPage: React.FC = () => {

	return ( 
    <div className="desks-page">
      <h1>Desks page</h1>
      <DeskForm inModal={false} />

      {/* Desk list would have been here if I knew how to pass data between siblings */}
      
    </div>
  )

}

export default DesksPage;
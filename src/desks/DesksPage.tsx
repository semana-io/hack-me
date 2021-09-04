import React from 'react'

import AddDeskForm from './components/AddDeskForm';

const DesksPage: React.FC = () => {
	return ( 
    <div className="desks-page">
      <h1>Desks page</h1>
      <AddDeskForm inModal={false} />
      {/* Desk list would have been here if I knew how to pass data between siblings */}
    </div>
  )
}
export default DesksPage;
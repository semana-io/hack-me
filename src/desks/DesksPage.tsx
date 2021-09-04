/*
  Here :
  1/ Desks list (to add to context)
  2/ Desks form to create view and modify a desk in the list

*/

import React from 'react'
import DesksList from './components/DesksList'

const DesksPage: React.FC = () => {

	return ( 
    <div>Desks page
      <DesksList />
    </div>
  )
}
export default DesksPage;
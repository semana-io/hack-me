import React from 'react'
import { AppContext } from '../core/context/Context';

import DeskForm from './components/DeskForm';
import DesksList from './components/DesksList';

const DesksPage: React.FC = () => {

	return ( 
    <AppContext.Consumer>{
      ({desks}) => {
        return (<div className="desks-page">
            <h1>Desks page</h1>
            <DeskForm inModal={false} />
            <DesksList />
          </div>
        )
      }
    }</AppContext.Consumer>
  )

}

export default DesksPage;
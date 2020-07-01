import React, { Suspense } from 'react';
import './App.css';
import DataSection from './MapPractice/DrawMap/DataSection';
import SpinnerClass from './MapPractice/DrawMap/Spinner.module.css'
import {BrowserRouter,Router} from 'react-router-dom'
// const DataSection = React.lazy(()=>import('./MapPractice/DrawMap/DataSection'))
function App(props) {

  console.log("App.js")

  return [

    <div>
      
        
          <DataSection/>
        
    </div>
    ]
  
}

export default App;

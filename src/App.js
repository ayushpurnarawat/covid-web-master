import React, { Suspense } from 'react';
import './App.css';
import DataSection from './MapPractice/DrawMap/DataSection';
import SpinnerClass from './MapPractice/DrawMap/Spinner.module.css'
import {BrowserRouter,Router} from 'react-router-dom'
import Grid from '../src/MaterialUi/grid'
// const DataSection = React.lazy(()=>import('./MapPractice/DrawMap/DataSection'))
function App(props) {

  console.log("App.js")

  return [

    <div>
        
        <Grid/>
    </div>
    ]
  
}

export default App;

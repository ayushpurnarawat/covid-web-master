import React, { Suspense, useState } from 'react';
import './App.css';
import DataSection from './MapPractice/DrawMap/DataSection';
import SpinnerClass from './MapPractice/DrawMap/Spinner.module.css'
import {BrowserRouter,Router} from 'react-router-dom'
import Grid from '../src/MaterialUi/grid'
import {Paper, ThemeProvider,createMuiTheme} from '@material-ui/core'
import theme from './MaterialUi/theme';
// const DataSection = React.lazy(()=>import('./MapPractice/DrawMap/DataSection'))
function App(props) {
  

  return [

    <div>
         
        <Grid/>
       
    </div>
    ]
  
}

export default App;

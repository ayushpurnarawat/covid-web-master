import React, { Suspense } from 'react';
import './App.css';
// import DataSection from './MapPractice/DrawMap/DataSection';
import SpinnerClass from './MapPractice/DrawMap/Spinner.module.css'
const DataSection = React.lazy(()=>import('./MapPractice/DrawMap/DataSection'))
function App(props) {

  

  return (
    <div className="App" >
      
        {/* <Main/>
        <LineChart/> */}
        {/* <BackGroundMap/> */}
        {/* <HoverMap/> */}
        {/* <TestMap/> */}
        {/* <MapVisulizer/> */}
        {/* <Suspense fallback={<div>Loading.........</div>}>
              <MapStates/>
        </Suspense> */}
        <Suspense fallback={<div className={SpinnerClass.loader}>Loading..</div>}>
        <DataSection/>
        </Suspense>
    </div>
  );
}

export default App;

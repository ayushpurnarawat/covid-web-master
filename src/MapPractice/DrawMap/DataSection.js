import React, { Suspense } from 'react'
import SpinnerClass from './Spinner.module.css'
// import MapStates from './MapStates'
import useSWR from 'swr'
const MapStates = React.lazy(()=>import('./MapStates'))
function DataSection(props)
{
    
    var ResponseData=''
    

    const {data:cases_time_series} = useSWR("https://api.covid19india.org/data.json",url=>
    fetch(url)
    .then(res=>{
        return res.json()
    })
    )
    
    // console.log(cases_time_series)
    if(!cases_time_series)
    return <div className={SpinnerClass.loader} >Loading</div>
    return(
        <div>
            <Suspense fallback={<div className={SpinnerClass.loader}></div>}>
        <MapStates ResponseData={cases_time_series}/>
        </Suspense>
        {ResponseData}
        </div>
    )
}

export default DataSection
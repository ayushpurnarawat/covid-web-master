import React from 'react'

import MapStates from './MapStates'
import useSWR from 'swr'

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
    return <div>Loadind</div>
    return(
        <div>
        <MapStates ResponseData={cases_time_series}/>
        {ResponseData}
        </div>
    )
}

export default DataSection
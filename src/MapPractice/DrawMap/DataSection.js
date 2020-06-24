import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import MapStates from './MapStates'
import useSWR from 'swr'
var total=''
function DataSection(props)
{
    const [ShowData,SetShowData] = useState({
        totalConfirm:{}
    })
    var ResponseData=''
    // Axios.get("https://api.covid19india.org/data.json").then(function(d){
    // console.log(d)
    // Object.d = function(obj){
    //             var size = 0,key
    //             for(key in obj)
    //             {
    //                 if(obj.hasOwnProperty(key))
    //                 size++
    //             }
    //             return size
    
    //         } 
    //         var ObjectSize = Object.d(d.data.cases_time_series)
    //     ResponseData=d.data.cases_time_series[ObjectSize-1].totalconfirmed
    //     console.log(ResponseData)
    // })
    // SetShowData({
    //     totalConfirm:ResponseData
    // })

    // useEffect(()=>{
    //     console.log(ShowData.totalConfirm)
    // },[ResponseData])

    const {data:cases_time_series} = useSWR("https://api.covid19india.org/data.json",url=>
    fetch(url)
    .then(res=>{
        return res.json()
    })
    )
    var size
    console.log(cases_time_series)
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
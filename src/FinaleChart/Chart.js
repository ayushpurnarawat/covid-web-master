import React from 'react'
import * as d3 from 'd3'
import useSWR from 'swr'
import { select } from 'd3'
var TimeConv = d3.timeParse('%d %B %Y')

function Chart(props)
{
    var innerWidth =window.innerWidth
    if(innerWidth<600)
    {
        innerWidth=innerWidth-80
    }
    else
    {
        innerWidth=460
    }
    var t =props.Type
    var DataForChart =[]

    const  {data} =useSWR("https://api.covid19india.org/data.json",url=>
    fetch(url)
    .then(res=>{
        res.json()
    }))
    // var data=true
    if(props.MapRegion==='india'){
    if(props.Type==="dailyconfirmed")
        for(var key in props.IndiaResponse.cases_time_series)
        {
            DataForChart.push({
                Date:props.IndiaResponse.cases_time_series[key].date,
                Confirm:props.IndiaResponse.cases_time_series[key].dailyconfirmed
            })
        }
    else if(props.Type==="dailyrecovered")  
    {
        for(var key in props.IndiaResponse.cases_time_series)
        {
            DataForChart.push({
                Date:props.IndiaResponse.cases_time_series[key].date,
                Confirm:props.IndiaResponse.cases_time_series[key].dailyrecovered
            })
        }
    }
    else if(props.Type==="dailydeceased")
    {
        for(var key in props.IndiaResponse.cases_time_series)
        {
            DataForChart.push({
                Date:props.IndiaResponse.cases_time_series[key].date,
                Confirm:props.IndiaResponse.cases_time_series[key].dailydeceased
            })
        }
    }
    }
    else if(props.MapRegion==='world')
    {
        // if(props.Type==="dailyconfirmed")
        // {
        //     for(var key in props.WorldResponse)
        // {
        //     DataForChart.push({
        //         Date:props.WorldResponse[key]["Last Update"],
        //         Confirm:props.WorldResponse[key]["Total Cases_text"]
        //     })
        // }
        // }

    }
    function mouseover(d)
    {
        // console.log(d)
        d3.select(`.January${props.TypeID}`)
        .attr("stroke","green")
        d3.select(this)
        .attr("stroke",function(d,i){
            console.log(d[i].Confirm)
            return ["orange","green","red"]
        })
    }
        // d3.select("#ChartS")
        // .select("svg")
        // .remove()
    
        d3.select(`#${props.TypeID}`)
            .select("svg").remove()
        var svg =d3.select(`#${props.TypeID}`)
        .append("svg")
        .attr("height","250px")
        .attr("width","100%")
        .style("background-color",props.background)
        .style("border-radius","5px")
    var X_AXIS = d3.scaleUtc()
                .range([0,innerWidth])
                .domain(d3.extent(DataForChart,function(d){
                    var month = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
                    var date = TimeConv(d.Date+"2020")
                    // var fulldate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
                    return date}))
              
    var scale = d3.axisBottom(X_AXIS)
                // .tickFormat(d3.timeFormat('%m'))
                .scale(X_AXIS)               
        
        svg.append("g")
        .call(scale)
        .attr("transform","translate(30,200)")
           

    var Y_AXIS = d3.scaleLinear()
                .range([200,0])
                .domain([0,d3.max(DataForChart,function(d){
                    // console.log((d.Confirm).replace(",","").replace(",",""))
                    return parseInt((d.Confirm).replace(",","").replace(",",""))
                })])
                // .domain([0,25000])
        svg.append("g")
            .call(d3.axisLeft(Y_AXIS).ticks(10,"~s"))
            .attr("transform","translate(40,0)")
            
        svg.append("path")
            .datum(DataForChart)
            .attr("fill","rgb(209,141,128,.5)")
            .attr("stroke","black")
            .attr("stroke-width","1.5")
            .attr("transform","translate(40,0)")
            .attr("width","50%")
            .attr("d",d3.area()
        

            .x(function(d){
                 
                var month = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
                var date = TimeConv(d.Date+"2020")
                return X_AXIS(date)})
            .y0(Y_AXIS(0))
            .y1(function(d){
                return Y_AXIS((d.Confirm).replace(",","").replace(",",""))})
            )
            .attr("class",function(d,i){
                var month = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

                console.log(month[i])
                return month[i]+props.TypeID
            })
            .on("mouseover",mouseover)
    
    if(!data)
    return <div></div>
    return(
        <div id={"ChartS"}>

        </div>
    )
}

export default Chart
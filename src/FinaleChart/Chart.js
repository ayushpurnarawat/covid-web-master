import React from 'react'
import * as d3 from 'd3'
import useSWR from 'swr'
var TimeConv = d3.timeParse('%d %B %Y')

function Chart(props)
{
    console.log("Chart")
    var DataForChart =[]

    const  {data} =useSWR("https://api.covid19india.org/data.json",url=>
    fetch(url)
    .then(res=>{
        res.json()
    }))
    // var data=true
    
    
        for(var key in props.IndiaResponse.cases_time_series)
        {
            DataForChart.push({
                Date:props.IndiaResponse.cases_time_series[key].date,
                Confirm:props.IndiaResponse.cases_time_series[key].dailyconfirmed
            })
        }
        
    
        d3.select("#Chart")
        .select("svg")
        .remove()
    
        d3.select("#Chart")
            .select("svg").remove()
    var svg =d3.select("#Chart")
        .append("svg")
        .attr("height","400px")
        .attr("width","300px")
        .attr("fill","rgb(232,143,123)")
    var X_AXIS = d3.scaleUtc()
                .range([0,250])
                .domain(d3.extent(DataForChart,function(d){
                    var month = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
                    var date = TimeConv(d.Date+"2020")
                    var fulldate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
                    return date}))
              
    var scale = d3.axisBottom(X_AXIS)
                // .tickFormat(d3.timeFormat('%m'))
                .scale(X_AXIS)               
        
        svg.append("g")
        .call(scale)
        .attr("transform","translate(20,250)")
           

    var Y_AXIS = d3.scaleLinear()
                .range([250,0])
                // .domain([0,d3.max(DataForChart,function(d){
                //     console.log(d.Confirm)
                //     return d.Confirm
                // })])
                .domain([0,25000])
        svg.append("g")
            .call(d3.axisLeft(Y_AXIS))
            .attr("transform","translate(40,0)")
            
        svg.append("path")
            .datum(DataForChart)
            .attr("fill","red")
            .attr("stroke","green")
            .attr("stroke-width","1.5")
            .attr("d",d3.area()
            .x(function(d){
                 
                var month = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
                var date = TimeConv(d.Date+"2020")
                return X_AXIS(date)})
            .y0(Y_AXIS(0))
            .y1(function(d){
                return Y_AXIS(d.Confirm)})
            )
    
    if(!data)
    return <div></div>
    return(
        <div>

        </div>
    )
}

export default Chart
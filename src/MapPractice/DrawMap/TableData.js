import React, { useState, useEffect } from 'react'
import classes from './MapStates.module.css'
import * as d3 from 'd3'

import Spinner from './Spinner.module.css'
import useSWR from 'swr'
import {Link,Router} from 'react-router-dom'
function TableData(props){
    // console.log("TableData")
    var districtDataArrat ={}
    var Button_AddedArrat = []
    const [StateData,SetStateData] =useState({
        State_name:'',
        Confirmed:'',
        recovered:'',
        active:'',
        deaths:'',
        toggel:false,
        ButtonAdded:null,
        showDistrict:false
    })

    const [CountryData,SetCountryData]= useState({
        Country_text:'',
        Total_Confirm:'',
        Total_Active:'',
        Total_Recoverd:'',
        Total_Death:''
    })
    var show =[]
    
    const {data} = useSWR(props.Link,url=>
            fetch(url)
            .then(res=>{
                // console.log(res)
                return res.json()
            })
        )
        
    // const {data:dos} =useSWR("https://api.covid19india.org/state_district_wise.json",url=>
    //         fetch(url)
    //         .then(res=>{
    //             return res.json()
    //         })
    //         )
    function onTouch(event){
        // event.prevent.default();
        var ID= parseInt(event.target.id)
        var d=props.data["statewise"]
        
        if(!isNaN(ID)){
            // console.log(d[ID],"===",ID)
            
            SetStateData({
                State_name:d[ID].state,
                Confirmed:d[ID].confirmed,
                recovered:d[ID].recovered,
                active:d[ID].active,
                deaths:d[ID].deaths,
                toggel:true
    
            })
        }
    }
    function WorldMouseOver(event){
        // console.log(event.target.id)
        var ID =parseInt(event.target.id)
        // console.log(data)
        if(!isNaN(ID)){
            // console.log(d[ID],"===",ID)
            
            SetCountryData({
                Country_text:data[ID].Country_text,
                Total_Active:data[ID]['Active Cases_text'],
                Total_Confirm:data[ID]['Total Cases_text'],
                Total_Recoverd:data[ID]['Total Recovered_text'],
                Total_Death:data[ID]['Total Deaths_text']
            })
    }
    }
    function DistrictDataCall(event){
        SetStateData({
            showDistrict:true
        })
        
        var district ="_district"
        var classNameForEl = props.data.statewise[event.target.id].state
        var checkclass = document.getElementsByClassName(district)

    if(checkclass.length===0){
         var div =document.getElementById(event.target.id)
         var statemeta =document.getElementById("state-meta")
    var el =  document.createElement("div")
        el.className=district
        el.style="display:flex;justify-content: flex-end;"
        el.id=district
    // el.innerText("Helllkodfj")
    div.parentNode.insertBefore(el,div.nextSibling)
    d3.select("."+district)
        .append("div")
        .attr("class",district+"_button")
        
        .text("More detail of"+classNameForEl)
        .style("width","120px")
        .style("height","40px")
        var SelectParent =document.getElementById(district)
        var LINK =document.createElement("Link")
        
        // var linkadd = new linkadd()
    
        
    }
    else if(checkclass.length ===1)
    {
        d3.select("."+district)
            .remove()
    }
    // SetStateData({
    //     ButtonAdded:'<Link to="/abc"><button>hello</button></Link>'
    // })
    Button_AddedArrat.push(<Link to="/abc"><button>hello</button></Link>)
    }
    
    function CountryMouseLeave(){
        try{
            var country = ((CountryData.Country_text).replace(" ","").replace(" ","")+"TableData")
            d3.selectAll("."+country)
            // d3.selectAll(".rajasthan")
                .transition()
                .duration(200)
                .style("stroke","transparent")
            }
            catch{
                console.log("SelectorCatch")
            }
    }

    useEffect(()=>{
        d3.select("#confirm_data")
            .text(CountryData.Total_Confirm)
        d3.select("#active_data")
        .text(CountryData.Total_Active)
        d3.select("#recover_data")
        .text(CountryData.Total_Recoverd)
        d3.select("#death_data")
        .text(CountryData.Total_Death)
        d3.select("#state_data")
        .text(CountryData.Country_text)

        var country = ((CountryData.Country_text).replace(" ","").replace(" ","")+"_TableData")
        try{
        d3.selectAll("."+country)
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("stroke", "blue")
                    .text("hello")
                    .style("color","white")
        }
        catch{
            console.log("error")
        }
    },[CountryData])


    function ch(event){
        var ID= parseInt(event.target.id)
       

        // console.log(event.target.id)
        // console.log(data.statewise)
        var d=data["statewise"]

        if(!isNaN(ID)){
        // console.log(d[ID],"===",ID)
        
        SetStateData({
            State_name:d[ID].state,
            Confirmed:d[ID].confirmed,
            recovered:d[ID].recovered,
            active:d[ID].active,
            deaths:d[ID].deaths,
            toggel:true

        })
    }
    }
   function MouseLeave(event){
        
        try{
        var state = ((StateData.State_name).replace(" ","").toLowerCase())
        d3.selectAll("."+state)
        // d3.selectAll(".rajasthan")
            .transition()
            .duration(200)
            .style("stroke","transparent")
        }
        catch{
            console.log("SelectorCatch")
        }
    }
    useEffect(()=>{
     
        if(StateData.toggel){
            
        d3.select("#confirm_data")
            .text(StateData.Confirmed)
        d3.select("#active_data")
        .text(StateData.active)
        d3.select("#recover_data")
        .text(StateData.recovered)
        d3.select("#death_data")
        .text(StateData.deaths)
        d3.select("#state_data")
        .text(StateData.State_name)
            // console.log((StateData.State_name).replace(" ","").toLowerCase())
        // d3.selectAll(`.${(StateData.State_name).replace(" ","").toLowerCase()}`)
        var state = ((StateData.State_name).replace(" ","").toLowerCase())
       
        d3.selectAll("."+state)
        
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("stroke", "black")
           
        }

    },[StateData])
    
    
    if(props.MapRegion==='world')
    {
        
            for(var key in data)
            {
                if(key!=='0')
                {
                    try{
                    show.push(
                        <div className={classes.Table_Cell_Data } 
                        key={key} 
                        // id={(data[key].Country_text).replace(" ","").replace(" ","")+"_TableData"}
                        id={key}
                        confirmed={data[key]['Total Cases_text']}
            
                        onMouseOver={(event)=>WorldMouseOver(event)}
                        onTouchStart={onTouch}
                        onMouseLeave={(event)=>CountryMouseLeave(event)}
                        style={{height:'30%'}}
                        >
                        
                        <div  className={classes.Cell_Data} style={{width:"50%",height:'60%'}} >{data[key].Country_text}</div>
                        <div  className={classes.Cell_Data} style={{width:'12.5%'}}>{data[key]['Total Cases_text']}</div>
                        <div  className={classes.Cell_Data} style={{width:'12.5%'}}>{data[key]['Active Cases_text']}</div>
                        <div  className={classes.Cell_Data} style={{width:'12.5%'}}>{data[key]['Total Recovered_text']}</div>
                        <div  className={classes.Cell_Data} style={{width:'12.5%'}}>{data[key]['Total Deaths_text']}</div>
                        </div>)
                    }
                    catch{

                    }
                }
            }
        
    }
    else{
        try{
    for(var key in data.statewise)
    {
        
        if(key!=='0')
        {
            show.push(
            <div className={"Hello",classes.Table_Cell_Data} 
            key={data.statewise[key].state} 
            // id={props.data.statewise[key].state+"_TableData"}
            id={key}
            confirmed={data.statewise[key].confirmed}
            onClick={(event)=>DistrictDataCall(event)}
            onMouseOver={(event)=>ch(event)}
            onTouchStart={onTouch}
            onMouseLeave={(event)=>MouseLeave(event)}
            style={{height:'30%'}}
            >
            
            <div id={key} can={data.statewise[key].state} className={classes.Cell_Data} style={{width:"50%",height:'60%'}} >{data.statewise[key].state}</div>
            <div id={key} can={data.statewise[key].state} className={classes.Cell_Data} style={{width:'12.5%'}}>{data.statewise[key].confirmed}</div>
            <div id={key} can={data.statewise[key].state} className={classes.Cell_Data} style={{width:'12.5%'}}>{data.statewise[key].active}</div>
            <div id={key} can={data.statewise[key].state} className={classes.Cell_Data} style={{width:'12.5%'}}>{data.statewise[key].recovered}</div>
            <div id={key} can={data.statewise[key].state} className={classes.Cell_Data} style={{width:'12.5%'}}>{data.statewise[key].deaths}</div>
            {/* <div><Router> <Link to="/abc"><button>hello</button></Link></Router></div> */}

            </div>)
            
        }
    }
    }
    catch{

    }
}
    if(!data)
    return <div className={Spinner.loader}></div>
    return(
        <div id="update"style={{display:'flex',flexDirection:'column'}}>
        
        {show}
        {StateData.showDistrict&&(<div id="state-meta">district</div>)}

        </div>
    )
}
export default TableData
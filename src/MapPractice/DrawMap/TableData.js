import React, { useState, useEffect } from 'react'
import classes from './MapStates.module.css'
import * as d3 from 'd3'
import Events from './Events'
import Display from './Display'
function TableData(props){
    // console.log(props.data.tested)
    const [StateData,SetStateData] =useState({
        State_name:'',
        Confirmed:'',
        recovered:'',
        active:'',
        deaths:'',
        toggel:false
    })
    function onTouch(event){
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
    function ch(event){
        var ID= parseInt(event.target.id)
        console.log(ID)

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
   function MouseLeave(event){
        // d3.selectAll(`.${StateData.State_name}`)
        // .transition()
        // .duration(100)
        // .style("stroke", "transparent")
        console.log(StateData.State_name)
        d3.selectAll(("."+(StateData.State_name).replace(" ","").toLowerCase()))
        // d3.selectAll(".rajasthan")
            .transition()
            .duration(200)
            .style("stroke","transparent")
    }
    useEffect(()=>{
        console.log('effect')
//      return   (<Display state_Name={StateData.State_name} 
//         Confirm={StateData.Confirmed}
    
//         ActiveCases={StateData.active} Recoverd={StateData.recovered}
//     Death={StateData.deaths}
//  />)
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
            console.log((StateData.State_name).replace(" ","").toLowerCase())
        // d3.selectAll(`.${(StateData.State_name).replace(" ","").toLowerCase()}`)
        d3.selectAll(("."+(StateData.State_name).replace(" ","").toLowerCase()))
        // d3.selectAll(".rajasthan")
                    // .transition()
                    // .duration(200)
                    // .style("opacity", .5)
                    // d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("stroke", "black")
        }

    },[StateData])
    var show =[]
    for(var key in props.data.statewise)
    {
        if(key!=='0')
        {
            show.push(
            <div className={classes.Table_Cell_Data} 
            key={props.data.statewise[key].state} 
            id={key}
            
            confirmed={props.data.statewise[key].confirmed}

            onMouseOver={(event)=>ch(event)}
            onTouchStart={onTouch}
            onMouseLeave={(event)=>MouseLeave(event)}
            style={{height:'30%'}}
            >
            
            <div className={classes.Cell_Data} style={{width:"50%",height:'60%'}} >{props.data.statewise[key].state}</div>
            <div className={classes.Cell_Data} style={{width:'12.5%'}}>{props.data.statewise[key].confirmed}</div>
            <div className={classes.Cell_Data} style={{width:'12.5%'}}>{props.data.statewise[key].active}</div>
            <div className={classes.Cell_Data} style={{width:'12.5%'}}>{props.data.statewise[key].recovered}</div>
            <div className={classes.Cell_Data} style={{width:'12.5%'}}>{props.data.statewise[key].deaths}</div>
            </div>)
        }
    }
    // if(StateData.toggel)
    // {
    //     return (
    //         <div>
    //         <Display state_Name={StateData.State_name} 
    //     Confirm={StateData.Confirmed}
    
    //     ActiveCases={StateData.active} Recoverd={StateData.recovered}
    // Death={StateData.deaths}
    //     />
    //         </div>
    //     )
    // }
    return(
        <div id="update"style={{display:'flex',flexDirection:'column'}}>
        
        {show}
        
        </div>
    )
}
export default TableData
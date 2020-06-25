import React from 'react'
import classes from './MapStates.module.css'
function TableData(props){
    console.log(props.data.tested)
    var show =[]
    for(var key in props.data.statewise)
    {
        if(key!=='0')
        {
            show.push(
            <div className={classes.Table_Cell_Data} key={props.data.statewise[key].state}>
            <div className={classes.Cell_Data} style={{width:"50%"}}>{props.data.statewise[key].state}</div>
            <div className={classes.Cell_Data} style={{width:'12.5%'}}>{props.data.statewise[key].confirmed}</div>
            <div className={classes.Cell_Data} style={{width:'12.5%'}}>{props.data.statewise[key].active}</div>
            <div className={classes.Cell_Data} style={{width:'12.5%'}}>{props.data.statewise[key].recovered}</div>
            <div className={classes.Cell_Data} style={{width:'12.5%'}}>{props.data.statewise[key].deaths}</div>
            </div>)
        }
    }
    return(
        <div style={{display:'flex',flexDirection:'column'}}>
        {show}
        </div>
    )
}
export default TableData
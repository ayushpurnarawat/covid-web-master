import React, { useState } from 'react'
import useSWR from 'swr'
import classes from './MapStates.module.css'
import SpinnerClass from './Spinner.module.css'
function TotalData(props){
    // console.log("TatalDATA")
    const {data} =useSWR(props.Link,url=>{
        fetch(url)
        .then(res=>{
            return res.json()
        })
    })
    var totalDataArray=[]

    if(data)
    {
        if(props.Country==='india')
        totalDataArray.push({
            totalconfirmed:data.statewise[0].confirmed,
            totalrecovered:data.statewise[0].recovered,
            totaldeceased:data.statewise[0].deaths,
            totalactive:data.statewise[0].active,
            Country:props.Country
        }) 
        else if(props.Country==='world')
        {
            totalDataArray.push({
                totalconfirmed:data[0]['Total Cases_text'],
            totalrecovered:data[0]['Total Recovered_text'],
            totaldeceased:data[0]['Total Deaths_text'],
            totalactive:data[0]['Active Cases_text'],
            Country:props.Country
            })
        }
    }
    
    // if(!data)
    // return <div className={SpinnerClass.loader}>loading</div>
    return(
        <div  className={classes.CurrentData}>
                                             
                    {/* <div className={classes.Change_Country}>
                            <h3 style={{color:'green'}}>{totalDataArray.map(function(d){return d.Country})}</h3>
                            <div className={classes.Change_Country_HighLight}>
                                    <h3 className={classes.ConfirmCases_p}>Country</h3>
                            </div>
                    </div> */}
                    
                    <div className={classes.ConfirmCases}>
                            
                            <div className={classes.ActiveCases_number}>
                            <h2 className={classes.ActiveCases_h}>{totalDataArray.map(function(d){return d.totalconfirmed})}</h2>
                            </div>
                            <div className={classes.ConfirmCases_HighLight}>
                            
                                <h3 className={classes.ConfirmCases_p}>Confirm</h3>
                            </div>
                    </div>
                    <div className={classes.ActiveCases}>
                           
                            <div className={classes.ActiveCases_number}>
                            <h2 className={classes.ActiveCases_h}>{totalDataArray.map(function(d){return d.totalrecovered})}</h2>

                            </div>
                            <div className={classes.ActiveCases_HighLight}>
                            <h3 className={classes.ActiveCases_h}>Active</h3>
                            </div>
                    </div>
                    
                    <div className={classes.Recover}>
                            
                            <div className={classes.Recover_number}>
                            <h2 className={classes.Recover_h}>
                                {totalDataArray.map(function(d){return d.totalrecovered})}
                            </h2>
                            </div>
                            <div className={classes.Recover_HighLight}>
                            <h3 className={classes.Recover_h}>Recover</h3>
                            </div>

                    </div>
                    <div className={classes.Deceased}>
                        {/* <h3 className={classes.Deceased_h}>Deceased</h3>
                        <h2 className={classes.Deceased_h}>1000</h2> */}
                        <div className={classes.Deceased_number}>                        
                            <h2 className={classes.Deceased_h}>
                            {totalDataArray.map(function(d){return d.totaldeceased})}
                        </h2>
                        </div>

                        <div className={classes.Deceased_HighLight}>
                        <h3 className={classes.Deceased_h}>Deceased</h3>
                        </div>

                    </div>
                    </div>
    )
}
export default TotalData
import React, { Component, useRef, useEffect, Suspense } from 'react'
import TestMap from './ma'
import classes from './MapStates.module.css'
import Axios from 'axios'
import LoliPopChart from '../../FinaleChart/LolliPopChart'
import BarPlot from '../../FinaleChart/BarPlot'
import * as d3 from 'd3'
import { timeDay, timeout } from 'd3'
import Sus from './SuspenseData'
// const SuspenseComponent = React.lazy(()=>import('./SuspenseData'))
var totalconfirmed=0
var totalrecovered=0
var totaldeceased=0
var size =0
class MapStates extends Component{
    state = {
        done:false,
        totalconfirmed:0,
        totalrecovered:0,
        totaldeceased:0,
        totalactive:0


    }

    componentDidMount(){
        this.ObjectSize()
    }
    ObjectSize(){
        Object.d = function(obj){
            var size = 0,key
            for(key in obj)
            {
                if(obj.hasOwnProperty(key))
                size++
            }
            return size

        } 
        var ObjectSize = Object.d(this.props.ResponseData.cases_time_series)
        console.log(ObjectSize)
        size=ObjectSize
        for(var key in this.props.ResponseData.cases_time_series)
        {
            this.setState({
                totalconfirmed:this.props.ResponseData.cases_time_series[key].totalconfirmed,
                totalrecovered:this.props.ResponseData.cases_time_series[key].totalrecovered,
                totaldeceased:this.props.ResponseData.cases_time_series[key].totaldeceased,
                totalactive:this.props.ResponseData.cases_time_series[key].totalconfirmed-this.props.ResponseData.cases_time_series[key].totalrecovered-this.props.ResponseData.cases_time_series[key].totaldeceased
            })
        }
        // this.setState({
        //     ref:ObjectSize
        // })
    }
    render()
    {
        // this.TimeOut()
        return(
            <div id="MapStates" className={classes.main}>
                <div id='DataSection' className={classes.DataSection} >
                    <div style={{display:'flex',flexDirection:'row',height:'200px',flex:'1',marginTop:'10%'}}>
                                             
                    <div className={classes.Change_Country}>
                            <div className={classes.Change_Country_HighLight}>
                                    <h3 className={classes.ConfirmCases_p}>Country name</h3>
                            </div>
                    </div>
                    
                    <div className={classes.ConfirmCases}>
                            {/* <h3 className={classes.ConfirmCases_p}>Confirm</h3>
                            <h2 className={classes.ConfirmCases_p}>420000</h2> */}
                            <div className={classes.ActiveCases_number}>
                            <h2 className={classes.ActiveCases_h}>{this.state.totalconfirmed}</h2>
                            </div>
                            <div className={classes.ConfirmCases_HighLight}>
                            
                                <h3 className={classes.ConfirmCases_p}>Confirm</h3>
                            </div>
                    </div>
                    <div className={classes.ActiveCases}>
                            {/* <h3 className={classes.ActiveCases_h}>Actice</h3>
                            <h2 className={classes.ActiveCases_h}>450003</h2> */}
                            <div className={classes.ActiveCases_number}>
                            <h2 className={classes.ActiveCases_h}>{this.state.totalactive}</h2>

                            </div>
                            <div className={classes.ActiveCases_HighLight}>
                            <h3 className={classes.ActiveCases_h}>Active</h3>
                            </div>
                    </div>
                    
                {/* <div style={{display:'flex',marginTop:'-210px'}}> */}
                    <div className={classes.Recover}>
                            {/* <h3 className={classes.Recover_h}>Recover</h3>
                            <h2 className={classes.Recover_h}>320000</h2> */}
                            <div className={classes.Recover_number}>
                            <h2 className={classes.Recover_h}>
                                {this.state.totalrecovered}
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
                            {this.state.totaldeceased}
                        </h2>
                        </div>

                        <div className={classes.Deceased_HighLight}>
                        <h3 className={classes.Deceased_h}>Deceased</h3>
                        </div>

                    </div>
                    </div>
                    {/* <div className={classes.LoliPopChart} id={LoliPopChart}> */}
                        {/* <LoliPopChart/> */}
                    {/* </div> */}
                    {/* <Suspense fallback={<div><h1>LOADING</h1></div>}>
                        <SuspenseComponent/>
                    </Suspense> */}
                    
                </div>
                <div id="MapSection" className={classes.MapSection}>
                
                    <div id="Map_data" className={classes.Map_data}>
                    <TestMap MapRegion={"india"}/>
                    </div>
                    
                        
                </div>
                {/* <LoliPopChart /> */}
                {/* <BarPlot/> */}
            </div>
        )
    }
}
export default MapStates
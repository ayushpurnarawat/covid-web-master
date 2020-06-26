import React, { Component, Suspense } from 'react'
// import TestMap from './ma'
import classes from './MapStates.module.css'
import LoliPopChart from '../../FinaleChart/LolliPopChart'
// import TableData from './TableData'
import SpinnerClass from './Spinner.module.css'
import Events from './Events'
const TableData = React.lazy(()=>import('./TableData'))
const TestMap = React.lazy(()=>import('./ma'))
var size =0
class MapStates extends Component{
    state = {
        done:false,
        totalconfirmed:0,
        totalrecovered:0,
        totaldeceased:0,
        totalactive:0,
        Country:'india'

    }
    ChangeCountryByButton_India=()=>{
        this.setState({
            Country:'india'
        })
    }
    ChangeCountryByButton=()=>{
        console.log("click [ChangeCountry] ")
        this.setState({
            Country:"world"
        })
    }
    componentDidMount(){
        this.ObjectSize()
    }
    ObjectSize(){
        
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
                    <div  className={classes.CurrentData}>
                                             
                    <div className={classes.Change_Country}>
                            <div className={classes.Change_Country_HighLight}>
                                    <h3 className={classes.ConfirmCases_p}>Country</h3>
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
                    
                    {/* <div id="LoliPopChart_div" className={classes.LoliPopChart_div}>
                    <LoliPopChart/>
                    </div> */}
                    <div className={classes.TableView} > 
                        <div className={classes.Table_Row_Heading}>
                            <div className={classes.Cell_Heading} style={{width:'12.5%'}} >Confirm</div>
                            <div className={classes.Cell_Heading} style={{width:'12.5%'}}>Active</div>
                            <div className={classes.Cell_Heading} style={{width:'12.5%'}}>Recover</div>
                            <div className={classes.Cell_Heading} style={{width:'12.5%'}}>Deaths</div>
                        </div>
                <Suspense fallback={<div className={SpinnerClass.loader}>Loading..</div>}>
                        <TableData data={this.props.ResponseData}/>
                        </Suspense>
                    </div>
                    
                </div>
                <div id="MapSection" className={classes.MapSection} >
                    <div id="Map_data" className={classes.Map_data}>
                    {/* <button onClick={this.ChangeCountryByButton_India} id="ChangeCountryByButton_India">India</button> */}
                    <button onClick={this.ChangeCountryByButton} id="Change_Country_Button" className='Change_Country_Button'>GLobal</button>

                        <Suspense fallback={<div className={SpinnerClass.loader}>Loading..</div>}>
                    <TestMap MapRegion={this.state.Country}/>
                    </Suspense>
                    </div>
                    {/* <div id="MapVisuality"></div> */}

                </div>
                {/* <LoliPopChart /> */}
                {/* <BarPlot/> */}
            </div>
        )
    }
}
export default MapStates
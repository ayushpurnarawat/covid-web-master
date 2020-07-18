import React, { Component, Suspense } from 'react'
import classes from '../MapPractice/DrawMap/MapStates.module.css'
import SpinnerClass from '../MapPractice/DrawMap/Spinner.module.css'
import { Container } from '@material-ui/core'
// import Chart from '../../FinaleChart/Chart'
// import TotalData from './TotalData'
// import BarChart from '../../FinaleChart/BarChart'
// import TableData from './TableData'
const Chart = React.lazy(()=>import("../FinaleChart/Chart"))
const BarChart = React.lazy(()=>import("../FinaleChart/BarChart"))
const TestMap = React.lazy(()=>import('../MapPractice/DrawMap/ma'))
const TotalData = React.lazy(()=>import('../MapPractice/DrawMap/TotalData'))
var size =0
var SwitchMap ="World"
var link ="https://api.covid19india.org/data.json"
class MapPart extends Component{
    
    state = {
        done:false,
        totalconfirmed:0,
        totalrecovered:0,
        totaldeceased:0,
        totalactive:0,
        Country:'india',
        Link:"https://api.covid19india.org/data.json",
        Change_Map_Name:'world'

    }
    
    
    ChangeCountryByButton=(Country,Link)=>{
        // var response =Swr()
        // if(response)
        // console.log(response)
        if(Country==='india')
        {
            Country='world'
            Link="https://covid-19.dataflowkit.com/v1"
            SwitchMap='india'
        }
        else{
            Country='india'
            Link="https://api.covid19india.org/data.json"
            SwitchMap='world'
        }
        this.setState({
            Country:Country,
            Link:Link
            
        })
        
        

    }
   
    render()
    {
        // console.log("MapStates")
        return(

            <div id="MapSection" >
                {/* <div style={{marginLeft:'20%'}}> */}
                <Container maxWidth="sm" >

                <Suspense fallback={<div className={SpinnerClass.loader}>Loading..</div>}>
                    <TestMap 
                        MapRegion={this.state.Country}
                        WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                        />
                    </Suspense>
                    
                
                    <div id="Map_data" className={classes.Map_data}>
                    </div>
                    </Container>
                    {/* <div style={{width:'80%',height:'410px',marginTop:'-50%',marginLeft:"10%"}} id="BarCharts"> */}
                    <Container maxWidth="sm" style={{marginTop:"-50%"}}>

                    <Suspense fallback={<div ></div>}> 
                     <BarChart 
                            
                            Link={this.state.Link}
                            MapRegion={this.state.Country}
                            WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                        /> 
                        
                    </Suspense>
                    </Container>
                    {/* </div> */}
                    {/* <div style={{width:'72%',height:'400',marginTop:'2%',marginLeft:"10%"}} id="DailyConfirmChart"> */}
                    <Container maxWidth="sm" id="DailyConfirmChart">
                    <Suspense fallback={<div ></div>}> 

                        <Chart 
                            Link={this.state.Link}
                            MapRegion={this.state.Country}    
                            WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                            Type={"dailyconfirmed"}
                            TypeID={"DailyConfirmChart"}
                            background={"rgb(245, 74, 42,.5)"}
                        />
                        </Suspense>
                        </Container>
                    {/* </div> */}
                    {/* <div style={{width:'72%',height:'400',marginTop:'2%',marginLeft:"10%"}} id="DailyRecoverdChart"> */}
                    <Container maxWidth="sm" id="DailyRecoverdChart">
                    <Suspense fallback={<div ></div>}> 

                        <Chart 
                            Link={this.state.Link}
                            MapRegion={this.state.Country}    
                            WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                            Type={"dailyrecovered"}
                            TypeID={"DailyRecoverdChart"}
                            background={"rgb(120, 209, 109,.5)"}
                        />
                    </Suspense>
                    </Container>
                    {/* </div> */}
                    {/* <div style={{width:'72%',height:'400',marginTop:'2%',marginLeft:"10%"}} id="DailydeceasedChart"> */}
                        <Container maxWidth="sm"    id="DailydeceasedChart"  >
                    <Suspense fallback={<div ></div>}> 

                        <Chart 
                            Link={this.state.Link}
                            MapRegion={this.state.Country}    
                            WorldResponse = {this.props.WorldData}
                            IndiaResponse = {this.props.ResponseData}
                            Type={"dailydeceased"}
                            TypeID={"DailydeceasedChart"}
                            background={"rgb(106, 192, 198,.5)"}
                        />
                     </Suspense>
                     </Container>
                    {/* </div> */}
                </div>
               
        )
    }
}

export default MapPart
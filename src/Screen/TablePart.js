import React, { Component, Suspense } from 'react'
import classes from '../MapPractice/DrawMap/MapStates.module.css'
import SpinnerClass from '../MapPractice/DrawMap/Spinner.module.css'
import { makeStyles, Table, TableRow ,TableContainer,TableHead,TableCell} from '@material-ui/core'
// import Chart from '../../FinaleChart/Chart'
// import TotalData from './TotalData'
// import BarChart from '../../FinaleChart/BarChart'
// import TableData from './TableData'

const TableData = React.lazy(()=>import('../MapPractice/DrawMap/TableData'))
const TotalData = React.lazy(()=>import('../MapPractice/DrawMap/TotalData'))
var size =0
var SwitchMap ="World"
var link ="https://api.covid19india.org/data.json"
const ColumnsHeader = [
    {id:'StateName',label:'State',minWidth:170},
    {id:'ConfirmCases',label:'Confirmed',minWidth:100},
    {id:'ActiveCases',label:'Active',minWidth:100},
    {id:'RecoverCases',label:'Recover',minWidth:100},
    {id:'DeathCases',label:'Death',minWidth:100},
]
const UseStyles = makeStyles({
    root:{
        width:'100%'
    },
    container:{
        maxWidth:440,
    }
})
class TablePart extends Component{

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
   
    render(){
        // const Classes = UseStyles()
        
        var cell =[]
        ColumnsHeader.map((column)=>{
          cell.push(  <TableCell
            key={column.id}
            style={{minWidth:column.minWidth}}
            >
                {column.label}
            </TableCell>
          )
        })
        return(
            <div id='DataSection'  >
                <button 
                        style={{width:"100px",height:"50px",color:"black",fontWeight:'bold'}}
                        onClick={()=>this.ChangeCountryByButton(this.state.Country,this.state.Link)} 
                        id="Change_Country_Button" 
                         className='Change_Country_Button'>
                             {SwitchMap}(Click To Switch)
                    </button> 
                    <div style={{flexDirection:"column"}}>
                    <Suspense>
                    <TotalData 
                        ResponseData={this.props.ResponseData} 
                        Country={this.state.Country}
                        Link={this.state.Link}
                        WorldResponse = {this.props.WorldData}
                        IndiaResponse = {this.props.ResponseData}
                    />
                    </Suspense>
                     </div>
                
                        <TableContainer style={{maxHeight:800}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        
                                        {cell}
                                    </TableRow>
                                </TableHead>
                            

                        
                
                            <Suspense fallback={<div className={SpinnerClass.loader}>Loading..</div>}>
                                    <TableData 
                                    Link={this.state.Link}

                                    data={this.props.ResponseData} 
                                    MapRegion={this.state.Country}
                                    WorldResponse = {this.props.WorldData}
                                    IndiaResponse = {this.props.ResponseData}
                                    />
                            </Suspense>
                            </Table>

                        </TableContainer>
                    

                </div>
        )
    }
}
export default TablePart
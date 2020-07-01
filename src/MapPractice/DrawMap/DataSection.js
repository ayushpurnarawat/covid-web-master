import React, { Suspense, Component } from 'react'
import SpinnerClass from './Spinner.module.css'
// import MapStates from './MapStates'
import useSWR from 'swr'
import axios from 'axios'
const MapStates = React.lazy(()=>import('./MapStates'))
var count =0
var India_URl ="https://api.covid19india.org/data.json"
var World_Url ="https://covid-19.dataflowkit.com/v1"
var Test_URL ="https://thevirustracker.com/free-api?global=stats"
const DEFAULT_QUERY = 'redux';

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
var l =true
// class DataSection extends Component{
//     constructor(props) {
//         super(props);
     
//         this.state = {
//           hits: [],
//           isLoading: false,
//           error: null,
//           iss:false
//         };
//       }
//       componentDidMount() {
//           console.log("mount")
//         this.setState({ isLoading: true });
     
//         axios.get(India_URl)
//           .then(result =>
            
//             this.setState({
//             hits: result.data,
//             isLoading: false
//           })
          
//           )
//           .catch(error => console.log("error"));
//       }
//       render(){
//           console.log(this.state.isLoading)
//           if(!this.state.isLoading){
//             console.log("DataSection")

//           return <div>Loadinf</div>
//           }
//           else{
//               return[
                  
//             <div>
            
//                          <Suspense fallback={<div className={SpinnerClass.loader}></div>}>
//                     <MapStates ResponseData={this.state.hits}  />
//                      </Suspense>
//                      {/* {ResponseData} */}
//                      </div>
                     
              
//               ]
              
//           }

//       }
// }
function DataSection(props)
{
    console.log("DataSection")
    var ResponseData=''
    
    const {data:cases_time_series} = useSWR(India_URl,fetcher)
    
    const {data} = useSWR(World_Url,fetcher)

    

    if((!cases_time_series)&&(!data)){
        return <div className={SpinnerClass.loader} >Loading</div>
    }
    
    return(
        <div>
            
            <Suspense fallback={<div className={SpinnerClass.loader}></div>}>
        <MapStates ResponseData={cases_time_series} WorldData={data}/>
        </Suspense>
        {/* {ResponseData} */}
        </div>
    )
}

export default DataSection
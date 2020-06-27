import React, { useEffect ,useState} from 'react'
import * as d3 from 'd3' 
import Axios from 'axios'
import MapNavigation from './MapNavigation'
import Classes from './TestMap.module.css'
import MapStateclasses from './MapStates.module.css'

// import DataSection from './DataSection'

import * as topojson from 'topojson'
import classes from './TestMap.module.css'
import Display from './Display'
// var stat= null
var Response = {}
function TestMap (props){
    // console.log(props.MapRegion)
          const [ChangeCountry,SetChangeCountry] =useState({
            country_Name:'',
            flag:false
          })

          const [state_Name,SetState_Name] = useState({
            state_Name:'India',
            ActiveCases:'',
            Confrim:'',
            Death:'',
            Recoverd:''
          
          });
          useEffect(()=>{
            // console.log("ChangeCountry")
            if(props.MapRegion==='world')
            map(ChangeCountry.country_Name)
          },[ChangeCountry])
          const [Global,SetGlobal]= useState({
            country_Name:'',
            total_Active:'',
            total_confirm:'',
            total_death:'',
            total_recoverd:''

          })
          useEffect(()=>{
            // console.log("Global_Effect")
          },[Global])
          const [ToggleMap,SetToggleMap]=useState({
            ChangeMap:false
          })
          const [Region,SetRegion]=useState({
            Region_Name:'india' //india
          })
          
          useEffect(()=>{
            // console.log("2nd Effect")
            SetToggleMap({
              ChangeMap:true
            })
            if(props.MapRegion!=='world')
            map(Region.Region_Name)
          
                        
            
          },[Region])
         
          const [ChangeRegion,SetChangeRegion]=useState({
            Region:'indias',
            ChangeJsonData:'',
            DistrictName:'',
            ActiveCases:'',
            ConfirmCases:'',
            Deaths:'',
            ChangeMap:false,
            recovered:''
          })
          useEffect(()=>{
            // console.log(ToggleMap.ChangeMap)
          },[ChangeRegion.ActiveCases])
            // useEffect(()=>{
            // },[state_Name])  

            // useEffect(()=>{
            //   console.log(ChangeRegion.Region)
            //   map(ChangeRegion.Region)
            // },[ChangeRegion])
          
                function map(region){
                          
                                // console.log(`WindowInner=${winWidth} and width ${widths} scalingFactor ${ScallingFactor} ==${mapHeight}}`)
                                // console.log(region)
                                var MapType = 'MapSection'
                                
                                if(region!=='india'){
                                  // console.log("toggle")
                                  // d3.selectAll(`#${MapType} > *`).remove()
                                d3.selectAll("svg").remove()
                                
                                MapType='MapSection'
                                  // SetToggleMap({
                                  //   ChangeMap:false
                                  // })
                                  
                                  // d3.select("#MapSection")
                                  // .remove('svg')
                                }
                                
                                
                                var data = d3.map();
                                
                                if(region==='india')
                                Axios.get('https://api.covid19india.org/data.json').then(function(res){
                                    Response={
                                      ...res
                                    }
                                })
                                else if(region==='world')
                                {
                                  Axios.get('https://covid-19.dataflowkit.com/v1').then(function(res){
                                    // console.log(res,"world")
                                    Response={
                                      ...res
                                    }
                                  })
                                }
                                else{
                                  Axios.get('https://api.covid19india.org/state_district_wise.json').then(function(res){
                                    Response={
                                      ...res
                                    }
                                })
                                }
                                //${region}
                                d3.json(`./Maps/${region}.geojson`).then(function(data){
                                    // console.log(data,"delhi")
                                    ready(data)
                                })
                                d3.json(`./Maps/india.json`).then(function(data){
                                  // console.log(data,"delhi")
                                  const topology = topojson.feature(
                                    data,
                                    data.objects["india-districts-2019-734"|| "india-states"]
                                  );
                                  // console.log(topology)
                              })

                          
                                        function ready(todo) 
                                        {
                                          // console.log(Response)

                                          if(region!=='india')
                                          var Stroke_Color_for_Map ='black'
                                          var projection = d3.geoMercator()
                                            .fitSize([320,450],todo)
                                          var path = d3.geoPath(projection)

                                          // console.log(todo)
                                          var svg = d3.select(`#${MapType}`)
                                          .append('svg')
                                          // .attr('width','500px')
                                          // .attr('height','600px')
                                          .attr('viewBox',"0 0 400 400")
                                          .attr("margin-left","5px")
                                          .attr("id",`the_SVG_ID_${MapType}`)
                                          .attr("class",classes.SVG_FOR_MAP)
                                          // .style('position','absolute')
                                          
                                                  let mouseOver = function(d) {
                                                    d3.selectAll(".State")
                                                      .transition()
                                                      .duration(200)
                                                      .style("opacity", .5)
                                                    d3.select(this)
                                                      .transition()
                                                      .duration(200)
                                                      .style("opacity", 1)
                                                      .style("stroke", "black")
                                                    // console.log(d)
                                                    try{
                                                    d3.selectAll("#2")
                                                      .text("helllo")
                                                    }
                                                    catch{
                                                      // console.log("Selector")
                                                    }
                                          
                                                    // stat = d.properties.st_nm
                                                    if(region==='india')
                                                    {
                                                      // console.log(d)
                                                      // console.log(d.properties,"mouseOver")

                                                    var [state,active_india,confirm,deat,recoverd]=MapNavigation(d.properties,Response,region)
                                                    SetState_Name({
                                                      state_Name:state,
                                                      Confrim:confirm,
                                                      Recoverd:recoverd,
                                                      ActiveCases:active_india,
                                                      Death:deat
                                                    })
                                                  }
                                                  else if(region==='world')
                                                  {
                                                      try{  
                                                    var[country_Name,total_confirm,total_Active,tatal_recoverd,total_death]=MapNavigation(d.properties,Response,region)
                                                      console.log(country_Name," ",total_confirm)

                                                      SetGlobal({
                                                        country_Name:country_Name,
                                                        total_confirm:total_confirm,
                                                        total_Active:total_Active,
                                                        total_death:total_death,
                                                        total_recoverd:tatal_recoverd
                                                      })
                                                    }
                                                    catch{
                                                      console.log("ERROR ACCUR",d.properties)
                                                      SetGlobal({
                                                        country_Name:d.properties.name,
                                                        total_confirm:'0',
                                                        total_Active:'0',
                                                        total_death:'0',
                                                        total_recoverd:'0'
                                                      })
                                                    }
                                                  }
                                                  else{
                                                    // console.log(Response,"mouseOver")
                                                    var [districtName,active,Confirm,death,recovered] = MapNavigation(d.properties,Response,region)
                                                      SetChangeRegion({
                                                        DistrictName:districtName,
                                                        ActiveCases:active,
                                                        ConfirmCases:Confirm,
                                                        Deaths:death,
                                                        Region:region,
                                                        recovered:recovered
                                                      })
                                                    }
                                                    
                                                  }
                                                  
                                                  let ChangeCountryMouseOver = function(d)
                                                  {
                                                      SetChangeCountry({
                                                        country_Name:'world',
                                                        flag:true
                                                      })
                                                      if(ChangeCountry.flag){
                                                      d3.select("#Change_Country_Button")
                                                      .attr('disabled',true)
                                                      }
                                                  }
                                                  let ChangeCountryByButton_India = function(d){
                                                    SetChangeCountry({
                                                      country_Name:'india',
                                                      flag:true
                                                    })
                                                    if(ChangeCountry.flag){
                                                    d3.select("#Change_Country_Button_India")
                                                    .attr('disabled',true)
                                                    }
                                                  }
                                                  // console.log("error","topo",todo)
                                                  let mouseLeave = function(d) 
                                                                    {
                                                                      d3.selectAll(".State")
                                                                        .transition()
                                                                        .duration(100)
                                                                        .style("opacity", 1)
                                                                      d3.select(this)
                                                                        .transition()
                                                                        .duration(100)
                                                                        .style("stroke", "transparent")
                                                                    }
                                                  let onClick = function(d)
                                                                    {
                                                                      if(region!=='world'){
                                                                      d3.selectAll('.State')
                                                                      .transition()
                                                                      .duration(200)
                                                                      .style("opacity", .8)
                                                                      d3.select(this)
                                                                      .transition()
                                                                      .duration(200)
                                                                      .style("stroke",'transparent')
                                                                      
                                                                      svg.selectAll("*").remove()
                                                                      SetRegion({
                                                                        Region_Name:(d.properties.st_nm).replace(" ","").toLowerCase()
                                                                
                                                                      })
                                                                    }
                                                                    }
                                                    let onTouch= function(d){
                                                      d3.select('.State')
                                                      .transition()
                                                      .duration(200)
                                                      .style("opacity",.8)
                                                      d3.select(this)
                                                      .transition()
                                                      .duration(200)
                                                      .style('stroke','orange')
                                                    }
                                                  // Draw the map
                                                  svg.append("g")
                                                  .style('margin-left',10)
                                                    .selectAll("path")
                                                    .data(todo.features)
                                                    .enter()
                                                    .append("path")
                                                    
                                                      // draw each country
                                                      // .attr("d", d3.geoPath()
                                                      //   .projection(projection)
                                                      // )
                                                      .attr("d",path)
                                                  // set the color of each country
                                                  .attr("fill", function (d,i) {
                                                    
                                                    d.total = data.get(d.id) || 0;
                                                    // console.log(region)
                                                    if(region==='world')
                                                    return d3.interpolatePiYG((i)/1000)

                                                    return d3.interpolatePRGn(d.properties.st_code/100)
                                                  })
                                                  
                                                  .style("stroke",Stroke_Color_for_Map)
                                                  .attr("class", function(d){ 
                                                  
                                                    if(region==='world')
                                                    return (d.properties.name).replace(" ","").toLowerCase()
                                                    else
                                                    return (d.properties.st_nm).replace(" ","").toLowerCase() } )
                                                  // .attr("id",function(d){
                                                  //   return d.properties.st_nm
                                                  // })
                                                  // .attr("class","world")
                                                  .style("opacity", .8)
                                                  .on("mouseover", mouseOver )
                                                  .on("mouseleave", mouseLeave )
                                                  .on("click",onClick)
                                                  .on('touchstart',onTouch)

                                                    d3.select('#Change_Country_Button')
                                                    .on('click',ChangeCountryMouseOver)

                                                    // d3.select('#ChangeCountryByButton_India')
                                                    // .on('click',ChangeCountryByButton_India)

                                        }
                        
                                     
                              }
  // console.log(this.state.stateName,"stafdcg")
  if(props.MapRegion==='india'){
  return(
    <div data={state_Name.Confrim}>
      {/* <h2 style={{color:'white'}}>{state_Name.state_Name}</h2> */}
     <Display state_Name={state_Name.state_Name} Confirm={state_Name.Confrim}
        ActiveCases={state_Name.ActiveCases} Recoverd={state_Name.Recoverd}
        Death={state_Name.Death}
     />
    
    </div>
  )}
  else if(props.MapRegion==='world')
  {
    return (
    <div data={Global.total_confirm}>
    <Display state_Name={Global.country_Name} Confirm={Global.total_confirm}
        ActiveCases={Global.total_Active} Recoverd={Global.total_recoverd}
        Death={Global.total_death}/>
        </div>
    )
  }
    else {
      return(
        <div>

      <h2 style={{color:'white'}}>{ChangeRegion.DistrictName+"-"}{Region.Region_Name}</h2>
        
        <div id='map' className={classes.State_Map_Visual_Data}>
                

          {/* <div style={{display:'flex',flexDirection:'row'}}className={classes.State} data={"ayush"} id="ayush"> */}
      
      <div className={Classes.Map_Data_Confirm} >
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Confirmed</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number} >
          <h3 >{ChangeRegion.ConfirmCases}</h3>
          </div>
          
      </div>
      <div className={Classes.Map_Data_Active}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Active</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{ChangeRegion.ActiveCases}</h3>
          </div>
      </div>
      
      <div className={Classes.Map_Data_Recover}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Recoverd</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{ChangeRegion.recovered}</h3>
          </div>
      </div>

      <div className={Classes.Map_Data_Death}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Deceased</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3>{ChangeRegion.Deaths}</h3>
          </div>
      </div>
      
    
      </div>
      </div>
      )
    }


}
  


export default TestMap
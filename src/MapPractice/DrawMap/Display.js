import React from 'react'
import Classes from './TestMap.module.css'

function Display(props){
    
   
    // console.log(props)
    return(
        <div>
        <h2 style={{color:'white'}} id="state_data">{props.state_Name}</h2>
        <div className={Classes.Map_Visual_Data} data={"ayush"} id="ayush">
      
      <div className={Classes.Map_Data_Confirm} id="confirm">
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Confirmed</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number} >
    <h3 id="confirm_data">{props.Confirm}</h3>
          </div>
          
      </div>
      <div className={Classes.Map_Data_Active}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Active</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3 id="active_data">{props.ActiveCases}</h3>
          </div>
      </div>
      
      <div className={Classes.Map_Data_Recover}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Recoverd</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3 id="recover_data">{props.Recoverd}</h3>
          </div>
      </div>
      <div className={Classes.Map_Data_Death}>
          <div className={Classes.Map_Data_Confirm_focus}>
            <h5>Deceased</h5>
          </div>
          <div className={Classes.Map_Data_Confirm_Number}>
          <h3 id="death_data">{props.Death}</h3>
          </div>
      </div>
      
        </div>
        </div>
    )
}

export default Display
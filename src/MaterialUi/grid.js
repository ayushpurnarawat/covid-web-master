import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Header from '../Header/Header'
import DataSection from '../MapPractice/DrawMap/DataSection'
import MapPartResponse from '../ScreenResponse/MapPartResponse'
import TablePartResponse from '../ScreenResponse/TablePartResponse'
const grid = ()=>{
    return(
        <div  style={{flexGrow:1}}>
        <Grid container spaceing={3} >
            <Grid item xs={12}>
                    <Header/>
                    
            </Grid>
            <Grid item direction="row" lg={12} container wrap="wrap">            
                <Grid item xs={12} lg={6} xl={6} style={{marginTop:'5%'}} >
            <TablePartResponse/>
            </Grid>
            <Grid item xs={12} lg={6} xl={6} style={{marginTop:'5%'}}>
                    <MapPartResponse/>
            </Grid>
            </Grid>

        </Grid>
        </div>
    )
}
export default grid
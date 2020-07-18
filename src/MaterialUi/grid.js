import React,{useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Header from '../Header/Header'
import {ThemeProvider,Paper,createMuiTheme,Switch} from '@material-ui/core'
import DataSection from '../MapPractice/DrawMap/DataSection'
import {AppBar,Toolbar,IconButton,Typography,Button} from '@material-ui/core'
import MenuIcon from '@material-ui/core/Menu'
import BrightnessIcon from '@material-ui/icons/Brightness4'
import MapPartResponse from '../ScreenResponse/MapPartResponse'
import TablePartResponse from '../ScreenResponse/TablePartResponse'
const Griding=()=>{
    const [DarkMode,SetDarkMode] = useState(false)
    const DarkModeTheme =  createMuiTheme({
        palette:{
            type:DarkMode?"dark":"light"
        }
    })
   const ChangeTheme=(val)=>{
        SetDarkMode(!val)
    }
    useEffect(()=>{

    },[DarkMode])
    return(
    
            <ThemeProvider theme={DarkModeTheme}>
                <Paper>
        <div  style={{flexGrow:1}}>
        <Grid container spaceing={3} >
            <Grid item xs={12}>
                    {/* <Header/> */}
                    <div>
                       <AppBar color="primary">
                <Toolbar >
                    <IconButton edge="start" color="primary" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography>
                        Covid-19 Tracker
                    </Typography>
                    {/* <Button onClick={()=>SetDarkMode(!DarkMode)}>hell</Button> */}
                    <Switch color="default" style={{justifyContent:"flex-end"}} checked={DarkMode} onChange={()=>SetDarkMode(!DarkMode)}/>
                    {/* <BrightnessIcon color="secondary">hhh</BrightnessIcon> */}
                </Toolbar>
                
            </AppBar>
            </div>
                    
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
        </Paper>

        </ThemeProvider>
    )
}
export default Griding
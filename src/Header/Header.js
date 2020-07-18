import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/core/Menu'
const Header = ()=>{
    return(
        <div>
            <AppBar>
                <Toolbar >
                    <IconButton edge="start" color="secondary" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography>
                        Covid-19 Tracker
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Header
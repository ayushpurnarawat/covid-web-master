import { createMuiTheme, withTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
  type:"dark"
    
  },
  status:{
      danger:'orange'
  }
})

export default theme
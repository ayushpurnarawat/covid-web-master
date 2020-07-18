import { createMuiTheme, withTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
  palette: {
    primary:amber,
    secondary:blue
    
  },
  status:{
      danger:'orange'
  }
})

export default theme
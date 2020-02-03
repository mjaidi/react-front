import { makeStyles } from "@material-ui/core/styles";
import { success, error } from "styles/styleVariables";
const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  success: {
    "& div[role=alert]": {
      background: success
    }
  },
  error: {
    "& div[role=alert]": {
      background: error
    }
  }
}));

export default useStyles;

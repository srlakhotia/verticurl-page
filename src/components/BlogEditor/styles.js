import { makeStyles } from '@material-ui/core';
import colors from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  applicantTitle: {
    marginTop: '40px',
    color: colors.textBlue
  },
  applicant: {
    display: 'flex',
    margin: '15px 0',
    alignItems: 'center'
  },
  applicantAvatar: {
    marginRight: '15px'
  },
  formGroup: {
    marginBottom: '30px'
  },
  formGroupTitle: {
    color: colors.textBlue
  }
}));

export {
  useStyles
};

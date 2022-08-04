import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default makeStyles((_: Theme) => ({
  tableContainer: {
    height: '100%',
  },
  disabled: {
    pointerEvents: 'none',
    cursor: 'not-allowed',
    userSelect: 'none',
  },
}));

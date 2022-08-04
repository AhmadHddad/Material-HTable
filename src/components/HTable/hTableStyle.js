const { makeStyles } = require("@mui/styles");

export default makeStyles(theme => ({
  tableContainer: {
    height: '100%'
  },
  disabled: { pointerEvents: "none", cursor: "not-allowed", userSelect: 'none' }
}));
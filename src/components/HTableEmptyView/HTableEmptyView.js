import { Grid } from "@mui/material";

export default function HTableEmptyView({ emptyViewText }) {
    return (<Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
        <Grid item>
            <strong>{emptyViewText}</strong>
        </Grid>
    </Grid>)
}

HTableEmptyView.defaultProps = {
    emptyViewText: "No Data!"
}
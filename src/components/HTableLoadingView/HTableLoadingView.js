import { CircularProgress, Grid } from "@mui/material";

export default function HTableLoadingView(props) {
    return (<Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
        <Grid item>
            <CircularProgress />
        </Grid>
    </Grid>)
}
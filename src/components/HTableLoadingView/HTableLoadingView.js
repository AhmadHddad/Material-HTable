
export default function HTableLoadingView({components}) {
    const { CircularProgress, Grid }  = components;
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
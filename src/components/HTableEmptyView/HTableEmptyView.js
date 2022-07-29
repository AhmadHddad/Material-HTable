
export default function HTableEmptyView({ emptyViewText, components }) {
    const { Grid } = components;
    
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
import React from 'react';
import { IHTableComponents } from '../HTable';

export default function HTableLoadingView({
  components,
}: {
  components: IHTableComponents;
}) {
  const { CircularProgress, Grid } = components;
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

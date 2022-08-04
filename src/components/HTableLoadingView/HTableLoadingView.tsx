import React from 'react';
import { IHComponents } from '../HTable';

export default function HTableLoadingView({
  components,
}: {
  components: IHComponents;
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

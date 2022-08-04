import React from "react";
import { HTableEmptyViewProps } from ".";

export default function HTableEmptyView({ emptyViewText, components }: HTableEmptyViewProps) {
  const { Grid } = components;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="100%"
      minHeight="80px"
    >
      <Grid item>
        <strong>{emptyViewText}</strong>
      </Grid>
    </Grid>
  );
}

HTableEmptyView.defaultProps = {
  emptyViewText: 'No Data!',
};

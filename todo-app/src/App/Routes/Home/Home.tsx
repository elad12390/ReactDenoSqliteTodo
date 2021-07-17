import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import styles from './Home.module.scss';

const Home = () => (
  <Grid className={styles.Home} container direction="row" justifyContent="center" alignItems="center">
    <Typography variant="h1">
      Welcome To My Todo app!?!
    </Typography>
  </Grid>
);

export default Home;

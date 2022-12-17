import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';

import { Header } from 'components/Drawer/DrawerComponents';
import { Container } from 'components/Container';
import Drawer from 'components/Drawer';

export default function Resumo() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Bacharelado Interdisciplinar');

  const handleTitle = (text: string) => {
    if (text !== ' - ') {
      setTitle(text);
    }
  };

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer onClick={handleDrawerClick} open={open} title={handleTitle} />
      <Container open={open}>
        <Header />
        <Typography variant="h6" style={{ fontWeight: 700, marginBottom: '18px' }}>
          Matrícula 3.2022
        </Typography>
        <Typography variant="h6" style={{ marginBottom: '18px' }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Resumo da matrícula
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import { Header } from 'components/Drawer/DrawerComponents';
import CollapsibleTable from 'components/Table';
import { Container } from 'components/Container';
import Drawer from 'components/Drawer';

export default function Main() {
  const [open, setOpen] = useState(false);

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer onClick={handleDrawerClick} open={open} />
      <Container open={open}>
        <Header />
        <Typography variant="h6" style={{ fontWeight: 700 }}>
          Matrícula 3.2022
        </Typography>
        <CollapsibleTable />
      </Container>
    </Box>
  );
}

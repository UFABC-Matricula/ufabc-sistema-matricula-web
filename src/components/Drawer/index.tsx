import React, { MouseEventHandler, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Circle,
  PermIdentity,
  Logout,
} from '@mui/icons-material';
import {
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material';

import { Bar, Header } from './DrawerComponents';

const drawerWidth = 240;

interface IProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  open: boolean;
  title: (text: string) => void;
}

export default function DrawerComponent({ onClick, open, title }: IProps) {
  const theme = useTheme();
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState('');
  const [bachareladoSelecionado, setbachareladoSelecionado] = useState('');
  const LogoUfabc = 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Ufabc_logo.png';
  enum BachareladoEnum {
    Interdisplinar = 'Bacharelado Interdisciplinar',
    Pós = 'Pós BI',
  }

  const handleListItemClick = (bacharelado: string, disciplina?: string) => {
    if (disciplina) {
      setDisciplinaSelecionada(disciplina);
    }
    setbachareladoSelecionado(bacharelado);
  };

  useEffect(() => {
    title(`${bachareladoSelecionado} - ${disciplinaSelecionada}`);
  }, [disciplinaSelecionada, bachareladoSelecionado]);

  return (
    <>
      <Bar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open or close drawer"
            onClick={onClick}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu />
          </IconButton>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" noWrap component="div" style={{ fontWeight: '700' }}>
              Olá, Maria
            </Typography>
            <Typography variant="subtitle2" noWrap component="div">
              Período de Ajuste | 1 Outubro de 2022 | 11:59 AM GMT
            </Typography>
          </div>
        </Toolbar>
      </Bar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Header style={{ margin: '78px 24px' }}>
          <IconButton onClick={onClick}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
          <img src={LogoUfabc} alt="Logo UFABC" style={{ width: '156px' }} />
        </Header>
        <Divider />
        <Typography
          variant="body1"
          style={{
            fontWeight: '700',
            display: 'flex',
            alignSelf: 'center',
            marginTop: '16px',
            color: 'green',
          }}
        >
          Bacharelado Interdisciplinar
        </Typography>
        <List>
          {['Disciplinas Obrigatórias', 'Disciplinas Limitadas', 'Disciplinas Livres'].map(
            (text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() =>
                    handleListItemClick(BachareladoEnum.Interdisplinar, text.split(' ').pop())
                  }
                >
                  <ListItemIcon>
                    <Circle sx={{ fontSize: 16, color: 'green' }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List>
        {/* <Divider />
        <Typography
          variant="body1"
          style={{
            fontWeight: '700',
            display: 'flex',
            alignSelf: 'center',
            marginTop: '16px',
            color: 'green',
          }}
        >
          Pós BI
        </Typography>
        <List>
          {['Disciplinas Obrigatórias', 'Disciplinas Limitadas', 'Disciplinas Livres'].map(
            (text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => handleListItemClick(BachareladoEnum.Pós, text.split(' ').pop())}
                >
                  <ListItemIcon>
                    <Circle sx={{ fontSize: 16, color: 'green' }} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List> */}
        <Divider />
        <List>
          <ListItem key="Resumo" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary="Resumo" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Perfil" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PermIdentity />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Sair" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

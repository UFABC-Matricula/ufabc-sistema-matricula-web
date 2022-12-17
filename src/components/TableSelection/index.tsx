/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Switch,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface Data {
  selection?: null;
  campus: string;
  turma: string;
  vagas: number;
  requisicoes: number;
  posicao: number;
  professores: string;
  horario: string;
}

function createData(
  campus: string,
  turma: string,
  vagas: number,
  requisicoes: number,
  posicao: number,
  professores: string,
  horario: string,
  selection?: null,
): Data {
  return {
    campus,
    turma,
    vagas,
    requisicoes,
    posicao,
    professores,
    horario,
    selection,
  };
}

const rows = [
  createData(
    'SBC',
    'ENGA1155',
    60,
    57,
    34,
    'T: Ricardo Oliveira',
    'sexta-feira das 08:00 as 12:00',
  ),
];

interface HeadCell {
  disablePadding?: boolean;
  id: keyof Data;
  label?: string;
  numeric?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'selection',
    numeric: false,
    disablePadding: false,
    label: '',
  },
  {
    id: 'turma',
    numeric: true,
    disablePadding: false,
    label: 'Turma',
  },
  {
    id: 'campus',
    numeric: true,
    disablePadding: false,
    label: 'Campus',
  },
  {
    id: 'vagas',
    numeric: true,
    disablePadding: false,
    label: 'Vagas',
  },
  {
    id: 'requisicoes',
    numeric: true,
    disablePadding: false,
    label: 'Requisições',
  },
  {
    id: 'posicao',
    numeric: true,
    disablePadding: false,
    label: 'Posição',
  },
  {
    id: 'professores',
    numeric: true,
    disablePadding: false,
    label: 'Professor(es)',
  },
  {
    id: 'horario',
    numeric: true,
    disablePadding: false,
    label: 'Horário',
  },
];

export default function TableSelection() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClick = (row: Data) => {
    const selectedIndex = selected.indexOf(row.turma);
    console.log(row);
    // addRow(row);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.turma);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: any) => {
    setDense(event.target.checked);
  };

  const isSelected = (turma: string) => {
    return selected.indexOf(turma) !== -1;
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
                ;
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.turma.toString());
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.turma}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                      {isItemSelected}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.turma}
                    </TableCell>
                    <TableCell align="right">{row.campus}</TableCell>
                    <TableCell align="right">{row.vagas}</TableCell>
                    <TableCell align="right">{row.requisicoes}</TableCell>
                    <TableCell align="right">{row.posicao}</TableCell>
                    <TableCell align="right">{row.professores}</TableCell>
                    <TableCell align="right">{row.horario}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Compactar tabela"
      />
    </Box>
  );
}

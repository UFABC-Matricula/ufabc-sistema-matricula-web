/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { visuallyHidden } from '@mui/utils';
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
  TableSortLabel,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

interface Data {
  selection?: null;
  turma: string;
  campus: string;
  vagas: number;
  requisicoes: number;
  posicao: number;
  professores: string;
  horario: string;
}

function createData(
  turma: string,
  campus: string,
  vagas: number,
  requisicoes: number,
  posicao: number,
  professores: string,
  horario: string,
  selection?: null,
): Data {
  return {
    turma,
    campus,
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
  // createData('SA', 'MTGA1155', 45, 40, 36, 'T: Patrícia Gomes', 'quinta-feira das 08:00 as 12:00'),
  // createData('SBC', 'ENGA1455', 75, 32, 12, 'T: Rafaela Freitas', 'sexta-feira das 10:00 as 12:00'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly Data[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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
    id: 'campus',
    numeric: true,
    disablePadding: false,
    label: 'Campus',
  },
  {
    id: 'turma',
    numeric: true,
    disablePadding: false,
    label: 'Turma',
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

interface EnhancedTableProps {
  onRequestSort: (event: any, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableSelection() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('campus');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event: any, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: any, turma: string) => {
    const selectedIndex = selected.indexOf(turma);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, turma);
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

  const isSelected = (turma: string) => selected.indexOf(turma) !== -1;
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
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.turma.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.turma.toString())}
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

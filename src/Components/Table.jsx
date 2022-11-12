import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const columns = [
    {
        id: 'value',
        label: 'VALOR',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'description',
        label: 'DESCRIÇÃO',
        minWidth: 100,
        align: 'center'
    },
    {
        id: 'coin',
        label: 'MOEDA',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'paymentMethod',
        label: 'MÉTODO DE PAGAMENTO',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'tag',
        label: 'TAG',
        minWidth: 170,
        align: 'center',
    },
    {
        label: 'AÇÕES',
    },
];

function createData(value, description, coin, paymentMethod, tag, actions = Element) {
    return { value, description, coin, paymentMethod, tag, actions};
}

const rows = [
    createData('600,00', 'Compras do mês', 'BRL', 'Cartão de Crédito', 'Alimentação',),
    createData('200,00', 'Gasolina', 'BRL', 'Dinheiro', 'Transporte'),
    createData('300,00', 'Passeio com familia', 'BRL', 'Cartão de Débito', 'Lazer'),
    createData('200,00', 'Lanche', 'BRL', 'Cartão de Crédito', 'Alimentação'),
    createData('100,00', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('50,00', 'Compras do mês', 'BRL', 'Dinheiro', 'Alimentação'),
    createData('520,00', 'Compra bicicleta', 'BRL', 'Cartão de Crédito', 'Lazer'),
    createData('1000,00', 'Compras do mês', 'BRL', 'Cartão de Crédito', 'Alimentação'),
    createData('60,00', 'Compras do mês', 'BRL', 'Cartão de Crédito', 'Alimentação'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),
    createData('29,90', 'Uber', 'BRL', 'Cartão de Crédito', 'Transporte'),

];


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '39rem',
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    return (
            <Paper className={classes.root} style={{borderRadius: 5}}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
    );
}
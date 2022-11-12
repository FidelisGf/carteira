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
import { red } from '@material-ui/core/colors';
import getExpensesList from '../Utils/ExpensesList.js'
import moedaService from '../Service/moedaService';


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
        id: 'currency',
        label: 'MOEDA',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'payment',
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

const rows = getExpensesList()


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '39rem',
    },
});
async function getCotacao(nmMoeda){
    let vlCotacao = 0
    let cotacao = await moedaService.get(nmMoeda)
    let curre = cotacao.data
    switch(nmMoeda){
        case 'USD':
            vlCotacao =  curre.USDBRL.bid  
            break
        case 'EUR':
            console.log(curre.EURBRL.bid)
            vlCotacao =  curre.EURBRL.bid    
            break
    }
    return vlCotacao
}    
async function somaValores(){
    let cotacaoDol = await getCotacao('USD')
    let cotacaoEur = await getCotacao('EUR')
    let vl = 0
    let tmp = 0
    let vlFinal = null
    rows.forEach(async element => {
        if(element.currency == 'BRL'){
            vl += parseFloat(element.value)  
            console.log('Chegou aqui')
        }else{
            if(element.currency == 'USD'){
                let itemVl = parseFloat(element.value * cotacaoDol)
                
                vl += itemVl
            }else{
                let itemVl = parseFloat(element.value * cotacaoEur)
                
                vl += itemVl
            }
        }
    });

    vlFinal = (vl.toFixed(2).toString())
    localStorage.setItem('Total', vlFinal)
    return vl
}
const vlTotal = somaValores()
export default function StickyHeadTable() {
    const classes = useStyles();
    return (
            <Paper className={classes.root} style={{borderRadius: 5}}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow >
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
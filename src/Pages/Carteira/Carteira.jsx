import { Box, Button, IconButton, MenuItem, Modal } from '@material-ui/core';
import './Carteira.css'
import StickyHeadTable from '../../Components/Table';

import TextField from '@mui/material/TextField';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import * as React from 'react';

import { Grid} from '@mui/material';
function Carteira() {
  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState('EUR');
  const [payment, setPayment] = React.useState('DINHEIRO');
  const handleCurrency = (event: React.Change<HTMLInputElement>) => {
        setCurrency(event.target.value);
  };
  const handlePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayment(event.target.value)
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currencies = [
    {
      value: 'BRL',
      label: 'Reias',
    },
    {
      value: 'DOL',
      label: 'Dolar',
    },
    {
      value: 'EUR',
      label: 'Euro',
    }
  ];
  const payments = [
    {
      value: 'DINHEIRO',
      label: 'A vista',
    },
    {
      value: 'CREDITO',
      label: 'Credito',
    },
    {
      value: 'DEBITO',
      label: 'Debito',
    }
  ];
  return (
       <section id='body-carteira'>
            <div id="heade">
                <div id="corpo-gastos">
                    <AttachMoneyIcon id="icone-gastos" />
                    <p><b>Gastos : R$ 300,00</b></p>
                </div>
                <div>
                <IconButton aria-label="add" style={{ color: "#A7FFEB"}} fontSize="100px" id='btn-add' onClick={handleOpen}>
                    <ControlPointIcon />
                </IconButton>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box id='modal-carteira'  component="form">
                    <h1 id='titulo-modal'>Cadastro de Despesa</h1>
                  
                        <Grid container spacing={1}>
                            <Grid id='grid-modal' item xs={4}>
                                <TextField id="outlined-basic" label="Valor" variant="outlined" color="warning" placeholder='Valor' type={"number"}/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Metodo Pagamento"
                                    value={payment}
                                    onChange={handleCurrency}
                                    helperText="Metodo de Pagamento"
                                    >
                                    {payments.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Moeda"
                                        value={currency}
                                        onChange={handlePayment}
                                        helperText="Please select your currency"
                                        >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} id="second-column">
                            <Grid id='grid-modal' item xs={4}>
                                <TextField id="outlined-basic" label="Descrição" variant="outlined" color="warning" placeholder='Descrição'/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Tags"
                                    value={payment}
                                    onChange={handleCurrency}
                                    helperText="Tags"
                                    >
                                    {payments.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <div id='footer-modal'>
                            <Button variant="contained" color='danger' id='btn-modal'>Salvar</Button>           
                        </div>
                    </Box>
                </Modal>
            </div>
            <div id="table_div">
                <div id="corpo-table">
                    <StickyHeadTable></StickyHeadTable>                   
                </div>
                
            </div>
       </section>
  );
}

export default Carteira;
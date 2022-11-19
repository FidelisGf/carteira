import "./ProjectForm.css";
import TextField from "@mui/material/TextField";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { createStyles, Grid } from "@mui/material";
import getExpensesList from "../../Utils/ExpensesList.js";
import * as React from "react";
import moedaService from "../../Service/moedaService";
import { addList, useAppDispatch } from "../../store";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  withStyles,
} from "@material-ui/core";

function ProjectForm({ title, expenseId=null }) {
  const dispatch = useAppDispatch();

  (function () {
    if (expenseId != null) {
        const expense = getExpensesList()[expenseId]
        console.log(expense)
    }
  })();


  const [currencies, setCurrencies] = React.useState([{}]);
  const [payments, setPayments] = React.useState([{}]);
  const [tags, setTags] = React.useState([{}]);

  async function getCurrencies() {
    const c = await moedaService.getCurrencyList();
    let allCurrencies = [];
    for (let key in c.data) {
      let value = c.data[key]["code"];
      let label = c.data[key]["name"];
      label = label.slice(0, label.indexOf("/"));
      const alreadyExists = allCurrencies.some((obj) => {
        if (obj.value === value && obj.label === label) {
          return true;
        }
        return false;
      });

      if (!alreadyExists) {
        allCurrencies.push({ value, label });
      }
    }
    setCurrencies(allCurrencies);
  }
  React.useEffect(() => {
    getCurrencies();
    getPaymentsAndTags();
  }, []);

  async function getPaymentsAndTags() {
    fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(function (res) {
        setPayments(res.payments);
        setTags(res.tags);     
      });
  };

  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState(currencies[0].value);
  const [payment, setPayment] = React.useState(payments[0].value);
  const [tag, setTag] = React.useState(tags[0].value);
  const handleCurrency = (event: React.Change<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  const handlePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(event.target.value);
  };
  const handleTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function saveExpense() {
    const value = document.getElementById("value").value;
    const description = document.getElementById("description").value;
    const expense = { value, description, payment, currency, tag };

    dispatch(addList(expense))
    handleClose()
  }
  return (
    <Box id="modal-carteira" component="form">
      <h1 id="titulo-modal">{title}</h1>
      <Grid container spacing={1}>
        <Grid id="grid-modal" item xs={4}>
          <TextField
            id="value"
            label="Valor"
            variant="outlined"
            color="primary"
            placeholder="Valor"
            type={"number"}
            defaultValue='0'
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-select-currency"
            select
            label="Metodo Pagamento"
            value={payment}
            color="primary"
            onChange={handlePayment}
            helperText="Metodo de Pagamento"
            InputLabelProps={{
              style: { color: "black" },
            }}
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
            color="primary"
            value={currency}
            onChange={handleCurrency}
            helperText="Selecione uma moeda"
            InputLabelProps={{
              style: { color: "black" },
            }}
            sx={{ input: { color: "red" } }}
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
        <Grid id="grid-modal" item xs={4}>
          <TextField
            label="Descrição"
            id="description"
            variant="outlined"
            color="primary"
            placeholder="Descrição"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-select-currency"
            select
            label="Tags"            
            value={tag}
            onChange={handleTag}
            helperText="Tags"            
            InputLabelProps={{
              style: { color: "black" },
            }}
          >
            {tags.map((option) => (
              <MenuItem id="selects" key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <div id="footer-modal">
        <Button variant="text" id="btn-modal" onClick={saveExpense}>
          Adicionar Despesa
        </Button>
      </div>
    </Box>
  );
}
export default ProjectForm;

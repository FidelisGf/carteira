import "./ProjectForm.css";
import TextField from "@mui/material/TextField";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { createStyles, Grid } from "@mui/material";
import getExpensesList from "../../Utils/ExpensesList.js";
import * as React from "react";
import moedaService from "../../Service/moedaService";
import {
  addList,
  useAppDispatch,
  useAppSelector,
  setValorTotal,
  removeList,
  store,
} from "../../store";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  withStyles,
} from "@material-ui/core";

function ProjectForm({ title, expense, index, expenseId = null }) {
  const dispatch = useAppDispatch();
  const [currencies, setCurrencies] = React.useState([{}]);
  const [payments, setPayments] = React.useState([{}]);
  const [tags, setTags] = React.useState([{}]);

  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState(currencies[0].value);
  const [payment, setPayment] = React.useState(payments[0].value);
  const [tag, setTag] = React.useState(tags[0].value);
  const [value, setValue] = React.useState(0);
  const [description, setDescription] = React.useState("");

  const state = useAppSelector((state) => state.wallet);
  (function () {
    if (expenseId != null) {
      const expense = getExpensesList()[expenseId];
    }
  })();

  async function getCurrencies() {
    const c = await (await moedaService.getCurrencyList());
    let allCurrencies = [];
    for (let key in c) {
      let value = c[key]["code"];
      let label = c[key]["name"];
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

  function getExpense() {
    if (expense != null && expense.value > 0) {
      console.log(expense);
      setCurrency(expense.currency);
      setDescription(expense.description);
      setValue(expense.value);
      setPayment(expense.payment);
      setTag(expense.tag);
    }
  }

  async function getCotacao(nmMoeda) {
    let vlCotacao = 0;
    let cotacao = await moedaService.get(nmMoeda);
    for (let key in cotacao) {
      vlCotacao = cotacao[key]["bid"];
    }
    return vlCotacao;
  }
  async function somaValores() {
    console.log("Exe");
    let vl = 0;
    let rows = store.getState().wallet.list;
    console.log(rows);
    let vlFinal = 0;
    for (let row of rows) {
      let tmp = await getCotacao(row.currency);
      vl += parseFloat(tmp * row.value);
      console.log(vl);
    }
    vlFinal = parseFloat(vl.toFixed(2));
    dispatch(
      setValorTotal({
        vlFinal,
      })
    );
  }

  async function getPaymentsAndTags() {
    fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(function (res) {
        setPayments(res.payments);
        setTags(res.tags);
      });
  }
  React.useEffect(() => {
    getCurrencies();
    getPaymentsAndTags();
    getExpense();
  }, []);

  const handleCurrency = (event: React.Change<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  const handlePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(event.target.value);
  };
  const handleTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };
  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function saveExpense() {
    const expense = { value, description, payment, currency, tag };
    if (title == "Editar Despesa") {
      dispatch(removeList({ index }));
    }
    dispatch(addList(expense));
    somaValores();
    handleClose();
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
            onChange={handleValue}
            type={"number"}
            value={value}
            defaultValue="0"
            data-testid='value'
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
            data-testid='payment'
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
            data-testid='currency'
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
            onChange={handleDescription}
            value={description}
            placeholder="Descrição"
            data-testid='description'
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
            data-testid='tag'
            InputLabelProps={{
              style: {
                color: "black",
              },
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

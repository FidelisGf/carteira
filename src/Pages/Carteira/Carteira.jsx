import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  withStyles,
} from "@material-ui/core";
import "./Carteira.css";
import StickyHeadTable from "../../Components/Table/Table";

import TextField from "@mui/material/TextField";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import * as React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import ProjectForm from "../../Components/Project/ProjectForm";


import { createStyles, Grid } from "@mui/material";
import { store } from "../../store";
const styles = (theme) => ({
  multilineColor: {
    color: "red",
  },
});


function Carteira() {
  
  const vlTotal = parseFloat(localStorage.getItem("Total") ?? 0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  const [editableId, setEditableId] = React.useState(null);



  React.useEffect(() => {
    (function () {
      setEditableId(
        JSON.parse(
          localStorage.getItem(
            'editableId'
          )
        )
      )
    })();
  }, []);

  return (
    <section id="body-carteira" data-testid='wallet-page'>
      <div id="heade">
        <div id="corpo-gastos">
          <AttachMoneyIcon id="icone-gastos" />
          <p>
            <b>
              Gastos :{" "}
              {store.getState().wallet.valorTotal.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </b>
          </p>
        </div>
        <div>
          <IconButton
            aria-label="add"
            style={{ color: "#A7FFEB" }}
            fontSize="100px"
            id="btn-add"
            onClick={handleOpen}
          >
            <ControlPointIcon />
          </IconButton>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ProjectForm
            title="Cadastro de Despesas"
          />
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

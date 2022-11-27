import { Modal } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { red } from "@material-ui/core/colors";
import getExpensesList from "../../Utils/ExpensesList.js";
import moedaService from "../../Service/moedaService";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ProjectForm from "../../Components/Project/ProjectForm";
import "./Table.css";
import {
  useAppSelector,
  useAppDispatch,
  setValorTotal,
  removeList,
  getFromList,
} from "../../store.js";

const columns = [
  {
    id: "value",
    label: "VALOR",
    minWidth: 170,
    align: "center",
  },
  {
    id: "description",
    label: "DESCRIÇÃO",
    minWidth: 100,
    align: "center",
  },
  {
    id: "currency",
    label: "MOEDA",
    minWidth: 170,
    align: "center",
  },
  {
    id: "payment",
    label: "MÉTODO DE PAGAMENTO",
    minWidth: 170,
    align: "center",
  },
  {
    id: "tag",
    label: "TAG",
    minWidth: 170,
    align: "center",
  },
  {
    id: "actions",
    label: "AÇÕES",
    minWidth: 130,
    align: "center",
  },
];

let rows = [];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "37rem",
  },
});

export default function StickyHeadTable() {
  const dispatch = useAppDispatch();
  const [expense, setExpense] = React.useState([{}]);
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const state = useAppSelector((state) => state.wallet);
  rows = state.list;
  function removeExpense(index) {
    const i = index + 1;
    const r = window.confirm(
      "Tem certeza que deseja remover a despesa " + i + "?"
    );
    if (r) {
      dispatch(removeList({ index }));
    }
  }

  function editExpense(index) {
    var obj = rows[index];    
    setExpense(obj);
    setIndex(index);
    handleOpen();
  }

  const classes = useStyles();
  let counter = 0;
  return (
    <Paper className={classes.root} style={{ borderRadius: 5 }}>
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
            {rows.map((row, counter) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={rows.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "actions"
                          ? [
                              <EditIcon
                                id="table_icons"
                                onClick={() => editExpense(counter)}
                              />,
                              <ClearIcon
                                id="table_icons"
                                onClick={() => removeExpense(counter)}
                              />,
                            ]
                          : null}
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProjectForm title="Editar Despesa" expense={expense} index={index} />
      </Modal>
    </Paper>
  );
}

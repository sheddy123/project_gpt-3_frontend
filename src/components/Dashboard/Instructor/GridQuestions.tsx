import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useCallback, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { validateRequired } from "@/utils/Helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  deletetQuestionService,
  getQuestionService,
} from "@/services/api/QuestionService/QuestionService";
import { selectAllQuestions } from "@/redux/features/questions/questionSlice";
import { QuestionDialog } from "./QuestionDialog";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { useStateContext } from "@/utils/Helpers/ContextProvider";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GridQuestions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => []);
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  //const theme = useTheme();
  //const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const questionData = {
    tableData: useSelector(selectAllQuestions),
  };
  const globalTheme = useTheme(); //(optional) if you already have a theme defined in your app root, you can import here

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme

          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table

          info: {
            main: "rgb(255,122,0)", //add in a custom color for the toolbar alert background stuff
          },

          background: {
            default:
              globalTheme.palette.mode === "light"
                ? "#e6e7e8" //random light yellow color for the background in light mode
                : "#000", //pure black table in dark mode for fun
          },
        },

        typography: {
          button: {
            textTransform: "none", //customize typography styles for all buttons in table by default

            fontSize: "1.2rem",
          },
        },

        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: "1.1rem", //override to make tooltip font size larger
              },
            },
          },

          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: "pink", //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),

    [globalTheme]
  );
  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#20232a",
      },
    },
  });
  const whiteTheme = createTheme({
    palette: {
      mode: "light", // Set the mode to 'light' for white mode
      primary: {
        main: "#ffffff", // Replace this with your desired white color value
      },
    },
  });

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editModalValues, setEditModalValues] = useState({});

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          // cell.column.id === "email"
          //   ? validateEmail(event.target.value)
          //   : cell.column.id === "age"
          //   ? validateAge(+event.target.value)
          //   :

          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const questionColumns = useMemo(
    () => [
      {
        accessorKey: "questionId",
        header: "QuestionId",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 50,
      },
      {
        accessorKey: "answer",
        header: "Answer",
        size: 100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // {
      //   accessorKey: "question",
      //   header: "Question",
      //   size: 140,
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
      // {
      //   accessorKey: "options",
      //   header: "Options",
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
      {
        accessorKey: "courseCode",
        header: "Course Code",
        size: 100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "difficultyLevel",
        header: "Difficulty Level",
        size: 100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "optionalFields",
        header: "Optional Fields",
        size: 100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "questionType",
        header: "Question Type",
        size: 100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // {
      //   accessorKey: "age",
      //   header: "Age",
      //   size: 80,
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //     type: "number",
      //   }),
      // },
      // {
      //   accessorKey: "state",
      //   header: "State",
      //   muiTableBodyCellEditTextFieldProps: {
      //     select: true, //change to select for a dropdown
      //     children: states.map((state) => (
      //       <MenuItem key={state} value={state}>
      //         {state}
      //       </MenuItem>
      //     )),
      //   },
      // },
    ],
    [getCommonEditTextFieldProps]
  );

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const { setEditDialog } = useStateContext();
  const handleModalOpening = (type, row?: any) => {
    if (type == "Create") {
      setIsEditing(false);
    }
    if (type == "Edit") {
      setEditModalValues(row.original);
      setIsEditing(true);
    }
    setModalOpen(true);
    setEditDialog(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditDialog(false);
    dispatch(getQuestionService() as any);
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        confirm(
          `Are you sure you want to delete question with ID: ${row.getValue(
            "questionId"
          )}`
        )
      ) {
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
        dispatch(
          deletetQuestionService(row.getValue("questionId")) as any
        ).then(() => dispatch(getQuestionService() as any));

        //send api delete request here, then refetch or update local table data for re-render
      }
    },
    [tableData]
  );

  React.useEffect(() => {
    dispatch(getQuestionService() as any);
  }, []);

  const headerBackgroundColor = "#f0f0f0"; // Replace with the desired background color for the header
  const rowBackgroundColor = "#ffffff"; // Replace with the desired background color for the rows
  const rowTextColor = "#000000"; // Replace with the desired text color for the rows

  return (
    <>
      <ThemeProvider theme={tableTheme}>
        <Box
          sx={{
            "& table thead": {
              background: headerBackgroundColor,
            },
            "& table tbody tr": {
              background: rowBackgroundColor,
            },
            "& table tbody td": {
              color: rowTextColor,
            },
          }}>
          <MaterialReactTable
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "center",
                },
                size: 120,
              },
            }}
            muiTableHeadCellProps={{
              //easier way to create media queries, no useMediaQuery hook needed.
              sx: {
                fontSize: {
                  xs: "10px",
                  sm: "11px",
                  md: "12px",
                  lg: "13px",
                  xl: "14px",
                },
              },
            }}
            columns={questionColumns}
            data={questionData.tableData}
            editingMode="modal" //default
            //enableRowSelection
            enableColumnOrdering
            enableEditing
            //onEditingRowSave={handleSaveRowEdits}
            //onEditingRowCancel={handleCancelRowEdits}
            positionToolbarAlertBanner="bottom"
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  {/* <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton> */}
                  <IconButton onClick={() => handleModalOpening("Edit", row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Button
                color="success"
                onClick={() => handleModalOpening("Create")}
                variant="contained">
                Create New Question
              </Button>
            )}
          />
        </Box>
      </ThemeProvider>

      {modalOpen && (
        <QuestionDialog
          //columns={questionColumns}
          open={modalOpen}
          onClose={handleModalClose}
          //onSubmit={handleCreateNewRow}
          AppBar={AppBar}
          Toolbar={Toolbar}
          CloseIcon={CloseIcon}
          Typography={Typography}
          Transition={Transition}
          //fullScreen={fullScreen}
          darkTheme={darkTheme}
          whiteTheme={whiteTheme}
          ThemeProvider={ThemeProvider}
          isEditing={isEditing}
          initialValue={isEditing ? editModalValues : {}}
        />
      )}
    </>
  );
}

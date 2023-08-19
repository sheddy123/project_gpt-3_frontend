// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from "react";
import {
  Edit,
  Inject,
  Toolbar,
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Page,
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from "@/utils/Helpers/ContextProvider";

import "./Grid.css";
import toast, { Toaster } from "react-hot-toast";

function DynamicGridListComponent({
  columnConfigs,
  dataSourceObj,
  handleActionBegin,
  actionSuccess,
  gridRef,
  componentNameText,
  setActionSuccess,
}) {
  const { currentMode } = useStateContext();

  const handleDialogClose = () => {
    // Perform any necessary actions when the dialog is closed
    // Show the success toast after the function executes successfully
  };
  useEffect(() => {
    if (actionSuccess.add || actionSuccess.edit || actionSuccess.delete) {
      gridRef.current.closeEdit();
      gridRef.current.refresh();
      gridRef.current.clearSelection();

      handleDialogClose();

      // Reset the state variables after UI updates
      const showSuccessToast = (action) => {
        let notif_Message = "";
        switch (action) {
          case "add":
            notif_Message = "added";
            break;
          case "edit":
            notif_Message = "edited";
            break;
          case "delete":
            notif_Message = "deleted";
            break;
        }
        toast.success(`${componentNameText} ${notif_Message} successfully!`, {
          position: "top-right",
        });
      };

      Object.keys(actionSuccess).forEach((action) => {
        if (actionSuccess[action]) {
          showSuccessToast(action);
          setActionSuccess((prev) => ({ ...prev, [action]: false }));
        }
      });
    }
  }, [actionSuccess]);

  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: "Dialog",
    // template: (props) => {
    //   console.log("Props passed to dialog ", props)
    //   return (
    //     <CustomDialogTemplate
    //       {...props}
    //       rowData={editedRowData} // Pass the current edited row data to the template
    //       updateRowData={updateRowData} // Pass the function to handle row data updates
    //     />
    //   );
    // },
  };

  const toolbarOptions = ["Add", "Edit", "Delete", "Search"];

  const settings = { checkboxMode: "ResetOnRowClick", persistSelection: false };
  return (
    <div className={`not-prose ${currentMode === "Dark" ? "darkMode" : ""}`}>
      <div className="e-adaptive-demo e-bigger">
        <div className="e-mobile-layout">
          <div className="e-mobile-content">
            <GridComponent
              dataSource={dataSourceObj}
              height="100%"
              pageSettings={{ pageSize: 8, pageSizes: true }}
              ref={gridRef}
              enableAdaptiveUI={true}
              allowFiltering={true}
              actionBegin={handleActionBegin}
              allowSorting={true}
              allowPaging={true}
              //  actionComplete={actionComplete}
              toolbar={toolbarOptions}
              editSettings={editOptions}
              selectionSettings={settings}>
              <ColumnsDirective>
                {columnConfigs.map((column, index) => (
                  <ColumnDirective key={index} {...column} />
                ))}
              </ColumnsDirective>
              <Inject services={[Page, Edit, Toolbar]} />
            </GridComponent>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default DynamicGridListComponent;

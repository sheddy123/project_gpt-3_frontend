import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

const DropDownComponent = ({ currentMode, filterData, handleOnClick, filterText, id }) => { 
const text = filterText === '' ? 'filter by' : filterText;
const idProp = id === '' ? 'time' : id;
 return <div className="w-28 border-1 border-color px-2  rounded-md">
    <DropDownListComponent
      id={idProp}
      className={idProp}
      style={{ border: "none", color: currentMode === "Dark" && "black" }}
      value="1"
      dataSource={filterData}
      popupHeight="220px"
      popupWidth="120px"
      placeholder={text}
      change={handleOnClick}
    />
  </div>
}

DropDownComponent.defaultProps = {
    filterText: '', // Set a default value for filterText if not provided
    id: ''
  };
export default DropDownComponent;

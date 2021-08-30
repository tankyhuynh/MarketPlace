import React, { useState } from "react";
import MaterialTable from "material-table";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { testData } from "./testData";

export default function App() {
  const [data, setData] = useState([...testData]);
  const [checked, setChecked] = useState(false);

  const filterValue = value => {
    if (value) {
      const filtered = data.filter(d => d.id.trim().length > 0);
      setData(filtered);
    } else {
      setData([...testData]);
    }
    setChecked(value);
  };

  const columns = [
    {
      title: "Tên dự án",
      field: "name",
      filterComponent: props => {
        console.log("Props: ", props);
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                color="primary"
                onChange={e => filterValue(e.target.checked)}
              />
            }
            label="Custom filter"
            labelPlacement="end"
          />
        );
      }
    },
    { title: "Lĩnh vực", field: "color", filtering: false },
    { title: "Ngày gửi", field: "quantity", filtering: false },
    { title: "Ngày nhận", field: "id", filtering: false, hidden: true }
  ];

  return (
    <div className="App">
      <MaterialTable
        columns={columns}
        data={data}
        options={{
          filtering: true
        }}
      />
    </div>
  );
}
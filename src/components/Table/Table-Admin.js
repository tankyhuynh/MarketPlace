import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';



export default function Test({columns, rows, editRowsModel, handleEditRowsModelChange, onCellEditStop}) {

  return (
    <div style={{ height: 400, width: '100%', textAlign: "center" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        onCellEditStop={onCellEditStop}
      />
      {/* <code>editRowsModel: {JSON.stringify(editRowsModel)}</code> */}
    </div>
  );
}

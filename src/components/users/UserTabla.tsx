import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import type { UserType } from "./type";
import { Box, Chip, IconButton, Stack, Tooltip } from "@mui/material";
import {
  Edit as EditIcon,
  Undo as UndoIcon,
  Done as DoneIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

interface Props {
  users: UserType[];
}

export const UserTabla = ({ users }: Props) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          color={params.value === "active" ? "primary" : "default"}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit" arrow>
            <IconButton size="small" onClick={() => console.log("Edit user")}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={params.row.status === "active" ? "Deactivate" : "Activate"}
          >
            <IconButton
              size="small"
              color={params.row.status === "active" ? "warning" : "success"}
              onClick={() => console.log("marcar user")}
            >
              {params.row.status === "active" ? (
                <UndoIcon fontSize="small" />
              ) : (
                <DoneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Editar">
            <IconButton
              size="small"
              color="error"
              onClick={() => console.log("eliminar")}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box height={545}>
      <DataGrid rows={users} columns={columns} />
    </Box>
  );
};

import { Box } from "@mui/material";

import {
  UserDialog,
  UserFilter,
  UserHeader,
  UserTabla,
  type userActionState,
} from "../../components";
import type {
  UserFilterStatusType,
  UserType,
} from "../../components/users/type";
import { useEffect, useState } from "react";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useAlert, useAxios } from "../../hooks";
import { errorHelper, hanleZodError } from "../../helpers";
import { schemaUser, type UserFormValues } from "../../models";

export const UsersPage = () => {
  const { showAlert } = useAlert();
  const axios = useAxios();

  const [filterStatus, setFilterStatus] = useState<UserFilterStatusType>("all");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [total, setTotal] = useState(3);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    listUserApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterStatus, paginationModel, sortModel]);

  const listUserApi = async () => {
    try {
      const orderBy = sortModel[0]?.field;
      const orderDir = sortModel[0]?.sort;
      const response = await axios.get("/users", {
        params: {
          page: paginationModel.page ?? 0,
          limit: paginationModel.pageSize ?? 10,
          orderBy,
          orderDir,
          search: search || undefined,
          status: filterStatus !== "all" ? filterStatus : undefined,
        },
      });
      setUsers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };

  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
    setUser(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUser(null);
  };

  const handleOpenEditDialog = (user: UserType) => {
    setOpenDialog(true);
    setUser(user);
  };

  const handleCreateEdit = async (
    _: userActionState | undefined,
    formData: FormData
  ) => {
    const rawData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    try {
      schemaUser.parse(rawData);
      if (user?.id) {
        await axios.put(`/users/${user.id}`, rawData);
        showAlert("Usuario editado correctamente", "success");
      } else {
        await axios.post("/users", rawData);
        showAlert("Usuario creado correctamente", "success");
      }
      listUserApi();
      handleCloseDialog();
      return undefined;
    } catch (error) {
      const err = hanleZodError<UserFormValues>(error, rawData);
      showAlert(err.message, "error");
      return err;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const confirmed = window.confirm(
        "¿Estás seguro de eliminar este usuario?"
      );
      if (!confirmed) return;
      await axios.delete(`/users/${id}`);
      showAlert("Usuario eliminado", "success");
      listUserApi();
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };

  const handleActivate = async (id: number, activate: boolean) => {
    try {
      const confirmed = window.confirm("¿Cambiar estado?");
      if (!confirmed) return;
      await axios.patch(`/users/${id}`, { status: !activate });
      showAlert("Usuario modificado", "success");
      listUserApi();
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <UserHeader handleOpenCreateDialog={handleOpenCreateDialog} />
      <UserFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        setSearch={setSearch}
      ></UserFilter>
      {search} - {filterStatus}
      <UserTabla
        users={users}
        rowCount={total}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        sortModel={sortModel}
        setSortModel={setSortModel}
        handleDelete={handleDelete}
        handleActivate={handleActivate}
        handleOpenEditDialog={handleOpenEditDialog}
      />
      <UserDialog
        open={openDialog}
        user={user}
        onClose={handleCloseDialog}
        handleCreateEdit={handleCreateEdit}
      />
      //01:37:17
    </Box>
  );
};

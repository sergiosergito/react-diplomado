import { Box } from "@mui/material";

import { UserFilter, UserHeader, UserTabla } from "../../components";
import type {
  UserFilterStatusType,
  UserType,
} from "../../components/users/type";
import { useEffect, useState } from "react";
import type { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { useAlert, useAxios } from "../../hooks";
import { errorHelper } from "../../helpers";
import { set } from "zod";

export const UsersPage = () => {
  const { showAlert } = useAlert();
  const axios = useAxios();

  const [filterStatus, setFilterStatus] = useState<UserFilterStatusType>("all");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserType[]>([
    { id: 1, username: "user1", status: "active" },
    { id: 2, username: "user2", status: "inactive" },
    { id: 3, username: "user3", status: "active" },
  ]);
  const [total, setTotal] = useState(3);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const handleNewUser = () => {
    console.log("Nuevo usuario");
  };

  useEffect(() => {
    listUserApi();
  }, []);

  const listUserApi = async () => {
    try {
      const orderBy = sortModel[0]?.field;
      const orderDir = sortModel[0]?.sort;
      const response = await axios.get("/users", {
        params: {
          page: paginationModel.page,
          limit: paginationModel.pageSize,
          orderBy,
          orderDir,
          search,
          status: filterStatus !== "all" ? filterStatus : undefined,
        },
      });
      setUsers(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      showAlert(errorHelper(error), "error");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <UserHeader handleNewUser={handleNewUser} />
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
      />
    </Box>
  );
};

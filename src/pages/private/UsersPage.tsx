import { Box } from "@mui/material";

import {
  //  TaskDialog,
  UserFilter,
  UserHeader,
  //  type TaskActionState,
} from "../../components";
import type { UserFilterStatusType } from "../../components/users/type";
import { useState } from "react";

//import { useState } from "react";
//import type { TaskFilterDoneType, TaskType } from '../../components/tasks/type';
//import type { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
//import { useAlert, useAxios } from '../../hooks';
//import { errorHelper, hanleZodError } from '../../helpers';
//import { schemaTask, type TaskFormValues } from '../../models';

export const UsersPage = () => {
  const [filterStatus, setFilterStatus] = useState<UserFilterStatusType>("all");
  const [search, setSearch] = useState("");

  const handleNewUser = () => {
    console.log("Nuevo usuario");
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
    </Box>
  );

  //  const { showAlert } = useAlert();
  //  const axios = useAxios();
  //  const [search, setSearch] = useState('');

  /*
const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 10,
  });
*/
  //  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  //const [openDialog, setOpenDialog] = useState(false);
  //  const [task, setTask] = useState<TaskType | null>(null);
  /*
  useEffect(() => {
    listTaskApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterStatus, paginationModel, sortModel]);
*/
  /*
  const listTaskApi = async () => {
    try {
      const orderBy = sortModel[0]?.field;
      const orderDir = sortModel[0]?.sort;
      const response = await axios.get('/tasks', {
        params: {
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          orderBy,
          orderDir,
          search,
          done: filterStatus === 'all' ? undefined : filterStatus,
        },
      });
      setTasks(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      showAlert(errorHelper(error), 'error');
    }
  };
*/
  /*
  const handleOpenCreateDialog = () => {
    //setOpenDialog(true);
    //setTask(null);
  };
*/
  /*
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTask(null);
  };
*/
  /*
  const handleOpenEditDialog = (task: TaskType) => {
    setOpenDialog(true);
    setTask(task);
  };
*/
  /*
  const handleCreateEdit = async (
    _: TaskActionState | undefined,
    formdata: FormData
  ) => {
    const rawData = {
      name: formdata.get('name') as string,
    };

    try {
      schemaTask.parse(rawData);
      if (task?.id) {
        await axios.put(`/tasks/${task.id}`, rawData);
        showAlert('Tarea editada', 'success');
      } else {
        await axios.post('/tasks', rawData);
        showAlert('Tarea creada', 'success');
      }
      listTaskApi();
      handleCloseDialog();
      return;
    } catch (error) {
      const err = hanleZodError<TaskFormValues>(error, rawData);
      showAlert(err.message, 'error');
      return err;
    }
  };
*/
  /*
  const handleDelete = async (id: number) => {
    try {
      const confirmed = window.confirm('¿Estas seguro de eliminar?');
      if (!confirmed) return;

      await axios.delete(`/tasks/${id}`);
      showAlert('Tarea eliminada', 'success');
      listTaskApi();
    } catch (error) {
      showAlert(errorHelper(error), 'error');
    }
  };
*/
  /*
  const handleDone = async (id: number, done: boolean) => {
    try {
      const confirmed = window.confirm(
        '¿Estas seguro de que quieres cambiar el estado?'
      );
      if (!confirmed) return;

      await axios.patch(`/tasks/${id}`, { done: !done });
      showAlert('Tarea modificada', 'success');
      listTaskApi();
    } catch (error) {
      showAlert(errorHelper(error), 'error');
    }
  };
*/
};

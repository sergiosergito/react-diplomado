import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import type { UserType } from "./type";
import { useActionState } from "react";
import type { ActionState } from "../../interfaces";
import type { UserFormValues } from "../../models";
import { createInitialState } from "../../helpers";

export type userActionState = ActionState<UserFormValues>;

interface Props {
  open: boolean;
  onClose: () => void;
  user?: UserType | null;
  handleCreateEdit: (
    _: userActionState | undefined,
    formData: FormData
  ) => Promise<userActionState | undefined>;
}

export const UserDialog = ({
  onClose,
  open,
  user,
  handleCreateEdit,
}: Props) => {
  const initialState = createInitialState<UserFormValues>();
  const [state, submitAction, isPending] = useActionState(
    handleCreateEdit,
    initialState
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
      <DialogTitle>{user ? "Editar usuario" : "Nuevo usuario"}</DialogTitle>
      <Box key={user?.id ?? "new"} component={"form"} action={submitAction}>
        <DialogContent>
          <TextField
            name="username"
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            required
            variant="outlined"
            disabled={isPending}
            defaultValue={state?.formData?.username}
            error={!!state?.errors?.username}
            helperText={state?.errors?.username}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="inherit" disabled={isPending}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress /> : null}
          >
            {user ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

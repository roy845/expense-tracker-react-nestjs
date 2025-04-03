import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { getPermissionsByUser } from "../api/serverApi";

export const fetchUserPermissions = createAsyncThunk<
  string[],
  AxiosInstance,
  { rejectValue: string }
>("userPermissions/fetchUserPermissions", async (axiosPrivate, thunkAPI) => {
  try {
    const response = await getPermissionsByUser(axiosPrivate);
    return response.getPermissionsByUser;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || "Failed to load permissions"
    );
  }
});

type Status = "loading" | "succeeded" | "failed";

type PermissionsState = {
  permissions: string[];
  status: Status;
  error: string | null;
};

const initialState: PermissionsState = {
  permissions: [] as string[],
  status: "loading",
  error: null as string | null,
};

const userPermissionsSlice = createSlice({
  name: "userPermissions",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPermissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.permissions = action.payload;
      })
      .addCase(fetchUserPermissions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default userPermissionsSlice.reducer;

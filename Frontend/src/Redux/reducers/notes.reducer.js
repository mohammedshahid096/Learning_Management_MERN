import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllNotesApi } from "../../Apis/notes.api";
import {
  ALL_NOTES_REQUEST,
  ALL_NOTES_SUCCESS,
  ALL_NOTES_FAIL,
  CLEAR_NOTES_ERRORS,
  SINGLE_NOTES_REQUEST,
  SINGLE_NOTES_FAIL,
  SINGLE_NOTES_SUCCESS,
} from "../constants/notes.constant";

export const fetchAllNote = createAsyncThunk(
  "notes/fetchAllNotes",
  async () => {
    const response = await GetAllNotesApi();
    return response;
  }
);

const NotesSlice = createSlice({
  name: "NOTES",
  initialState: {
    loading: false,
    allNotes: null,
    error: null,
    statusCode: null,
  },
  reducers: {
    clearNotesErrorReducer: (state) => {
      state.error = null;
      state.statusCode = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNote.fulfilled, (state, action) => {
        console.log("state");
        console.log(state, action);

        state.allNotes = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAllNote.rejected, (state, action) => {
        console.log(state, action);

        state.error = action.payload.message || "something went wrong";
        state.statusCode = action.payload.statusCode || 500;
      });
  },
});

const NotesReducer = (
  state = { allNotes: null, singleNotes: null },
  action
) => {
  switch (action.type) {
    case ALL_NOTES_REQUEST:
    case SINGLE_NOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        allNotes: action.payload.data,
      };
    case SINGLE_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        singleNotes: action.payload.data,
      };
    case ALL_NOTES_FAIL:
    case SINGLE_NOTES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };
    case CLEAR_NOTES_ERRORS:
      return {
        ...state,
        error: null,
        statusCode: null,
      };
    default:
      return state;
  }
};

// export default NotesSlice.reducer;
export default NotesReducer;

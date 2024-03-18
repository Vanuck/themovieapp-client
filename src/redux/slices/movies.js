import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const APIUrl = `https://themovieapp-d539f95ea100.herokuapp.com/movies`;

// Async thunk for geting movies
export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(APIUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      return data.map((movie) => ({
        _id: movie._id,
        Title: movie.Title,
        Image: movie.Image,
        Description: movie.Description,
        Year: movie.Year,
        Author: movie.Author,
        Line: movie.Line,
        Genre: {
          Name: movie.Genre.Name,
        },
        Director: {
          Name: movie.Director.Name,
        },
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    data: [], // Array of movies
    filter: "", // String for filtering movie array
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setMovies: (state, action) => {
      state.data = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addMatcher(
        (action) => action.type === "user/clearUser",
        (state) => {
          // Reset the filter when `clearUser` is dispatched / the user is logged out
          state.filter = "";
        }
      );
  },
});

// Exporting reducers and async thunk
export const { setMovies, setFilter } = movieSlice.actions;
export default movieSlice.reducer;

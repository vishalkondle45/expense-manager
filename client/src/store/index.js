import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    name: "",
    mobile: "",
    email: "",
  },
  reducers: {
    setUser(state, { payload }) {
      state._id = payload._id;
      state.name = payload.name;
      state.mobile = payload.mobile;
      state.email = payload.email;
    },
    clear(state) {
      state._id = "";
      state.name = "";
      state.mobile = "";
      state.email = "";
    },
  },
});

const groupSlice = createSlice({
  name: "group",
  initialState: {
    _id: "",
    name: "",
    type: "",
    createdBy: "",
    members: [],
    simplify: false,
  },
  reducers: {
    setGroup(state, { payload }) {
      state._id = payload._id;
      state.name = payload.name;
      state.type = payload.type;
      state.createdBy = payload.createdBy;
      state.members = payload.members;
      state.simplify = payload.simplify;
    },
    clear(state) {
      state._id = "";
      state.name = "";
      state.type = "";
      state.createdBy = "";
      state.members = [];
      state.simplify = "";
    },
  },
});

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
  },
  reducers: {
    setExpenses(state, { payload }) {
      state.expenses = payload;
    },
    clear(state) {
      state.expenses = [];
    },
  },
});

const groupUsersSlice = createSlice({
  name: "groupUsers",
  initialState: {
    groupUsers: [],
  },
  reducers: {
    setGroupUsers(state, { payload }) {
      state.groupUsers = payload;
    },
    clear(state) {
      state.groupUsers = [];
    },
  },
});

export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
export const groupActions = groupSlice.actions;
export const expenseActions = expenseSlice.actions;
export const groupUsersActions = groupUsersSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    group: groupSlice.reducer,
    expense: expenseSlice.reducer,
    groupUsers: groupUsersSlice.reducer,
  },
});

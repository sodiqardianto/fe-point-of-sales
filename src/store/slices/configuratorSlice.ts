import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openConfigurator: false,
    fixedNavbar: true,
    sidenavType: "dark",
    openSidenav: false,
    sidenavColor: "dark",
};

export const configuratorSlice = createSlice({
    name: "configurator",
    initialState,
    reducers: {
        setOpenConfigurator: (state, action) => {
            state.openConfigurator = action.payload;
        },
        setFixedNavbar: (state, action) => {
            state.fixedNavbar = action.payload;
        },
        setSidenavType: (state, action) => {
            state.sidenavType = action.payload;
        },
        setOpenSidenav: (state, action) => {
            state.openSidenav = action.payload;
        },
        setSidenavColor: (state, action) => {
            state.sidenavColor = action.payload;
        },
    },
});

export const { setOpenConfigurator, setFixedNavbar, setSidenavType, setOpenSidenav, setSidenavColor } = configuratorSlice.actions;
export default configuratorSlice.reducer;
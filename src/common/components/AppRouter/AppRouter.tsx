import {Route, Routes} from "react-router-dom";

import React, {useEffect} from "react";
import {routes} from "../../routes";
import {useAllSelector, useAppDispatch} from "../../hooks/hooks";
import {AuthMeThunk} from "../../../features/Login/appReducer";

export const AppRouter = () => {
    const dispatch = useAppDispatch()
    const initialized = useAllSelector(state => state.app.isInitialized)
    // useEffect(() => {
    //     if (!initialized) {
    //         dispatch(AuthMeThunk())
    //     }
    // }, [])

    return (
        <Routes>
            {routes.map((route) => {
                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component/>}
                    />
                );
            })}
        </Routes>
    );
};

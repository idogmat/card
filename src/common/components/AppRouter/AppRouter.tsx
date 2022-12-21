import {Route, Routes} from "react-router-dom";


import React from "react";
import {routes} from "../../routes";
import {useAllSelector, useAppDispatch} from "../../hooks/hooks";

export const AppRouter = () => {
    const dispatch = useAppDispatch()
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

import { REQUEST_DATA, REQUEST_DATA_ERROR } from "../types";
import axios from "axios";

export const requestData = () => {
    return dispatch => {
        axios
            .get("http://localhost:5000/employees")
            .then(emp => {
                dispatch({
                    type: REQUEST_DATA,
                    payload: emp.data
                });
            })
            .catch(err => {
                dispatch({
                    type: REQUEST_DATA_ERROR,
                    payload: err
                });
            });
    };
};

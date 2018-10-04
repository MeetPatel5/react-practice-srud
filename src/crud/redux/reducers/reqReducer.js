import { REQUEST_DATA, REQUEST_DATA_ERROR } from "../types";

const initState = {
    empdata: [],
    errdata: null
};

const reqReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case REQUEST_DATA:
            return {
                ...initState,
                empdata: payload
            };
        case REQUEST_DATA_ERROR:
            return {
                ...initState,
                errdata: payload.err
            };
        default:
            return initState;
    }
};

export { reqReducer };

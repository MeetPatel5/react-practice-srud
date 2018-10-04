import { REQUEST_DATA, DELETE_EMPOLYEE, EDIT_EMPLOYEE } from "../types";

const initState = {
   empdata: []
};

const reqReducer = (state = initState, { type, payload }) => {
   switch (type) {
      case REQUEST_DATA:
         return {
            ...initState,
            empdata: payload
         };
      case DELETE_EMPOLYEE:
         const { employees, empId } = payload;
         return {
            ...initState,
            empdata: employees.empdata.filter(emp => emp.id !== empId)
         };
      case EDIT_EMPLOYEE:
         const { selectedEmp, first_name, last_name, emps } = payload;
         return {
            ...initState,
            empdata: emps.empdata.map(emp => {
               if (emp.id === selectedEmp.id) {
                  return {
                     ...emp,
                     first_name: first_name,
                     last_name: last_name
                  };
               } else {
                  return emp;
               }
            })
         };

      default:
         return initState;
   }
};

export { reqReducer };

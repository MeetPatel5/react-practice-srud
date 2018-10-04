import {
   REQUEST_DATA,
   FETCH_ERROR,
   DELETE_EMPOLYEE,
   EDIT_EMPLOYEE
} from "../types";
import axios from "axios";

export const requestData = () => {
   return (dispatch, getState) => {
      const { employees } = getState();
      if (employees.empdata.length <= 0) {
         axios
            .get("http://localhost:5000/employees")
            .then(emps => {
               console.log(getState());
               dispatch({
                  type: REQUEST_DATA,
                  payload: emps.data
               });
            })
            .catch(err => {
               dispatch({
                  type: FETCH_ERROR
               });
            });
      } else {
         return;
      }
   };
};

export const deleteEmployee = empId => {
   return (dispatch, getState) => {
      const { employees } = getState();
      dispatch({
         type: DELETE_EMPOLYEE,
         payload: { employees, empId }
      });
   };
};

export const editEmployee = ({ selectedEmp, first_name, last_name }) => {
   return (dispatch, getState) => {
      const { employees: emps } = getState();
      dispatch({
         type: EDIT_EMPLOYEE,
         payload: { selectedEmp, first_name, last_name, emps }
      });
   };
};

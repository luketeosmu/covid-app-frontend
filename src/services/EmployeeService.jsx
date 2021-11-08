import axios from "axios";

// const GET_EMPLOYEE_API_URL = "http://localhost:8080/users";

class EmployeeService {
    getEmployees = async () => {
        return axios
            .get(`http://localhost:8080/users/${JSON.parse(localStorage.getItem("user")).id}/employees`)
            .then((response) => {
                // console.log(localStorage.getItem("employees"));
                localStorage.setItem("employees", JSON.stringify(response.data));
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    updateEmployee = async(employee) => {
        return axios
            .put(`http://localhost:8080/users/${JSON.parse(localStorage.getItem("user")).id}/employees/${employee.id}`, employee)
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    deleteEmployee = async(id) => {
        return axios
            .delete(`http://localhost:8080/users/${JSON.parse(localStorage.getItem("user")).id}/employees/${id}`)
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    addEmployee = async(employee) => {
        return axios
            .post(`http://localhost:8080/users/${JSON.parse(localStorage.getItem("user")).id}/employees`, employee)
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
}
export default new EmployeeService();
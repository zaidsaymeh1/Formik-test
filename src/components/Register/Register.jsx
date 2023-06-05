import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register() {
  let [response, setResponse] = useState([]);
  let [statuscon, setStatuscon] = useState([]);
  let [statusresponse, setStatus] = useState([]);
  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    onSubmit: SendRegisterdata,
  });
  async function SendRegisterdata(values) {
    let { data } = await axios
      .post(
        "https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup",
        values
      )
      .catch((error) => {
        console.log(error);
        if (error.response.status === 409) {
          setStatus(
            response.splice(
              0,
              error.response.data.message.length,
              error.response.data.message
            )
          );
          console.log(response);
        } else if (error.response.status === 400) {
          setStatus(
            statusresponse.splice(
              0,
              error.response.data.validationErr.length,
              error.response.data.validationErr
            )
          );
          console.log(error.response.data.validationErr);
          console.log(statusresponse);
          setStatuscon(...statusresponse);
        }
      });
    console.log(data);
    if (data.message == "Done") {
      setResponse(data.message);
      Swal.fire("Registeration", "Completed successfully", "success");
    }
  }
  return (
    <>
      <h2>Registeration Form</h2>
      <div className="text-danger">
        {statuscon.length >= 1 ? (
          statuscon.map((msg, index) => <p key={index}>{msg.message}</p>)
        ) : (
          <p className={response == "Done" ? "text-success" : "text-danger"}>
            {response}
          </p>
        )}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <label>User Name:</label>
        <input
          type="text"
          name="userName"
          className="form-control "
          value={formik.values.userName}
          onChange={formik.handleChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          className="form-control "
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <label>Confrim Password:</label>
        <input
          type="password"
          name="cPassword"
          className="form-control"
          value={formik.values.cPassword}
          onChange={formik.handleChange}
        />
        <button type="submit" className="btn btn-info mt-3">
          Register
        </button>
      </form>
    </>
  );
}

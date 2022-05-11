import React, { useReducer, useEffect } from "react";
import { SIGN_UP_URL } from "../urls";
import axios from "axios";

const ReducerFn = (state, action) => {
  switch (action.type) {
    case "ADD__FIRST__NAME":
      return {
        ...state,
        firstName: {
          ...state.firstName,
          value: action.payload,
        },
      };
    case "ADD__LAST__NAME":
      return {
        ...state,
        lastName: {
          ...state.lastName,
          value: action.payload,
        },
      };
    case "ADD__EMAIL":
      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload,
        },
      };
    case "ADD__PASSWORD":
      return {
        ...state,
        password: {
          ...state.password,
          value: action.payload,
        },
      };
    case "VALIDATE__FIRST__NAME":
      return {
        ...state,
        password: {
          ...state.password,
          value: action.payload,
        },
      };
    case "VALIDATE__FIRST__NAME":
      return {
        ...state,
        firstName: {
          ...state.firstName,
          errorText: state.firstName.errorLength,
        },
      };
    case "VALIDATE__LAST__NAME":
      return {
        ...state,
        lastName: {
          ...state.lastName,
          errorText: state.lastName.errorLength,
        },
      };
    case "VALIDATE__EMAIL":
      return {
        ...state,
        password: {
          ...state.password,
          errorText: state.password.errorLength,
        },
      };
    case "VALIDATE__PASSWORD":
      return {
        ...state,
        password: {
          ...state.password,
          errorText: state.password.errorLength,
        },
      };
    default:
      alert("something went wrong in reducer function");
  }
};

const SignUp = () => {
  const initialState = {
    firstName: {
      value: "",
      errorText: "",
      errorMessage: "First Name should only contains letter",
      errorLength: "First Name cannot be empty",
      isRequired: true,
    },
    lastName: {
      value: "",
      errorText: "",
      errorMessage: "Last Name should only contains letter",
      errorLength: "Last Name cannot be empty",
      isRequired: true,
    },
    email: {
      value: "",
      errorText: "",
      errorMessage: "Please Enter Valid Email ID",
      errorLength: "Email cannot be empty",
      isRequired: true,
    },
    password: {
      value: "",
      errorText: "",
      errorMessage: "Password should be on atleast 6 characters",
      errorLength: "Password cannot be empty",
      isRequired: true,
    },
  };

  const handleValidation = ({ type, payload }) => {
    // (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    switch (type) {
      case "FIRST__NAME":
        if (payload.length === 0 || payload.length < 2) {
          dispatch({ type: "VALIDATE__FIRST__NAME" });
        }
        break;
      case "LAST__NAME":
        if (payload.length === 0 || payload.length < 2) {
          dispatch({ type: "VALIDATE__LAST__NAME" });
        }
        break;
      case "PASSWORD":
        if (payload.length === 0 || payload.length < 6) {
          dispatch({ type: "VALIDATE__PASSWORD" });
        }
        break;
      case "EMAIL":
        if (payload.length === 0) {
          dispatch({ type: "VALIDATE__EMAIL" });
        }
        break;
      // if (true) {
      //   return {
      //     ...state,
      //     email: {
      //       ...state.email,
      //       errorText: state.email.errorMessage,
      //     },
      //   };
      // }

      default:
        alert("something went wrong in handleValidation");
        break;
    }
  };

  const handleSignUp = async () => {
    localStorage.setItem("user__email", state.email.value);

    try {
      const response = await axios.post(SIGN_UP_URL, {
        firstname: state.firstName.value,
        lastName: state.lastName.value,
        email: state.email.value,
        password: state.password.value,
      });
      response.status === 201 && alert("user created");
    } catch (error) {
      console.log(error);
    }
  };
  const [state, dispatch] = useReducer(ReducerFn, initialState);
  return (
    <div>
      <div>
        <input
          type="text"
          value={state.firstName.value}
          placeholder="First Name"
          onChange={(e) =>
            dispatch({ type: "ADD__FIRST__NAME", payload: e.target.value })
          }
          onBlur={(e) =>
            handleValidation({ type: "FIRST__NAME", payload: e.target.value })
          }
        />
        {state.firstName.errorText && <span>{state.firstName.errorText}</span>}
      </div>
      <div>
        <input
          type="text"
          value={state.lastName.value}
          placeholder="Last Name"
          onChange={(e) =>
            dispatch({ type: "ADD__LAST__NAME", payload: e.target.value })
          }
        />
        {state.lastName.errorText && <span>{state.lastName.errorText}</span>}
      </div>
      <div>
        <input
          type="text"
          value={state.email.value}
          placeholder="Email"
          onChange={(e) =>
            dispatch({ type: "ADD__EMAIL", payload: e.target.value })
          }
        />
        {state.email.errorText && <span>{state.email.errorText}</span>}
      </div>
      <div>
        <input
          type="password"
          value={state.password.value}
          placeholder="Password"
          onChange={(e) =>
            dispatch({ type: "VALIDATE__FIRST__NAME", payload: e.target.value })
          }
        />
        {state.password.errorText && <span>{state.password.errorText}</span>}
      </div>
      <button onClick={handleSignUp}>Sign-Up</button>
    </div>
  );
};

export { SignUp };

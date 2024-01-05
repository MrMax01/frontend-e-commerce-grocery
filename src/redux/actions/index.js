export const GET_ME = "GET_ME";
export const DELETE_ME = "DELETE_ME";
export const GET_AUTHORIZATION = "GET_AUTHORIZATION";
export const DELETE_AUTHORIZATION = "DELETE_AUTHORIZATION";
export const GET_MY_PRODUCT = "GET_MY_PRODUCT";
export const REMOVE_MY_PRODUCT = "REMOVE_MY_PRODUCT";
export const ADD_MY_PRODUCT = "ADD_MY_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";

export const login = (emailPAss) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPAss),
      });
      if (resp.ok) {
        let myToken = await resp.json();
        console.log(myToken.accessToken);

        dispatch({ type: GET_AUTHORIZATION, payload: myToken.accessToken });
      } else {
        console.log("error");
        alert("email o password sbagliati!");
      }
    } catch (error) {
      console.log(error);
      alert("email o password sbagliati!");
    }
  };
};

export const fetchMyProfile = (myToken) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/me", {
        headers: {
          Authorization: "Bearer " + myToken,
        },
      });
      if (resp.ok) {
        let me = await resp.json();
        console.log(me);
        dispatch({ type: GET_ME, payload: me });
      }
    } catch (error) {
      console.log(error);
      //alert("errore reperimento utente");
    }
  };
};
export const clearToken = () => ({
  type: DELETE_AUTHORIZATION,
  payload: null,
});
export const clearMyProfile = () => ({
  type: DELETE_ME,
  payload: null,
});

//lista dei prodotti del supplier
export const getMyProducts = (myToken) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/me", {
        headers: {
          Authorization: "Bearer " + myToken,
        },
      });
      if (resp.ok) {
        let me = await resp.json();
        console.log(me);
        dispatch({ type: GET_ME, payload: me });
      }
    } catch (error) {
      console.log(error);
      //alert("errore reperimento utente");
    }
  };
};

export const getProducts = () => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/products");
      if (resp.ok) {
        let products = await resp.json();
        console.log(products);
        dispatch({ type: GET_PRODUCTS, payload: products.content });
      }
    } catch (error) {
      console.log(error);
      //alert("errore reperimento utente");
    }
  };
};

export const getLastProducts = () => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/products?orderByDate=true");
      if (resp.ok) {
        let products = await resp.json();
        console.log(products);
        dispatch({ type: GET_PRODUCTS, payload: products.content });
      } else {
        console.log("error");
        alert("Errore nel reperimento dei dati clienti ");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const registrationSupplier = (body) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/register/supplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (resp.ok) {
        let me = await resp.json();
        console.log(me);
        return true;
      }
    } catch (error) {
      return false;
    }
  };
};
export const registrationCustomer = async (body) => {
  try {
    let resp = await fetch("http://localhost:8080/register/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (resp.ok) {
      let me = await resp.json();
      console.log(me);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Errore durante la richiesta:", error);
    return false;
  }
};

import { type } from "@testing-library/user-event/dist/type";

export const GET_ME = "GET_ME";
export const DELETE_ME = "DELETE_ME";
export const GET_AUTHORIZATION = "GET_AUTHORIZATION";
export const DELETE_AUTHORIZATION = "DELETE_AUTHORIZATION";
export const GET_MY_PRODUCT = "GET_MY_PRODUCT";
export const REMOVE_MY_PRODUCT = "REMOVE_MY_PRODUCT";
export const ADD_MY_PRODUCT = "ADD_MY_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const GET_MY_CART = "GET_MY_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

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
        if (me.role === "CUSTOMER") {
          getMyCart(myToken);
        }
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

// CRUD PRODUCT
export const getMyProducts = (myToken) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/suppliers/products", {
        headers: {
          Authorization: "Bearer " + myToken,
        },
      });
      if (resp.ok) {
        let me = await resp.json();
        console.log(me);
        dispatch({ type: GET_MY_PRODUCT, payload: me });
      }
    } catch (error) {
      console.log(error);
      //alert("errore reperimento utente");
    }
  };
};
export const addMyProduct = (myToken, body) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/me/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + myToken,
        },
        body: JSON.stringify(body),
      });
      if (resp.ok) {
        const addedProductItem = await resp.json();

        // Invia un'azione per aggiornare lo stato del carrello
        dispatch({ type: ADD_TO_CART, payload: addedProductItem });
      }
    } catch (error) {
      console.log(error);
      //alert("errore reperimento utente");
    }
  };
};
export const deleteMyProduct = (myToken, productId) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/products/" + productId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + myToken,
        },
      });
      if (resp.ok) {
        dispatch({ type: REMOVE_MY_PRODUCT, payload: productId });
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
export const getProductsOfCategory = (category) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/products?category=" + category);
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
export const getProductDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/products/" + id);
      if (resp.ok) {
        let products = await resp.json();
        dispatch({ type: GET_PRODUCT_DETAIL, payload: products });
        console.log(products);
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
      let resp = await fetch("http://localhost:8080/products?orderByDate=true&&page=0&size=4");
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

//CRUD CART
export const getMyCart = (myToken) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/cart", {
        headers: {
          Authorization: "Bearer " + myToken,
        },
      });
      if (resp.ok) {
        let me = await resp.json();
        console.log(me);
        dispatch({ type: GET_MY_CART, payload: me });
      }
    } catch (error) {
      console.log(error);
      //alert("errore reperimento utente");
    }
  };
};
export const deleteMyCart = (myToken, cartId) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/cart/" + cartId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + myToken,
        },
      });
      if (resp.ok) {
        dispatch({ type: REMOVE_FROM_CART, payload: cartId });
      }
    } catch (error) {
      console.log(error);
      //alert("errore reperimento utente");
    }
  };
};
export const addToCart = (myToken, body) => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch("http://localhost:8080/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + myToken,
        },
        body: JSON.stringify(body),
      });
      if (resp.ok) {
        const addedCartItem = await resp.json();

        // Invia un'azione per aggiornare lo stato del carrello
        dispatch({ type: ADD_TO_CART, payload: addedCartItem });
      }
    } catch (error) {
      console.log(error);
      //alert("errore reperimento utente");
    }
  };
};

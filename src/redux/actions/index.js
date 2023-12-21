export const GET_ME = "GET_ME";
export const DELETE_ME = "DELETE_ME";
export const GET_AUTHORIZATION = "GET_AUTHORIZATION";
export const DELETE_AUTHORIZATION = "DELETE_AUTHORIZATION";

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

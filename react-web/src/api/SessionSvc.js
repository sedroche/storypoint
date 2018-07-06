export const sessionSvc = {
  getSessionID: () => {
    return fetch(process.env.REACT_APP_API_HOST + "/session")
    .then((res) => res.json())
    .then((response) => {
      return response.id;
    });
  }
}
export const saveToLocalStorage = token => {
  localStorage.setItem('token', token);
}

export const getToken = token => localStorage.getItem('token');

export const tokenExists = () => {
  let token = getToken();
  if(token === null || token === "" || token === undefined)
    return false;
  return true;
}
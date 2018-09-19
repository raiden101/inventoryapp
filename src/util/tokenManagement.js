export const saveToLocalStorage = token => {
  localStorage.setItem('token', token);
}

export const getToken = token => localStorage.getItem('token');


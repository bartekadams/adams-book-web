const apiUrl = 'http://127.0.0.1:3001/api/v1/';
const apiHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

const apiCall = async ({urlSufix, method, requestData, token}) => {
  let request = {
    method,
    headers: apiHeaders
  };

  if(token) {
    request.headers.Authorization = 'Bearer ' + token;
  }

  console.log(request);

  if(method === 'POST') {
    request.body = JSON.stringify(requestData);
  }

  let response = await fetch(apiUrl + urlSufix, request);
  return await response.json();
};

export const apiLogin = async (loginData) => {
    return await apiCall({ urlSufix: 'login', method: 'POST', requestData: loginData});
};

export const apiRegister = async (registerData) => {
  return await apiCall({urlSufix: 'register', method: 'POST', requestData: registerData});
};

export const getNewestBooks = async ({ token, page }) => {
  return await apiCall({urlSufix: `books/newest_books?page=${page}`, method: 'GET', token});
};

export const getMyBooks = async ({ token }) => {
  return await apiCall({urlSufix: 'books/my_books', method: 'GET', token});
};
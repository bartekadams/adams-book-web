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

  if(method === 'POST' || method === 'PATCH' || method === 'PUT') {
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

export const getNewestBooks = async ({ token, page, limit }) => {
  return await apiCall({urlSufix: `books/newest_books?page=${page}&limit=${limit}`, method: 'GET', token});
};

export const getMyBooks = async ({ token }) => {
  return await apiCall({urlSufix: 'books/my_books', method: 'GET', token});
};

export const getBookDetails = async ({ token, id }) => {
  return await apiCall({urlSufix: `books/${id}`, method: 'GET', token});
};

export const createNewBook = async ({ token, bookData }) => {
  return await apiCall({urlSufix: 'books/', method: 'POST', token, requestData: bookData });
};

export const updateBook = async ({ token, bookData, id }) => {
  return await apiCall({urlSufix: `books/${id}`, method: 'PATCH', token, requestData: bookData });
};

export const deleteBook = async ({ token, id }) => {
  return await apiCall({urlSufix: `books/${id}`, method: 'DELETE', token });
};

const fileUpload = async ({urlSufix, method, requestData, token}) => {
  let request = {
    method,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: requestData
  };

  let response = await fetch(apiUrl + urlSufix, request);
  return await response.json();
};

export const addBookCover = async ({ token, id, data }) => {
  return await fileUpload({urlSufix: `books/${id}/update_book_cover`, method: 'PATCH', token, requestData: data});
};

export const getMyLoans = async ({ token }) => {
  return await apiCall({urlSufix: 'loans/my_requests', method: 'GET', token});
};

export const getOtherLoans = async ({ token }) => {
  return await apiCall({urlSufix: 'loans/other_requests', method: 'GET', token});
};

export const deleteLoan = async ({ token, id }) => {
  return await apiCall({urlSufix: `loans/${id}`, method: 'DELETE', token});
};

export const changeLoanStatus = async ({ token, id, newStatusData}) => {
  return await apiCall({urlSufix: `loans/${id}`, method: 'PATCH', token, requestData: newStatusData});
};
const apiUrl = 'http://127.0.0.1:3001/api/v1/';
const apiHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

const apiCall = async (urlSufix, method, requestData) => {
  let response = await fetch(apiUrl + urlSufix, {
    method,
    headers: apiHeaders,
    body: JSON.stringify(requestData)
  });
  return await response.json();
};

export const apiLogin = async (loginData) => {
    console.log('apilogin');
    return await apiCall('login', 'POST', loginData);
};

export const apiRegister = async (registerData) => {
  console.log('apiRegister');
  return await apiCall('register', 'POST', registerData);
};
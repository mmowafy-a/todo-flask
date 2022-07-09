import { useState } from 'react';

const useToken = () => {

  const getToken = ()  => {
    const userToken = localStorage.getItem('jwt');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('jwt', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("jwt");
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;
import axiosInstance from "./AxiosInstances";
export const callApi = (endpoint, method = "GET", body = null) => {
  let responseData = {
    Data: null,
    Error: null,
  };
  const fetchData = async () => {
    let responsefinalObj = { ...responseData };
    try {
      const response = await axiosInstance({
        url: endpoint,
        method: method,
        data: body,
      });
      responsefinalObj = { ...responsefinalObj, ...{ Data: response.data } };
    } catch (error) {
      responsefinalObj = { ...responsefinalObj, ...{ Error: error } };
    } finally {
    }
    return responsefinalObj;
  };
 return fetchData();
};
const APIService = {
    callApi
};
export default APIService;
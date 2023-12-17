import axios from "axios";

export const fetchData = async () => {
  const URL = "http://localhost/drive&listen/server.php";
  const response = await axios.get(URL);
  return response;
};
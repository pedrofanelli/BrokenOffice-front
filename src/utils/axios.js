import axios from "axios";
import toast from "react-hot-toast";
const ROUTE = process.env.REACT_APP_ROUTE;

export async function axiosDeleteOffice(id) {
  try {
    const deletedOffice = await axios.delete(`${ROUTE}/offices/delete/${id}`, {
      withCredentials: true,
    });
    toast.success("Office deleted successfully");
    return deletedOffice;
  } catch (error) {
    console.error(error);
    toast.error("Office could not be deleted");
  }
}

export async function axiosGetAllOffices() {
  try {
    const offices = await axios.get(`${ROUTE}/offices`, {
      withCredentials: true,
    });
    return offices.data;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosPutOffice(id, obj) {
  try {
    const offices = await axios.put(`${ROUTE}/offices/edit/${id}`, obj, {
      withCredentials: true,
    });
    toast.success("Office edited successfully");
    return offices.data;
  } catch (error) {
    toast.error("Failed to edit Office");
    console.error(error);
  }
}

export async function axiosPostOffice(obj) {
  try {
    const offices = await axios.post(`${ROUTE}/offices/add`, obj, {
      withCredentials: true,
    });
    toast.success("Office added successfully");
    return offices.data;
  } catch (error) {
    toast.error("Failed to add new Office");
    console.error(error);
  }
}

export async function axiosGetMe() {
  try {
    const loggedUser = await axios.get(`${ROUTE}/user/me`, {
      withCredentials: true,
    });
    return loggedUser.data;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosGetAllUsers() {
  try {
    const users = await axios.get(`${ROUTE}/collaborators/users`, {
      withCredentials: true,
    });
    return users.data;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosRegisterUser(obj) {
  try {
    const user = await axios.post(`${ROUTE}/collaborators/create/user`, obj, {
      withCredentials: true,
    });
    toast.success("Registered succesfully");
    return user;
  } catch (error) {
    toast.error("Register failed");
    console.error(error);
  }
}

export async function axiosDeleteUser(email) {
  try {
    const user = await axios.delete(`${ROUTE}/collaborators/delete/${email}`, {
      withCredentials: true,
    });
    toast.success("Deleted succesfully");
    return user;
  } catch (error) {
    toast.error("Delete failed");
    console.error(error);
  }
}

export async function axiosGetAddressFromCoord(lat, lng) {
  try {
    const address = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_API_KEY}`
    );
    return address.data.results[0].formatted_address;
  } catch (error) {
    toast.error("Could not get Geolocation, please enter it manually");
    console.error(error);
  }
}

export async function axiosGetReportHistory() {
  try {
    const reports = await axios.get(`${ROUTE}/reports/history`, {
      withCredentials: true,
    });
    return reports.data;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosGetClosestOffices(lat, lng) {
  try {
    const closestOffices = await axios.get(
      `${ROUTE}/reports/geoffice?lat=${lat}&long=${lng}`,
      { withCredentials: true }
    );
    return closestOffices.data;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosPostNewReport(obj) {
  try {
    const office = await axios.post(`${ROUTE}/reports/create`, obj, {
      withCredentials: true,
    });
    return office.data;
  } catch (error) {
    console.error(error);
    return error
  }
}
export async function axiosPutUserType(obj) {
  try {
    const { data } = await axios.put(`${ROUTE}/collaborators/edit/type`, obj, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosGetAssignedReportsService() {
  try {
    const reports = await axios.get(`${ROUTE}/reports/service`, {
      withCredentials: true,
    });
    return reports.data;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosPutReportStatus(id, obj) {
  try {
    const updatedReport = await axios.put(
      `${ROUTE}/reports/edit/state/${id}`,
      obj,
      { withCredentials: true }
    );
    toast.success("Report status changed successfully");
    return updatedReport.data;
  } catch (error) {
    toast.error("Report status could not be changed");
    console.error(error);
  }
}

export async function axiosShareReport(reportId, emailTo) {
  try {
    const sent = await axios.post(`${ROUTE}/reports/share`, {reportId, emailTo}, {
      withCredentials: true,
    });
    return sent.data;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosPostGenerateRestoreLink(email) {
  try {
    const sent = await axios.post(`${ROUTE}/user/restore/password`, {email}, {
      withCredentials: true,
    });
    if (!sent) return {error: true, data: "Something went wrong"}
    return sent;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosPostRestorePass(token, password) {
  try {
    const sent = await axios.post(`${ROUTE}/user/restore/password/${token}`, {password}, {
      withCredentials: true,
    });
    if (!sent) return {error: true, data: "Something went wrong"}
    return sent;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosGetInboxSolver() {
  try {
    const notifications = await axios.get(`${ROUTE}/chats/solverinbox`, {
      withCredentials: true,
    });
    return notifications.data;
  } catch (error) {
    console.error(error);
  }
}

export async function axiosGetInboxIssuer() {
  try {
    const notifications = await axios.get(`${ROUTE}/chats/issuerinbox`, {
      withCredentials: true,
    });
    return notifications.data;
  } catch (error) {
    console.error(error);
  }
}
import { axiosInstance } from 'api/axiosInstance';
import { CONFIG } from 'config/config';

function getAllNotifications(token) {
  return axiosInstance
    .get(`/notifications/?format=json`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res.notifications;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
function getNewNotification(token) {
  const ws = new WebSocket(`${CONFIG.wsRoot}/notification/`);
  ws.onopen = () => {
    if (!window.Notification) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
    ws.send(
      JSON.stringify({
        messagetype: 'token',
        message: token,
      }),
    );
  };
  return ws;
}
function deleteNotification(notification) {
  return axiosInstance
    .delete('/notifications', { params: { notification: notification, userid: 'null' } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
function deleteAllNotifications(userid) {
  return axiosInstance
    .delete('/notifications', { params: { notification: 'null', userid: userid } })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export { getNewNotification, getAllNotifications, deleteNotification, deleteAllNotifications };

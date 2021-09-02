import { axiosInstance } from 'api/axiosInstance';

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
  const ws = new WebSocket(`ws://localhost:8005/notification/`);
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
function deleteNotification(notification, clearAll = false) {
  return axiosInstance
    .delete('/notifications', { params: !clearAll ? { notification } : null })
    .then((response) => {
      const res = JSON.parse(response.request.response);
      return res;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export { getNewNotification, getAllNotifications, deleteNotification };

import { createContext } from 'react';


const NotificationContext = createContext({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});

export default function NotificationContextProvider(props) {

  return (
    <NotificationContext.Provider>
      props.children  
    </NotificationContext.Provider>
  );
}

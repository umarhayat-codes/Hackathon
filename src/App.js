import React from "react";
import "./App.scss";
import 'bootstrap/dist/js/bootstrap.bundle'
import Routes from './pages/Routes'
import { ConfigProvider } from "antd";
import './global/globals'
import { useAuthContext } from "./context/AuthContext";
import Loader from "./components/Loader";
function App() {
  const {isAppLoading} = useAuthContext()
  if (isAppLoading) {    
    return <div className="flex-center min-vh-100"><Loader /></div>
        
  }
  return (
    <>
     <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#131118',

        // Alias Token
        colorBgContainer: 'white',
      },
    }}
  >
   
     <Routes />
  </ConfigProvider>
    </>
  );
}
export default App;
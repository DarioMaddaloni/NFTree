import { useContext } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import LogIn from "@/routes/LogIn";
import AuthenticationContext from "@/components/AuthenticationContext";
import Authenticated from "@/routes/Authenticated";

const App = () => {
  const { secret } = useContext(AuthenticationContext);

  const routes = useRoutes([
    {
      path: "*",
      element: secret ? <Authenticated /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
  ]);

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {routes}
    </div>
  );
};

export default App;

import { Outlet } from "react-router-dom";
import usePersistLogin from "../../hooks/usePersistLogin";
import MainLayout from "../../layout/MainLayout";
import { PersistLoginSpinner } from "../common/Spinner";

const PersistLogin = () => {
  const { persist, isLoading } = usePersistLogin();

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <MainLayout title="Loading">
          <PersistLoginSpinner />
        </MainLayout>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;

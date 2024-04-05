import React from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { setAlertVizible } from "../../shared/ui/alert/AlertSlice";
import { Header } from "../../widgets/header/ui/header/index";
import AlertModal from "../../shared/ui/alert/AlertModal";
import { fetchGetListCart } from "../cart/api/fetchGetListCart";

export const Books: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isVizible, descr, title } = useAppSelector((state) => state.alert);

  React.useEffect(() => {
    if (localStorage.getItem("access")) {
      dispatch(fetchGetListCart());
    }
  }, [dispatch]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVizible) {
      timer = setTimeout(() => {
        dispatch(setAlertVizible(false));
      }, 9000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dispatch, isVizible]);

  return (
    <div className="App">
      <Header />
      <main className="content" style={{ marginTop: "30px" }}>
        <div className="container">
          {isVizible && <AlertModal descr={descr} title={title} />}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

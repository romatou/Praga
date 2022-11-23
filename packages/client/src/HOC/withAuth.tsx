import { fetchUser } from "@store/actions/AuthActionCreators";
import { useAppDispatch } from "@store/index";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const withAuth = (Component: any) => {

  return () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useUser();

    useEffect(() => {
      if (!user.id) {
        dispatch(fetchUser())
          .then(res => {
            if (res.type === 'auth/fetch/rejected') {
              return navigate('/auth')
            }
          })
      }
    }, [dispatch, user])
    return <Component/>

  }
}
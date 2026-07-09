import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import api from 'src/api/axios';


type Props = {
  children: React.ReactNode;
};


export default function ProtectedRoute({ children }: Props) {

  const { t } = useTranslation();

  const {
    enqueueSnackbar,
    closeSnackbar
  } = useSnackbar();


  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const snackbarShown = useRef(false);



  useEffect(() => {

    let snackbarKey: any;


    if (!snackbarShown.current) {

      snackbarKey = enqueueSnackbar(
        t('auth.checkingAuthentication'),
        {
          variant: 'info',
          persist: true,
        }
      );

      snackbarShown.current = true;
    }



    const verify = async () => {

      try {

        await api.get('/v1/me');

        setAuthenticated(true);


      } catch {

        setAuthenticated(false);


      } finally {

        if (snackbarKey) {
          closeSnackbar(snackbarKey);
        }

        setLoading(false);

      }

    };


    verify();



    return () => {

      if (snackbarKey) {
        closeSnackbar(snackbarKey);
      }

    };


  }, [t, enqueueSnackbar, closeSnackbar]);



  if (loading) {
    return null;
  }



  if (!authenticated) {

    return (
      <Navigate
        to="/sign-in?reason=session_expired"
        replace
      />
    );

  }



  return <>{children}</>;

}
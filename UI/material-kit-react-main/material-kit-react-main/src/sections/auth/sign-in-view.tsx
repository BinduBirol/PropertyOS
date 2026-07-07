import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { login } from 'src/api/authApi';
import { useSnackbar } from "notistack";
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';



// ----------------------------------------------------------------------

export function SignInView() {

  const { enqueueSnackbar } = useSnackbar();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState("EMAIL");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = useCallback(async () => {

    try {

      setLoading(true);

      const response = await login({
        identifier,
        password,
        role: "CUSTOMER",
        loginType
      });

      console.log(response);

      if (!response.success) {

        enqueueSnackbar(
          response.error?.message ?? "Login failed",
          {
            variant: "error",
          }
        );

        return;
      }

      localStorage.setItem(
        "accessToken",
        response.data.token
      );

      router.push("/");

    } catch (error) {

      if (axios.isAxiosError(error)) {

        const apiError = error.response?.data;

        enqueueSnackbar(
          apiError?.error?.message ?? "Unable to connect to the server.",
          {
            variant: "error",
          }
        );

      } else {

        enqueueSnackbar("Something went wrong.", {
          variant: "error",
        });

      }

    } finally {

      setLoading(false);

    }

  }, [identifier, password, router]);

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        select
        fullWidth
        label="Login Type"
        value={loginType}
        onChange={(e) => setLoginType(e.target.value)}
        sx={{ mb: 3 }}
      >
        <MenuItem value="EMAIL">Email</MenuItem>
        <MenuItem value="MOBILE">Mobile Number</MenuItem>
      </TextField>

      <TextField
        fullWidth
        name="identifier"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        label={loginType === "EMAIL" ? "Email Address" : "Mobile Number"}
        placeholder={
          loginType === "EMAIL"
            ? "example@gmail.com"
            : "018XXXXXXXX"
        }
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />



      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <Button
        fullWidth
        size="large"
        variant="contained"
        color="inherit"
        disabled={loading}
        onClick={handleSignIn}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>



    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>
      {renderForm}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>
    </>
  );
}

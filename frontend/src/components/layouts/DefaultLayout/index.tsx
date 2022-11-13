import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, IconButton, Link, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CommonSnackbar from '@/components/shared/CommonSnackbar';
import { useCurrentUser } from '@/components/shared/CurrentUser/hooks/useCurrentUser';
import { currentUserAtom } from '@/lib/jotaiAtom';
import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { logout } from '@/lib/apiClient';
import { useAtom } from 'jotai';
// @ts-ignore
const DefaultLayout = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const [, setCurrentUser] = useAtom(currentUserAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const execLogout = () => {
    setAnchorEl(null);
    logout();
    setCurrentUser(null);
  };

  const goHome = () => {
    router.push('/');
  };
  return (
    <>
      <Head>
        <title>サイトタイトル</title>
        <meta name='description' content='サイトタイトル' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div style={{ minHeight: '100vh' }}>
        {/* @ts-ignore */}
        <AppBar position='static' sx={{ backgroundColor: 'primary.dark' }}>
          <Toolbar variant='dense'>
            <Link variant='h5' color='inherit' underline='none' component='button' onClick={goHome}>
              サイトタイトル
            </Link>
            <div style={{ flexGrow: 1 }} />
            {!!currentUser && (
              <div>
                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                  <Avatar alt={currentUser.lastName} src={currentUser.profileIcon} sx={{ width: 32, height: 32 }} />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={execLogout}>ログアウト</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <div style={{ paddingTop: 30, paddingBottom: 20 }}>
          {children}
        </div>
      </div>
      <CommonSnackbar />
    </>
  );
};

export default DefaultLayout;

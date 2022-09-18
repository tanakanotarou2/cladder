import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import {Box, Button, IconButton, Link} from "@mui/material";
import {useRouter} from "next/router";
import GitHubIcon from '@mui/icons-material/GitHub';
import Head from 'next/head';
import CommonSnackbar from "@/components/shared/CommonSnackbar";
// @ts-ignore
const DefaultLayout = ({children}) => {
    const router = useRouter()
    const goCreate = () => {
        router.push("/questions/new")
    }
    const goHome = () => {
        router.push("/")
    }
    return (
        <>
            <Head>
                <title>Django Tutorial Poll App</title>
                <meta name='description' content='djagno tutorial poll app'/>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <div style={{minHeight: "100vh"}}>
                {/* @ts-ignore */}
                <AppBar position="static" color="dark">
                    <Toolbar variant="dense">
                        <Box mr={1}>
                            <IconButton
                                size="large"
                                aria-label="github"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                href="https://github.com/tanakanotarou2/dj-nextjs-poll-app"
                            >
                                <GitHubIcon/>
                            </IconButton>
                        </Box>
                        <Link variant="h5" color="inherit" underline="none" component="button" onClick={goHome}>
                            Poll Questions
                        </Link>
                        <div style={{flexGrow: 1}}/>
                        <Box mr={2}>
                            <Button color="inherit" variant="outlined" onClick={goCreate}>質問作成</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <div style={{paddingTop: 30, paddingBottom: 20}}>
                    {children}
                </div>
            </div>
            <CommonSnackbar/>
        </>
    )
}

export default DefaultLayout;

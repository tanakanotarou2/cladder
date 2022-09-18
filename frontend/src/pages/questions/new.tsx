import {NextPageWithLayout} from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import {Container, Typography} from "@mui/material";
import {CreateForm} from "@/components/questions/new/form";


const NewQuestion: NextPageWithLayout = () => {

    return (
        <>
            <Container maxWidth="sm">
                <Typography variant="h4" component="h2" sx={{mb: 4}}>質問作成</Typography>
                <CreateForm/>
            </Container>
        </>
    );
}
NewQuestion.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default NewQuestion
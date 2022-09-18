import type {NextPageWithLayout} from 'next';
import QuestionList from "@/components/Index/QuestionList";

const Home: NextPageWithLayout = () => {
    return (
        <div>
            <main>
                <QuestionList/>
            </main>
        </div>
    );
};

export default Home;

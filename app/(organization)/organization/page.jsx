import dynamic from "next/dynamic";

const Dashboard = dynamic(()=> import('./_content/Dashboard'),{
    loading: () => {
        return <p>Loading...</p>;
    }
});


const Home = () => {

    return (<>
        <Dashboard />
    </>);
}

export default Home;
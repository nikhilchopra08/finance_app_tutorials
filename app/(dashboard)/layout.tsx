import { Header } from "@/components/Header";

type Props = {
    children : React.ReactNode;
};

const DashBoardLayout = ({children} : Props) => {
    return ( 
        <>
        <Header/>
        <main className="mx-4">
            {children}
        </main >
        </>
    );
}

export default DashBoardLayout;
import { FunctionComponent } from "react";

interface IndexPageProps {
    
}
 
const IndexPage: FunctionComponent<IndexPageProps> = () => { 
    return (
        <div className="flex flex-col grow justify-center items-center">
            
            <div>
                <p className=" text-7xl font-bold text-[#301014]">ФИЛЬМЫ</p>
            </div>
            <div>
                <p className=" text-3xl text-slate-500 ">лабораторная работа</p>
            </div>
        </div>
    );
}
 
export default IndexPage;
import Link from "next/link";



const Nirdeshikajachai = ({ title,heading,link }) => {
    
    return (<>
        <div className="lg:h-[18em] flex lg:flex-col justify-around lg:justify-normal">
            <div>
                <p className="text-16 leading-[16.18px] lg:text-20 lg:leading-[20.23px] pb-[15px] text-[#0E1F1C]">{ title }</p>
                <h3 className="text-20 leading-[20.23px] lg:text-32 lg:leading-[32.36px] text-primary">{ heading }</h3>
            </div>
            <div className="lg:h-[11em] flex justify-center items-center">
                <Link
                    href={{
                        pathname: `${link}`
                    }}
                    shallow
                    className="bg-[#C2E3D94A] flex justify-center items-center px-[.8rem] py-4 rounded-full hover:shadow-xl hover:border hover:border-primary cursor-pointer transition-all duration-700">
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.8735 0.1875L27.4762 8.78125V11.1875L17.8735 19.7812L15.1463 17.375L21.4457 11.7031H0.0507812V8.26562H21.4457L15.1079 2.59375L17.8735 0.1875Z" fill="#12633D"/>
                    </svg>
                </Link>
            </div>
        </div>
    </>);
};

export default Nirdeshikajachai;
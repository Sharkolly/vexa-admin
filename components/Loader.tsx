import BouncingLoader from "./BouncingLoader";

type LoaderProps = {  
  height?: string;
};

const Loader = ({height}: LoaderProps ) => {
  return (
    <div className={`flex justify-center items-center w-full ${height || 'h-screen'} `}>
      <div className="flex flex-col items-center">
        {/* <div className="flex justify-center"> */}
          {/* <img src='images/VEXA.jpg' alt="VEXA" className='w-[30%] h-full ' /> */}
          {/* </div> */}
        <BouncingLoader />
      </div>
    </div>
  );
};

export default Loader;

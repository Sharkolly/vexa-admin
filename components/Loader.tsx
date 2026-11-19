import BouncingLoader from "./BouncingLoader";

type LoaderProps = {  
  height?: string;
};

const Loader = ({height}: LoaderProps ) => {
  return (
    <div className={`flex justify-center items-center w-full ${height || 'h-screen'} `}>
      <div className="flex flex-col items-center">
        <div className="flex justify-center"> 
          <img src='/images/fexa-logo-dark.svg' alt="FEXA" className='w-full h-full' loading="lazy"  />
           </div>
        <BouncingLoader />
      </div>
    </div>
  );
};

export default Loader;

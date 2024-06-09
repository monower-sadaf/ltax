import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressProviders = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#198754"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProviders;

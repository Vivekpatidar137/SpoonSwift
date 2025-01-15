import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  const { status, statusText } = err;
  return (
    <>
      <h1>OOPS!!</h1>
      <h2>something went wrong please try again</h2>
      <h3>{status + " : " + statusText}</h3>
    </>
  );
};

export default Error;

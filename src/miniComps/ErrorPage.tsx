const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl mt-16 font-bold text-red-600 uppercase">
        Some error occurred
      </h2>
      <div className="mt-4">
        <p className="text-xl">
          We know you wanted to login, but the login failed due to some reason
          that we dont know. Please try again later.
        </p>
      </div>
    </div>
  );
};
export default ErrorPage;

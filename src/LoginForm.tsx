import { useState } from "react";
import { userLoginProp } from "./types";
import "./App.css";
const LoginForm: React.FC<userLoginProp> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
}) => {
  const [formBtn, setFormBtn] = useState(false);
  return (
    <>
      <form
        onSubmit={handleLogin}
        className="flex  flex-col justify-center items-center"
      >
        <h3 className="text-2xl mb-3">Enter the todoverse </h3>
        <div className="flex flex-col">
          <span className="italic pb-0.5">Enter gmail</span>
          <input
            type="email"
            value={email}
            className="text-md input--box placeholder:text-md pl-2 py-2 border-2  border-black rounded "
            placeholder="name@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mt-2">
          <span className="italic pb-0.5">Enter Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-md input--box  placeholder:text-md pl-2 py-2 border-2  border-black rounded "
            placeholder="Strong password please!"
            required
          />
        </div>
        <div className="flex flex-col mt-4">
          <button
            type="submit"
            className="px-3 py-3 pt-2 text-xl bg-btnColor text-white rounded-lg"
          >
            {!formBtn ? "Login" : "Signup"}
          </button>
        </div>
      </form>
      <div className="flex justify-center">
        {!formBtn && (
          <span className="mt-2 text-sm text-center">
            Don't have an account{" "}
            <button
              onClick={() => setFormBtn((prev) => !prev)}
              className="underline hover:text-btnColor font-bold"
            >
              Signup
            </button>{" "}
            then
          </span>
        )}
        {formBtn && (
          <span className="mt-2 text-sm text-center">
            Have an account{" "}
            <button
              onClick={() => setFormBtn((prev) => !prev)}
              className="underline hover:text-btnColor font-bold"
            >
              Login
            </button>{" "}
            then
          </span>
        )}
      </div>
    </>
  );
};
export default LoginForm;

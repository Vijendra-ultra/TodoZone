import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import MainPage from "./MainPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import Logo from "./miniComps/Logo";
import { supabase } from "./SupabaseClient";
import ErrorPage from "./miniComps/ErrorPage";
import { User } from "@supabase/supabase-js";

const App: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [user, setUser] = useState<User | null>(null);
  const navigateToPage = useNavigate();

  async function handleLogin(e: React.FormEventHandler<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (data) {
      navigateToPage("/main");
    }
    if (error) {
      navigateToPage("/error");
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const Session = data?.session;
      if (Session) {
        setUser(Session?.user);
        navigateToPage("/main");

        return;
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          navigateToPage("/main");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <Logo />
      <Routes>
        <Route
          path="/"
          element={
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          }
        />
        <Route path="/main" element={<MainPage user={user!} />} />

        {/* Error page */}
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default App;

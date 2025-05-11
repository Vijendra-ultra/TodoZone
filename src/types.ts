export type todos = {
  id: number;
  todo_text: string;
  completed: boolean;
};

export type userLoginProp={
  email:string,
  setEmail:React.Dispatch<React.SetStateAction<string>>,
  password:string,
  setPassword:React.Dispatch<React.SetStateAction<string>>,
  handleLogin:(e:React.FormEvent<HTMLFormElement>)=>void;

}
import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';

interface LoginPageProps {
  // onLogin: () => void;
}

// type LoginFormData = {
//   email: string;
//   password: string;
// };

const Login: React.FC<LoginPageProps> = () => {
  // const {
  //   register,
  //   handleSubmit: handleReactHookFormSubmit,
  //   formState,
  // } = useForm<LoginFormData>();

  // const { login, user, error } = useAuth();

  // useEffect(() => {
  //   if (user) {
  //     onLogin();
  //   }
  // }, [user]);

  // const handleSubmit = handleReactHookFormSubmit(({ email, password }) => {
  //   login(email, password);
  // });

  return (
    <div className="flex h-screen">
      <div className="w-[380px] m-auto">
        <LoginForm onLogin={() => {}} />
      </div>
    </div>
  );
};

export default Login;

import { useEffect } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Label, HelperText, Input, Button } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDispatch, useSelector } from 'react-redux';
import { signInAction } from '../redux/actions/AuthenticationActions';

import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';

import Alert from '../components/Alert';

// validation schema
const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6, 'Your password is too short.')
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const history = useHistory();

  const dispatch = useDispatch();
  const { status, error, isLogged } = useSelector(state => state.authentication);

  const onSubmit = values => {
    dispatch(signInAction({ ...values }));
  };

  useEffect(() => {
    if (status === 'resolved' && isLogged) {
      history.push('/app/dashboard');
    }
  }, [isLogged, history, status]);

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900 relative">
      {error ? <Alert type="danger" message={error} /> : null}
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input
                  {...register('email')}
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                  valid={!errors.email}
                />
                {errors.email && <HelperText valid={false}>{errors.email.message}</HelperText>}
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  {...register('password')}
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                  valid={!errors.password}
                />
                {errors.password && (
                  <HelperText valid={false}>{errors.password.message}</HelperText>
                )}
              </Label>

              <Button className="mt-4" block type="submit">
                {status === 'idle' ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing
                  </span>
                ) : (
                  'Log in'
                )}
              </Button>

              <hr className="my-8" />

              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;

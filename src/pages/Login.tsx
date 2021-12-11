/** @format */

import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCart } from '../store/thunks/cartThunks';
import { login } from '../store/thunks/userThunk';

const Container = styled.div`
  background: linear-gradient(rgba(0, 78, 14, 0.5), rgba(209, 209, 209, 0.5)),
    url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
`;

const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.5);
  flex: 1;
  min-width: 40%;
  margin: 1.25rem 0.625rem 0 0;
  padding: 0.625rem;
`;

const Button = styled.button`
  margin-top: 1.25rem;
  transition: all 0.3s ease;
  &:hover {
    background-color: #000;
    color: #00d8d8;
  }
  &:disabled {
    cursor: not-allowed;
    color: #004927;
  }
`;

const Linkstyled = styled(Link)`
  margin-top: 0.725rem;
  font-size: 0.75rem;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  &:hover {
    color: rgba(4, 120, 87, 1);
  }
`;

const Wrapper = styled.div`
  @media only screen and (max-width: 900px) {
    width: 75%;
  }
  @media only screen and (max-width: 600px) {
    width: 85%;
  }
`;

const Form = styled.form`
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Error = styled(Link)`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { isFetching, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const loginCkickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let res = await login(dispatch, { email: email, password: password });
      if (error === false && isFetching === false) {
        Cookies.remove('token');
        Cookies.set('token', res?.data.token);
        await fetchCart(dispatch);
        navigate('/products');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  //TODO: RENDER THE DEMO ACCOUNT DETAILS ON TOP OF THE PAGE
  //TODO: IMPROVE THE NAVIGATION
  return (
    <Container className='flex items-center justify-center w-screen h-screen'>
      <Wrapper className='w-4/12 bg-white p-7'>
        <h1 className='text-4xl font-light text-gray-700'>LOGIN TO ACCOUNT</h1>
        <div className='my-5 text-gray-500'>
          <p>Demo: 'test0@email.com'</p>
          <p>password: 'test0123'</p>
        </div>

        <Form className='flex flex-col'>
          <Input
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={isFetching}
            className='w-5/12 p-3 text-white bg-green-700'
            onClick={loginCkickHandler}>
            LOGIN
          </Button>
          {error && <Error to={'/'}>Something went wrong...</Error>}
          <Linkstyled to={'/'}>DO NOT REMEMBER THE PASSWORD ?</Linkstyled>
          <Linkstyled to={'/register'}>CREATE A NEW ACCOUNT</Linkstyled>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

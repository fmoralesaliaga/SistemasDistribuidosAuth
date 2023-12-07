'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const router = useRouter();

  function decodeJWT(token: string) {
    try {
      const decoded = jwt.decode(token);
      console.log(decoded);
      return decoded;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  function login() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      username: username,
      password: password,
    });

    fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.json()) // Asegúrate de que el servidor responda con JSON
      .then((result) => {
        // Aquí es donde guardas el token en localStorage
        if (result.token) {
          localStorage.setItem('token', result.token);
          router.push('/dashboard');
        } else {
          console.log('No se recibió token:', result);
        }
      })
      .catch((error) => console.log('error', error));
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image className=' mx-auto h-10 w-auto' src='/logo.svg' alt='Multiverse' width={200} height={100}></Image>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='space-y-6'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                Correo Electrónico
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className=' pl-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                  Contraseña
                </label>
                <div className='text-sm'>
                  <Link href='/recovery' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                onClick={() => {
                  login();
                }}
                className='flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Identificate
              </button>
            </div>
          </div>

          <p className='mt-10 text-center text-sm text-gray-500'>
            ¿Aun no eres miembro?{' '}
            <Link href='/register' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
              Regístrate Gratis
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

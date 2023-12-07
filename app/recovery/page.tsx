'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import FormAlert from '@/components/formAlert';

export default function Recovery() {
  const [email, setEmail] = useState('');
  const [tokenSended, SetTokenSended] = useState(false);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordRecovered, setPasswordRecovered] = useState(false);
  function requestPasswordReset() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: email,
    });

    fetch('http://localhost:3005/api/auth/request-reset', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => {
        result ? setMessage(result) : '';
        tokenSended ? '' : SetTokenSended(true);
      })
      .catch((error) => console.log('error', error));
  }

  function changePassword() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      token: token,
      newPassword: newPassword,
    });

    fetch('http://localhost:3005/api/auth/reset', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => {
        result ? setMessage(result) : '';
        tokenSended ? '' : SetTokenSended(true);
        setPasswordRecovered(true);
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
          {message != '' ? <FormAlert message={message}></FormAlert> : ''}
          {!passwordRecovered ? (
            <div>
              {tokenSended ? (
                <div className='space-y-6'>
                  <div>
                    <label htmlFor='token' className='block text-sm font-medium leading-6 text-gray-900'>
                      Código
                    </label>
                    <div className='mt-2'>
                      <input
                        id='token'
                        name='token'
                        type='text'
                        autoComplete='token'
                        required
                        onChange={(e) => setToken(e.target.value)}
                        className=' pl-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor='token' className='block text-sm font-medium leading-6 text-gray-900'>
                      Nueva Contraseña
                    </label>
                    <div className='mt-2'>
                      <input
                        id='newPassword'
                        name='newPassword'
                        type='password'
                        autoComplete='newPassword'
                        required
                        onChange={(e) => setNewPassword(e.target.value)}
                        className=' pl-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                    <div>
                      <button
                        type='submit'
                        onClick={() => changePassword()}
                        className='my-4 flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      >
                        Cambiar Contraseña
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='space-y-6'>
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
                      onChange={(e) => setEmail(e.target.value)}
                      className=' pl-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                  <div>
                    <button
                      type='submit'
                      onClick={() => requestPasswordReset()}
                      className='flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Enviar código de recuperación
                    </button>
                    <p className='mt-10 text-center text-sm text-gray-500'>
                      ¿Aun no eres miembro?{' '}
                      <Link href='/register' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                        Regístrate Gratis
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href='/login'>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Volver al Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

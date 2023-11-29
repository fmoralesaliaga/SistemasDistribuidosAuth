'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Register() {
  const [name, setName] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function register() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');

    var raw = JSON.stringify({
      name: name,
      lastname: lastname,
      username: username,
      password: password,
    });

    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image className=' mx-auto h-10 w-auto' src='/logo.svg' alt='Multiverse' width={200} height={100}></Image>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='grid gap-x-6 grid-cols-2'>
            <div className='w-full'>
              <label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900 '>
                Nombres
              </label>
              <div className='mt-2'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='name'
                  required
                  onChange={(e) => setName(e.target.value)}
                  className=' pl-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='w-full'>
              <label htmlFor='lastname' className='block text-sm font-medium leading-6 text-gray-900'>
                Apellidos
              </label>
              <div className='mt-2'>
                <input
                  id='lastname'
                  name='lastname'
                  type='text'
                  autoComplete='lastname'
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className=' pl-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
              Correo Electrónico
            </label>
            <div className='mt-2'>
              <input
                id='username'
                name='username'
                type='text'
                autoComplete='username'
                onChange={(e) => setUsername(e.target.value)}
                required
                className=' pl-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                Contraseña
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
                required
                className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => register()}
              className='flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Registrate
            </button>
          </div>

          <p className='mt-10 text-center text-sm text-gray-500'>
            ¿Ya eres miembro?{' '}
            <Link href='/login' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
              Identificate Aqui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

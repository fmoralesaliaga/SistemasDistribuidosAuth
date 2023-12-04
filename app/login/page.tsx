'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function saveToken(db: any, userToken: any) {
    // create a new transaction
    const txn = db.transaction('userToken', 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('userToken');
    //
    let query = store.put(userToken);

    // handle success case
    query.onsuccess = function (event: any) {
      console.log(event);
    };

    // handle the error case
    query.onerror = function (event: any) {
      console.log(event.target.errorCode);
    };

    // close the database once the
    // transaction completes
    txn.oncomplete = function () {
      db.close();
    };
  }

  function Login() {
    const request = indexedDB.open('Sesion', 6);
    request.onupgradeneeded = () => {
      let db = request.result;
      if (!db.objectStoreNames.contains('token')) {
        db.createObjectStore('token', { keyPath: 'key' });
      }
    };

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
      .then((response) => response.text())
      .then((result) => {
        const objectStore = db.transaction.objectStore('toDoList');

        console.log(result);
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
              <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
                Nombre de Usuario
              </label>
              <div className='mt-2'>
                <input
                  id='username'
                  name='username'
                  type='username'
                  autoComplete='username'
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
                  Login();
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

import Image from 'next/image';
import Link from 'next/link';

export default function Recovery() {
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image className=' mx-auto h-10 w-auto' src='/logo.svg' alt='Multiverse' width={200} height={100}></Image>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' action='#' method='POST'>
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
                  className=' pl-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Identificate por Correo Electrónico
              </button>
            </div>
          </form>

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

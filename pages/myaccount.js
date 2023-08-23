import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const MyAccount = () => {
    const router= useRouter();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
          router.push('/');
        }
        //eslint-disable-next-line
      }, [router.query])
  return (
    <div>
      
    </div>
  )
}

export default MyAccount

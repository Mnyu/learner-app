import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import InitUser from '@/components/InitUser';
import { useRecoilValue } from 'recoil';
import { userRoleSelector } from '@/store/selectors/userSelector';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const userRole = useRecoilValue(userRoleSelector);
  const isAdmin = userRole === 'admin';
  return (
    <>
      <Head>
        <title>Learner</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <section className='hero'>
          <div className='hero-center'>
            <div className='hero-title'>
              <h1>Learner</h1>
              <p>
                Whether you want to learn or to share what you know, you’ve come
                to the right place. As a global destination for online learning,
                we empower organizations and individuals with flexible and
                effective skill development.
              </p>
              <Link href='/courses' className='btn hero-btn'>
                Enroll Now
              </Link>
              <br />
              <br />
              <br />
              {!isAdmin && (
                <Link href='/teach' className='btn hero-btn'>
                  Teach On Learner
                </Link>
              )}
            </div>
            <div className='img-container'>
              <img src='/home.svg' alt='Home' />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

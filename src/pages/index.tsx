import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import InitUser from '@/components/InitUser';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium a officiis quaerat modi quas dolorum? Velit
                accusantium expedita voluptas praesentium totam pariatur
                adipisci, hic cumque placeat, facere necessitatibus in
                inventore.
              </p>
              <Link href='/courses' className='btn hero-btn'>
                Enroll Now
              </Link>
              <br />
              <br />
              <br />
              <Link href='/teach' className='btn hero-btn'>
                Teach On Learner
              </Link>
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

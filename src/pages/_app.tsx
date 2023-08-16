import InitUser from '@/components/InitUser';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot, RecoilEnv } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <InitUser />
      <Navbar />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

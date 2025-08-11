/* EXPORTS: default (App component) */

import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';

function App({ Component, pageProps, router }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed inset-0 bg-black opacity-40"></div>
      
      <div className="relative z-10">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
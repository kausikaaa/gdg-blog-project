import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Blog. All rights reserved.</p>
          <p className="hidden sm:block">Built with React and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;



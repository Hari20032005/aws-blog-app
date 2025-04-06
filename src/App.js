import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Import pages
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
import ProfilePage from './pages/ProfilePage';

// Import common components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="app">
            <Header user={user} signOut={signOut} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/:id" element={<BlogPage />} />
                <Route path="/create" element={<CreateBlogPage />} />
                <Route path="/edit/:id" element={<EditBlogPage />} />
                <Route path="/profile" element={<ProfilePage user={user} />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;

// src/components/ProtectedRoute.tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Spinner } from 'react-bootstrap';
import LoginPage from '../pages/LoginPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <div className="mt-2">Loading...</div>
        </div>
      </Container>
    );
  }

  if (!user) {
    return <LoginPage onSignIn={() => window.location.reload()} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
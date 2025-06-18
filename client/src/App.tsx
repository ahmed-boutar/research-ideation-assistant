
// src/App.tsx
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import IdeationForm from './components/IdeationForm';
import IdeationOutput from './components/IdeationOutput';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { generateIdeation } from './services/api';
import { Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Configure Amplify with simple config
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_c10JBZiRY",
      userPoolClientId: "5gts64c2o4tjfn5e5vsibqdqm5",
    }
  }
});


const AppContent: React.FC = () => {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (description: string) => {
    try {
      setLoading(true);
      const result = await generateIdeation(description);
      setOutput(result);
    } catch (err) {
      console.error(err);
      alert('Something went wrong generating ideation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <Container className="container">
        <h1 className="mb-4">Research Ideation Assistant</h1>
        <IdeationForm onSubmit={handleSubmit} />
        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status" />
            <div>Generating...</div>
          </div>
        )}
        <IdeationOutput output={output} />
      </Container>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default App;
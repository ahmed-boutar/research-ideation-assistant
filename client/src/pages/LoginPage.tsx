import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Container, Card } from 'react-bootstrap';
import '@aws-amplify/ui-react/styles.css';

interface LoginPageProps {
  onSignIn: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSignIn }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Research Ideation Assistant
          </Card.Title>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
  <Authenticator
            signUpAttributes={['email']}
            socialProviders={[]}
            components={{
              Header() {
                return (
                  <div className="text-center mb-3">
                    <h4>Sign in to continue</h4>
                  </div>
                );
              },
            }}
          >
            {({ signOut, user }) => {
              // This will trigger when user successfully signs in
              if (user) {
                onSignIn();
              }
              return null;
            }}
          </Authenticator>
</div>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
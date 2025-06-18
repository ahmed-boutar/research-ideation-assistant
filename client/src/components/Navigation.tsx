// src/components/Navigation.tsx
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const { user, signOutUser } = useAuth();

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#home">
          Research Ideation Assistant
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Add navigation items here if needed */}
          </Nav>
          <Nav>
            {user && (
              <>
                <Navbar.Text className="me-3">
                  Welcome, {user.username}
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
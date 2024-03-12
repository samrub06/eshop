import { Col, Container, Row } from 'react-bootstrap';

interface ChildProps {
  children?: React.ReactNode;
}

export const FormContainer: React.FC<ChildProps> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

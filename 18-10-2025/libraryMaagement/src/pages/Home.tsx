import React from "react";
import HeroSection from "../common/componets/HeroSection";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home: React.FC = () => {
    return (
        <div>
            <HeroSection />

            <Container className="my-5">
                <h2 className="text-center mb-4">Our Features</h2>
                <Row className="g-4">
                    <Col md={4}>
                        <Card className="h-100 text-center shadow-sm">
                            <Card.Body>
                                <Card.Title>Expert Instructors</Card.Title>
                                <Card.Text>Learn from industry experts with years of experience.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 text-center shadow-sm">
                            <Card.Body>
                                <Card.Title>Flexible Learning</Card.Title>
                                <Card.Text>Access courses anytime, anywhere at your own pace.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 text-center shadow-sm">
                            <Card.Body>
                                <Card.Title>Certification</Card.Title>
                                <Card.Text>Earn recognized certificates to showcase your skills.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default React.memo(Home);

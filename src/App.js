import './App.css';
import { React, Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default class App extends Component {

  state = {
    isLoading: true,
    streamList: []
  }

  componentDidMount() {
    this.loadFetch();
    this.setState({ isLoading: false });
  }

  loadFetch = async () => {
    await fetch("https://www.scorebat.com/video-api/v1")
      .then(data => data.json())
      .then(streamList => this.setState({ streamList }))
      .catch(e => console.log(e));
  }


  render() {
    return (
      <div className="App" >
        {
          !this.state.isLoading && (
            <Container>
              <h1 className="p-5 font-weight-bold">Zack-Foot Streaming App</h1>
              <Row className="justify-content-center">
                {this.state.streamList.map((data, index) => (
                  <Col className="p-2" xs="12" sm="6" md="4" key={index}>
                    <Card className="cardStyle m-auto" style={{ cursor: "pointer" }}>
                      <Card.Link href={data.url} target="blank" rel="noreferrer">
                        <Card.Img variant="top" src={data.thumbnail} alt={data.title} />
                        <Card.Body className="text-center">
                          <Card.Title className="font-weight-bold">{data.title}</Card.Title>
                        </Card.Body>
                      </Card.Link>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div>Powered by ScoreBat.</div>
            </Container>)
        }
      </div >
    );
  }
};

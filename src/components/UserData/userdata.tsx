import {
  Form,
  Container,
  Col,
  Row,
  Accordion,
  Card,
  Button
} from "react-bootstrap";
import React = require("react");
import { SnilsData } from "../PanelPage/panel";
import "./userdata.css";

interface UserDataProps {
  data: SnilsData;
  editable?: boolean;
}
interface UserDataState {
  data: SnilsData;
  editable?: boolean;
}
class UserData extends React.Component<UserDataProps, UserDataState> {
  constructor(props: UserDataProps) {
    super(props);
    this.state = {
      data: props.data,
      editable: typeof props.editable !== "undefined"
    };
  }

  render() {
    const { data, editable } = this.state;
    return (
      <Container className="user-data">
        <Row>
          <Col xs={9} className="pr-1">
            <h6 className="header">Общая информация о пациенте</h6>
            <Form as={Container}>
              <Form.Group as={Row} className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>СНИЛС:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    plaintext
                    readOnly={!editable}
                    value={data.client.Snils}
                    onChange={e => {
                      data.client.Snils = e.target.value;
                      this.setState({ data });
                    }}
                    className="input"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>Фамилия, Имя, Отчество:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    plaintext
                    readOnly={!editable}
                    value={
                      data.client.Surname +
                      " " +
                      data.client.Name +
                      " " +
                      data.client.PatronymicName
                    }
                    className="input"
                    onChange={e => {
                      const nameData = e.target.value.split(" ");
                      data.client.Surname = nameData[0];
                      data.client.Name = nameData[1];
                      data.client.PatronymicName = nameData[2];
                      this.setState({ data });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="fio" className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>Дата рождения:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    type="date"
                    readOnly={!editable}
                    value={data.client.BirthDate}
                    className="input"
                    onChange={e => {
                      data.client.BirthDate = e.target.value;
                      this.setState({ data });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="fio" className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>Серия и номер паспорта:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    plaintext
                    readOnly={!editable}
                    value={
                      data.client.PassSerial + " " + data.client.PassNumber
                    }
                    className="input"
                    onChange={e => {
                      const passData = e.target.value.split(' ');
                      data.client.PassSerial = passData[0];
                      data.client.PassNumber = passData[1];
                      this.setState({ data });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="fio" className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>Дата выдачи паспорта:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    type="date"
                    readOnly={!editable}
                    value={data.client.PassDate}
                    className="input"
                    onChange={e => {
                      data.client.PassDate = e.target.value;
                      this.setState({ data });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="fio" className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>Кто выдал:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    plaintext
                    readOnly={!editable}
                    value={data.client.PassPlace}
                    className="input"
                    onChange={e => {
                      data.client.PassPlace = e.target.value;
                      this.setState({ data });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="fio" className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>Пол:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    plaintext
                    readOnly={!editable}
                    value={data.client.Gender}
                    className="input"
                    onChange={e => {
                      data.client.Gender = e.target.value;
                      this.setState({ data });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="fio" className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>Город:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    plaintext
                    readOnly={!editable}
                    value={data.client.City}
                    className="input"
                    onChange={e => {
                      data.client.City = e.target.value;
                      this.setState({ data });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="fio" className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>Адрес проживания:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    plaintext
                    readOnly={!editable}
                    value={data.client.Addres}
                    className="input"
                    onChange={e => {
                      data.client.Addres = e.target.value;
                      this.setState({ data });
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="fio" className="field mr-5">
                <Form.Label column sm={4} className="label">
                  <strong>Пенсионное страхование:</strong>
                </Form.Label>
                <Col sm={5} className="col">
                  <Form.Control
                    plaintext
                    readOnly={!editable}
                    value={data.client.Insurance}
                    className="input"
                    onChange={e => {
                      data.client.Insurance = e.target.value;
                      this.setState({ data });
                    }}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={3}>
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    className="p-0"
                  >
                    <h6 className="header">Прививки</h6>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="gray-bg">
                    <ul className="p-2">
                      {(() => {
                        const vaccines = [];
                        data.vaccine.forEach(vacconeData => {
                          vaccines.push(
                            <li>
                              {vacconeData.VaccineName} -
                              {vacconeData.VaccineDate}
                            </li>
                          );
                        });
                        return vaccines;
                      })()}
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="1"
                    className="p-0"
                  >
                    <h6 className="header">Хронические заболевания</h6>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body className="gray-bg">
                    <ul className="p-2">
                      {(() => {
                        const chronics = [];
                        data.chronic.forEach(chronicName => {
                          chronics.push(<li>{chronicName}</li>);
                        });
                        return chronics;
                      })()}
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="2"
                    className="p-0"
                  >
                    <h6 className="header">Аллергия</h6>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body className="gray-bg">
                    <ul className="p-2">
                      {(() => {
                        const allergs = [];
                        data.allergy.forEach(allergyName => {
                          allergs.push(<li>{allergyName}</li>);
                        });
                        return allergs;
                      })()}
                    </ul>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserData;

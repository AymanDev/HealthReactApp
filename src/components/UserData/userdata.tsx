import {
  Form,
  Container,
  Col,
  Row,
  Accordion,
  Card,
  Button,
  Tabs,
  Tab,
  Table
} from "react-bootstrap";
import React = require("react");
import { SnilsData } from "../PanelPage/panel";
import "./userdata.css";
import { URL_DOMAIN, DISEASE, postData } from "../../Helper";

interface UserDataProps {
  data: SnilsData;
  editable?: boolean;
}
interface UserDataState {
  data: SnilsData;
  diseaseData?: {
    disease: DiseaseData;
    inspection: InspectionData[];
  };
  editable?: boolean;
  diseaseTab: boolean;
}
interface DiseaseData {
  Description: string;
  EndDate: string;
  Homeless: boolean;
  Id: string;
  StartDate: string;
  diseaseName: string;
}
interface InspectionData {
  ClientId: string;
  Description: string;
  Diagnosis: string;
  Treatment: string;
  DiseaseId: string;
  FullDate: string;
  Id: string;
  Userid: string;
}
class UserData extends React.Component<UserDataProps, UserDataState> {
  componentDidMount() {
    postData(URL_DOMAIN + DISEASE, {ClientId: this.props.data.client.Id}).then(res =>
      this.setState({
        data: this.props.data,
        editable: typeof this.props.editable !== "undefined",
        diseaseData: res,
        diseaseTab: false
      })
    );
  }

  render() {
    if (this.state === null) {
      return <div />;
    }
    const { data, editable } = this.state;
    const hasDisease = this.state.diseaseData.disease !== null;
    return (
      <Container className="user-data">
        {(() => {
          if (!this.state.diseaseTab) {
            return (
              <div>
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
                              data.client.Surname = nameData[0] || "";
                              data.client.Name = nameData[1] || "";
                              data.client.PatronymicName = nameData[2] || "";
                              this.setState({ data });
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        controlId="fio"
                        className="field mr-5"
                      >
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
                      <Form.Group
                        as={Row}
                        controlId="fio"
                        className="field mr-5"
                      >
                        <Form.Label column sm={4} className="label">
                          <strong>Серия и номер паспорта:</strong>
                        </Form.Label>
                        <Col sm={5} className="col">
                          <Form.Control
                            plaintext
                            readOnly={!editable}
                            value={
                              data.client.PassSerial +
                              " " +
                              data.client.PassNumber
                            }
                            className="input"
                            onChange={e => {
                              const passData = e.target.value.split(" ");
                              data.client.PassSerial = passData[0];
                              data.client.PassNumber = passData[1];
                              this.setState({ data });
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        controlId="fio"
                        className="field mr-5"
                      >
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
                      <Form.Group
                        as={Row}
                        controlId="fio"
                        className="field mr-5"
                      >
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
                      <Form.Group
                        as={Row}
                        controlId="fio"
                        className="field mr-5"
                      >
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
                      <Form.Group
                        as={Row}
                        controlId="fio"
                        className="field mr-5"
                      >
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
                      <Form.Group
                        as={Row}
                        controlId="fio"
                        className="field mr-5"
                      >
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
                      <Form.Group
                        as={Row}
                        controlId="fio"
                        className="field mr-5"
                      >
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
                  <Col xs={3} className="d-flex flex-column">
                    <Button
                      className="m-3 button"
                      onClick={() => this.setState({ diseaseTab: true })}
                    >
                      Начать прием
                    </Button>
                    <Accordion>
                      <Card>
                        <Card.Header className="p-3">
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
                        <Card.Header className="p-3">
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
                        <Card.Header className="p-3">
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
                <Row>
                  <Col xs={9} className="pr-1 mt-5">
                    <h6 className="header">История болезни</h6>
                    <Form as={Container}>
                      {(() => {
                        const diseases = [];
                        data.disease.forEach(disease => {
                          diseases.push(
                            <Form.Group as={Row} className="field mr-5">
                              <Form.Label column sm={4} className="label">
                                <strong>{disease.Name}</strong>
                              </Form.Label>
                              <Col sm={5} className="col">
                                <Form.Control
                                  plaintext
                                  readOnly={!editable}
                                  value={disease.Description}
                                  className="input"
                                />
                              </Col>
                              <Col sm={3} className="col">
                                <Form.Control
                                  plaintext
                                  readOnly={!editable}
                                  value={disease.EndDate}
                                  className="input"
                                />
                              </Col>
                            </Form.Group>
                          );
                        });
                        return diseases;
                      })()}
                    </Form>
                  </Col>
                </Row>
              </div>
            );
          }
          return (
            <div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Дата приема</th>
                    <th>Диагноз</th>
                    <th>Жалобы</th>
                    <th>Назначенное лечение</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    if (typeof this.state.diseaseData === "undefined") {
                      return;
                    }
                    const inspections = [];
                    console.log(this.state.diseaseData);
                    this.state.diseaseData.inspection.forEach(inspection => {
                      inspections.push(
                        <tr>
                          <td>{inspection.FullDate}</td>
                          <td>{inspection.Diagnosis}</td>
                          <td>{inspection.Description}</td>
                          <td>{inspection.Treatment}</td>
                        </tr>
                      );
                    });
                    return inspections;
                  })()}
                  <tr>
                    <td />
                  </tr>
                </tbody>
              </Table>
              <Container className="d-flex justify-content-between p-0">
                <div className="d-flex">
                  <Button className="button outline" disabled={hasDisease}>
                    Открыть больничный
                  </Button>
                  <Button className="button outline ml-4" disabled={!hasDisease}>
                    Добавить запись
                  </Button>
                  <Button className="button outline ml-4" disabled={!hasDisease}>
                    Закрыть больничный
                  </Button>
                </div>
                <Button
                  className="button"
                  onClick={() => this.setState({ diseaseTab: false })}
                >
                  Завершить прием
                </Button>
              </Container>
            </div>
          );
        })()}
      </Container>
    );
  }
}

export default UserData;

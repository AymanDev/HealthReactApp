import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./panel.css";
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  FormControl,
  Spinner
} from "react-bootstrap";
import UserData from "../../components/UserData/userdata";
import {
  URL_DOMAIN,
  SNILS,
  postData,
  SnilsRequest,
  EMPTY_SNILS_DATA
} from "../../Helper";
const logo = require("./images/logo.png");
interface PanelPageState {
  snils?: string;
  loading?: boolean;
  snilsData?: SnilsData;
  createMode: boolean;
}
export interface SnilsData {
  allergy: string[];
  chronic: string[];
  client: {
    Addres?: string;
    BirthDate?: string;
    City?: string;
    Gender?: string;
    Id?: string;
    Insurance?: string;
    PassDate?: string;
    PassNumber?: string;
    PassPlace?: string;
    PassSerial?: string;
    Snils?: string;
    Name?: string;
    PatronymicName?: string;
    Surname?: string;
  };
  disiease: {
    Name: string;
    EndDate: string;
    Description: string;
  }[];
  vaccine: {
    VaccineName: string;
    VaccineDate: string;
  }[];
}
class PanelPage extends React.Component<any, PanelPageState> {
  state = {
    snils: "",
    snilsData: null,
    loading: false,
    createMode: false
  };

  logout() {
    localStorage.setItem("userData", null);
    this.props.history.push("/");
  }

  async search() {
    this.setState({ loading: true, createMode: false });
    const data: SnilsRequest = {
      snils: this.state.snils
    };
    try {
      const responseData: SnilsData = await postData(URL_DOMAIN + SNILS, data);
      this.setState({ snilsData: responseData, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  enterCreateMode() {
    this.setState({
      createMode: true
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar justify-content-between">
          <Container>
            <Navbar.Brand className="d-flex flex-row justift-content-center align-items-center">
              <img
                src={logo}
                alt="Logo"
                width="60"
                height="69"
                className="d-inline-block align-top logo"
              />
              <strong className="title ml-2">Health</strong>
            </Navbar.Brand>
            <Button className="button" onClick={() => this.logout()}>
              Выйти
            </Button>
          </Container>
        </Navbar>
        <Container className="snils-bar">
          <Row>
            <Col xs={3}>
              <FormControl
                className="input text-center"
                placeholder="Поиск пациента по СНИЛС"
                aria-label="Поиск пациента по СНИЛС"
                defaultValue="11111111111"
                onChange={event => this.setState({ snils: event.target.value })}
              />
            </Col>
            <Col xs={1} className="p-0">
              <Button className="button" onClick={() => this.search()}>
                Найти
              </Button>
            </Col>
            <Col xs={3} className="ml-4">
              <Button
                className="button outline"
                onClick={() => this.enterCreateMode()}
              >
                Завести новую карточку
              </Button>
            </Col>
          </Row>
        </Container>
        {(() => {
          if (this.state.snilsData !== null) {
            return <UserData data={this.state.snilsData} />;
          }
          if (this.state.createMode) {
            return <UserData data={EMPTY_SNILS_DATA} editable={true} />;
          }
          if (this.state.loading) {
            return (
              <Container className="w-100 h-100 d-flex align-items-center justify-content-center color-primary">
                <FontAwesomeIcon icon={faSpinner} spin size="5x" />
              </Container>
            );
          }
        })()}
      </div>
    );
  }
}

export default PanelPage;

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
  Spinner,
  Nav,
  Tabs,
  Tab
} from "react-bootstrap";
import UserData from "../../components/UserData/userdata";
import {
  URL_DOMAIN,
  SNILS,
  postData,
  SnilsRequest,
  EMPTY_SNILS_DATA
} from "../../Helper";
import StatisticsPage from "../StatisticPage/statistics";
const logo = require("./images/logo.png");
interface PanelPageState {
  snils?: string;
  loading?: boolean;
  snilsData?: SnilsData;
  createMode: boolean;
  activeTab: string;
  fio?: string;
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
  disease: {
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
    createMode: false,
    activeTab: "user-data",
    fio: ""
  };

  componentDidMount() {
    this.setState({ fio: localStorage.getItem("fio") });
  }

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
      createMode: true,
      snilsData: null
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar justify-content-between">
          <Container>
            <Navbar.Brand
              href="/panel"
              className="d-flex flex-row justify-content-center align-items-center"
            >
              <img
                src={logo}
                alt="Logo"
                width="60"
                height="69"
                className="d-inline-block align-top logo"
              />
              <strong className="title ml-2 mt-3">Health</strong>
            </Navbar.Brand>
            <Nav className="mr-auto mt-3">
              <Nav.Link
                className={
                  "ml-4 menu-item" +
                  (this.state.activeTab === "user-data" ? " active" : "")
                }
                onClick={() => this.setState({ activeTab: "user-data" })}
              >
                Пациенты
              </Nav.Link>
              <Nav.Link
                className={
                  "ml-4 menu-item" +
                  (this.state.activeTab === "statistics" ? " active" : "")
                }
                onClick={() => this.setState({ activeTab: "statistics" })}
              >
                Статистика
              </Nav.Link>
            </Nav>
            <h4 className="mt-3 mr-4">{this.state.fio}</h4>
            <Button className="button" onClick={() => this.logout()}>
              Выйти
            </Button>
          </Container>
        </Navbar>
        {(() => {
          if (this.state.activeTab === "statistics") {
            return <StatisticsPage />;
          }
          if (this.state.activeTab === "user-data") {
            return (
              <div>
                <Container className="snils-bar">
                  <Row>
                    <Col xs={3}>
                      <FormControl
                        className="input text-center"
                        placeholder="Поиск пациента по СНИЛС"
                        aria-label="Поиск пациента по СНИЛС"
                        onChange={event =>
                          this.setState({ snils: event.target.value })
                        }
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
                <Container>
                  {(() => {
                    if (this.state.snilsData !== null) {
                      return <UserData data={this.state.snilsData} />;
                    }
                    if (this.state.createMode) {
                      return (
                        <UserData data={EMPTY_SNILS_DATA} editable={true} />
                      );
                    }
                    if (this.state.loading) {
                      return (
                        <Container className="w-100 h-100 d-flex align-items-center justify-content-center color-primary">
                          <FontAwesomeIcon icon={faSpinner} spin size="5x" />
                        </Container>
                      );
                    }
                  })()}
                </Container>
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

export default PanelPage;

import React = require("react");
import {
  postData,
  URL_DOMAIN,
  DICTIONARIES,
  getData,
  STATISTICS,
  StatisticsRequest
} from "../../Helper";
import SelectBox from "devextreme-react/select-box";
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid
} from "devextreme-react/chart";
import {
  Container,
  DropdownButton,
  Dropdown,
  Form,
  InputGroup,
  Button
} from "react-bootstrap";
import { faSortAmountDown } from "@fortawesome/free-solid-svg-icons";

interface StatisticsPageState {
  dictionaries?: {
    cityMass: {
      District: string;
      Id: string;
      Name: string;
    }[];
    diseaseMass: {
      Id: string;
      DiseaseName: string;
    }[];
  };
  cityId?: string;
  cityName?: string;
  diseaseId?: string;
  startDate?: string;
  endDate?: string;
  statistics?: {
    Response: { [date: string]: number };
    LMax: number;
    LMin: number;
    CityName: string;
  };
}
class StatisticsPage extends React.Component<any, StatisticsPageState> {
  constructor(props) {
    super(props);
    this.state = { dictionaries: null, statistics: null };
  }

  async componentDidMount() {
    const dictionaries = await getData(URL_DOMAIN + DICTIONARIES);
    this.setState({ dictionaries });
  }

  async statisticsUpdate() {
    const data: StatisticsRequest = {
      cityId: this.state.cityId,
      diseaseId: this.state.diseaseId,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    const statistics = await postData(URL_DOMAIN + STATISTICS, data);
    this.setState({ statistics, cityName: statistics.CityName });
  }

  render() {
    const energySources = [
      { value: "amountC", name: this.state.cityName },
      { value: "amountLMin", name: "Минимальное отклонение" },
      { value: "amountLMax", name: "Максимальное отклонение" }
    ];
    const diseaseInfo = [];

    if (this.state.statistics !== null) {
      const { statistics } = this.state;
      const dates = Object.keys(statistics.Response);
      dates.forEach(date => {
        diseaseInfo.push({ date, amountC: statistics.Response[date] });
        diseaseInfo.push({ date, amountLMin: statistics.LMin });
        diseaseInfo.push({ date, amountLMax: statistics.LMax });
    });
    }
    return (
      <Container>
        <Container className="d-flex flex-row my-5">
          <select
            className="custom-select"
            onChange={e => this.setState({ diseaseId: e.target.value })}
            required
          >
            <option selected>Выберите болезнь</option>
            {(() => {
              if (this.state.dictionaries === null) return;
              const diseases = [];
              this.state.dictionaries.diseaseMass.forEach(disease => {
                diseases.push(
                  <option value={disease.Id}>{disease.DiseaseName}</option>
                );
              });
              return diseases;
            })()}
          </select>
          <select
            className="custom-select ml-2"
            required
            onChange={e => this.setState({ cityId: e.target.value })}
          >
            <option selected>Выберите город</option>
            {(() => {
              if (this.state.dictionaries === null) return;
              const cities = [];
              this.state.dictionaries.cityMass.forEach(city => {
                cities.push(<option value={city.Id}>{city.Name}</option>);
              });
              return cities;
            })()}
          </select>
          <InputGroup className="ml-2">
            <InputGroup.Prepend>
              <InputGroup.Text>от:</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="date"
              required
              onChange={e => this.setState({ startDate: e.target.value })}
            />
          </InputGroup>
          <InputGroup className="ml-2">
            <InputGroup.Prepend>
              <InputGroup.Text>до:</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="date"
              required
              onChange={e => this.setState({ endDate: e.target.value })}
            />
          </InputGroup>
          <Button
            className="button w-100 ml-2"
            onClick={() => this.statisticsUpdate()}
          >
            Посмотреть статистику
          </Button>
        </Container>
        <div id={"chart-demo"}>
          <Chart palette={"Soft Blue"} dataSource={diseaseInfo}>
            <CommonSeriesSettings argumentField={"date"} />
            {energySources.map(function(item) {
              return (
                <Series
                  key={item.value}
                  valueField={item.value}
                  name={item.name}
                />
              );
            })}
            <Margin bottom={20} />
            <ArgumentAxis
              valueMarginsEnabled={false}
              discreteAxisDivisionMode={"crossLabels"}
            >
              <Grid visible={true} />
            </ArgumentAxis>
            <Legend
              verticalAlignment={"bottom"}
              horizontalAlignment={"center"}
              itemTextPosition={"bottom"}
            />
            <Title text={"График заболеваемости Туле"} />
          </Chart>
        </div>
      </Container>
    );
  }
}

export default StatisticsPage;

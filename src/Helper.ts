import { SnilsData } from "./components/PanelPage/panel";

export const URL_DOMAIN = "http://730b8391.ngrok.io/";
export const AUTH = "api/Health/Auth";
export const SNILS = "api/Health/GetClient";
export const DISEASE = "api/Health/GetDiseaseHistory";

export const EMPTY_SNILS_DATA: SnilsData = {
  allergy: [],
  chronic: [],
  disease: [],
  client: {
    Addres: "",
    BirthDate: "",
    City: "",
    Gender: "",
    Id: "",
    Insurance: "",
    PassDate: "",
    PassNumber: "",
    PassPlace: "",
    PassSerial: "",
    Snils: "",
    Name: "",
    PatronymicName: "",
    Surname: ""
  },
  vaccine: []
};

export interface AuthRequest {
  login: string;
  pass: string;
}
export interface SnilsRequest {
  snils: string;
}

export async function postData(url, data): Promise<any> {
  switch (url) {
    case URL_DOMAIN + AUTH: {
      return Promise.resolve({ Id: "0", ClientId: "0" });
    }
    case URL_DOMAIN + SNILS: {
      return Promise.resolve({
        allergy: ["Аллергия1", "Аллергия2"],
        chronic: ["Хроническое 1", "Хроническое 2"],
        client: {
          Adres: "Адрес",
          BirthDate: "10-05-1996",
          City: "Тула",
          Gender: "мужской",
          Id: "0",
          Insurance: "1234567890",
          PassDate: "10-05-2012",
          PassSerial: "7001",
          PassNumber: "357940",
          PassPlace: "УМВД России по Тульской области",
          Snils: "1234567890",
          Name: "Имя",
          PatronymicName: "Отчество",
          Surname: "Фамилия"
        },
        disease: [
          {
            Name: "Болезнь",
            EndDate: "28-02-2019",
            Description: "Описание"
          }
        ],
        vaccine: [
          { VaccineName: "Название вакцины", VaccineDate: "10-04-2019" }
        ]
      });
    }
    case URL_DOMAIN + DISEASE:
      return Promise.resolve({
        disease: {
          Description: "Кашель",
          EndDate: "20-02-2019",
          Homeless: false,
          Id: "0",
          StartDate: "10-02-2019",
          diseaseName: "ОРВИ"
        },
        inspection: [
          {
            ClientId: "0",
            Description: "Кашель",
            Diagnosis: "ОРВИ",
            Treatment: "Доктор МОМ",
            DiseaseId: "0",
            FullDate: "15-02-2019",
            Id: "0",
            Userid: "0"
          },
          {
            ClientId: "0",
            Description: "Кашель",
            Diagnosis: "ОРВИ",
            Treatment: "Малавит",
            DiseaseId: "0",
            FullDate: "15-02-2019",
            Id: "1",
            Userid: "0"
          }
        ]
      });
  }
  // const reponse = await fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: new Headers({
  //     "Content-Type": "application/json"
  //   })
  // });
  // return await reponse.json();
}

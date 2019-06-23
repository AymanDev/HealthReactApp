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
  const reponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });
  return await reponse.json();
}

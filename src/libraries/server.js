//const api_url = 'http://127.0.0.1:5003'
const api_url = 'https://certifast.linuxopensource.mx';
const login = '/api/login';
const contractorList = '/api/v0/contratistas';
const constractorAdd = '/api/v0/contratistas';
const add_incident = '/api/v0/add_incident';
const addCheckIn = '/api/v0/AddCheckIn';
const addCheckOut = '/api/v0/AddCheckOut';

//const Platform = require('Platform');
import AsyncStorage from '@react-native-community/async-storage';

const createFormData = (foto, cuerpo) => {
  const formData = new FormData();

  formData.append('incident_image', {
    name: foto.fileName,
    type: foto.type,
    uri: foto.uri,
    //Platform.OS === "android" ? foto.uri : foto.uri.replace("file://", "")
  });

  Object.keys(cuerpo).forEach(key => {
    formData.append(key, cuerpo[key]);
  });
  return formData;
};

export default {
  login: async function() {
    try {
      AsyncStorage.setItem('API_URL', api_url);
    } catch (error) {
      console.log(error);
    }

    try {
      const formData = new FormData();
      formData.append('username', 'bc');
      formData.append('password', 'bc');
      const config = {
        method: 'post',
        headers: {
          Accept: 'application/json',
          //              "Content-type":"application/json"
        },
        body: formData,
      };
      //  console.log(config);
      let response = await fetch(`${api_url}${login}`, config);
      console.log("respuesta",response)
      var JWT = response.headers.get('jwt-token');

      console.log("TOKEN-->",JWT)
      return JWT;
    } catch (error) {
      console.log("Exception")
      //console.log(`Error is ${error}`);
      return error
    }
  },
  createSession: async function(props) {
    try {
      AsyncStorage.setItem('API_URL', api_url);
    } catch (error) {
      console.log(error);
    }
    try {
      const formData = new FormData();
      formData.append('username', props.username);
      formData.append('password', props.password);
      const config = {
        method: 'post',
        headers: {
          Accept: 'application/json',
          //              "Content-type":"application/json"
        },
        body: formData,
      };
      //  console.log(config);
      let response = await fetch(`${api_url}${login}`, config);
      if(response.status == 200){
        console.log("Solicitando TOKEN",response)
        var JWT = response.headers.get('jwt-token');
        //console.log("TOKEN",JWT)
        return {token:JWT}
      }else{
        throw new Error("User/Password Invalid")
      }
    } catch (error) {
      let message = `${error}`;
      message = message.replace(/TypeError\:/g,"");
      message = message.replace(/Error\:/g,"")

      return {token:null,error:message};

    }
  },
  getSecurityProfile: async function(Token, email_seguridad) {
    try {
      //let token = await login()
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `JWT ${Token}`);

      var request = {
        headers: myHeaders,
        //body: formData,
        method: 'GET',
      };

      console.log(request);
      let response = await fetch(
        `${api_url}/api/v0/empleado_seguridad/${email_seguridad}`,
        request,
      );
      console.log(response);
      let responseJson = await response.json();
      //console.log(responseJson)
      return responseJson;
    } catch (error) {
      return null;
      console.log(`Error is ${error}`);
    }
  },
  getContratistas: async function() {
    try {
      let token = await login();
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Autorization', `JWT ${token}`);

      let response = await fetch(`${api}${contractorList}`, myHeaders);
      let responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      console.log(`Error is ${error}`);
    }
  },
  add_incidente: async function(token, body, photo) {
    var myHeaders = new Headers();
    myHeaders.append('content-Type', 'multipart/form-data');
    //  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('accept', 'application/json');
    myHeaders.append('authorization', `JWT ${token}`);

    const formData = new FormData();

    formData.append('incident_image', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });
    console.log(body, photo);
    //uri:"file:///storage/emulated/0/Pictures/image-23647c2a-5e76-4083-98f4-81a90d92adc0.jpg",

    try {
      var request = {
        headers: myHeaders,
        body: formData,
        method: 'POST',
      };
      //const api = "http://127.0.0.1:3001/api/upload";
      const api = `${api_url}${add_incident}`;
      console.log('REQUEST', api, request);

      let response = await fetch(api, request);

      let responseJson = await response.json();

      console.log('DATA Response INCIDENT', responseJson);

      return responseJson;
    } catch (error) {
      console.log(`Error is ${error}`);
      return {error: JSON.stringify(error)};
    }
  },
  add_checkIn: async function(token, body) {
    var myHeaders = new Headers();
    //myHeaders.append("content-Type", "multipart/form-data");
    //  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append('accept', 'application/json');
    myHeaders.append('authorization', `JWT ${token}`);
    myHeaders.append('Content-Type', 'application/json');

    try {
      var request = {
        headers: myHeaders,
        body: JSON.stringify(body),
        method: 'POST',
      };
      //const api = "http://127.0.0.1:3001/api/upload";
      const api = `${api_url}/api/v0/add_checkin`;

      console.log('REQUEST', api, request);

      let response = await fetch(api, request);
      console.log(response.status);
      if (response.status === 400) {
        throw new Error(response);
      } else {
        let responseJson = await response.json();
        return responseJson;
      }
    } catch (error) {
      console.log(`Error is ${JSON.stringify(error)}`);
      return {error: JSON.stringify(error)};
    }
  },
  add_checkout: async function(token, body) {
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('authorization', `JWT ${token}`);
    myHeaders.append('Content-Type', 'application/json');
    try {
      var request = {
        headers: myHeaders,
        body: JSON.stringify(body),
        method: 'POST',
      };
      const api = `${api_url}/api/v0/add_checkout`;

      console.log('REQUEST', api, request);

      let response = await fetch(api, request);
      console.log(response.status);
      if (response.status !== 200) {
        throw new Error(response);
      } else {
        let responseJson = await response.json();
        return responseJson;
      }
    } catch (error) {
      console.log(`Error is ${JSON.stringify(error)}`);
      return {error: JSON.stringify(error)};
    }
  },

  getContratistaInfoByNanoId: async function(Token, nanoId) {
    try {
      //let token = await login()
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `JWT ${Token}`);

      var request = {
        headers: myHeaders,
        //body: formData,
        method: 'GET',
      };

      //  console.log(request)
      let response = await fetch(
        `${api_url}/api/v0/contratista_by_nano_id/${nanoId}`,
        request,
      );
      console.log(response);
      if (response.status == 400) {
        console.log("Lanzo Exception",response)
        throw new Error(response.json());
      } else {
        let responseJson = await response.json();
        return {data:responseJson[0],message:null};
      }

    } catch(error) {
      let message = `${error}`;
      message = message.replace(/TypeError\:/g,"");
      message = message.replace(/Error\:/g,"")

      return {data:null,message:message};
    }
  },
  getContratistaTimeline: async function(Token, email_contratista) {
    try {
      //let token = await login()
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `JWT ${Token}`);

      var request = {
        headers: myHeaders,
        //body: formData,
        method: 'GET',
      };

      console.log(request);
      let response = await fetch(
        `${api_url}/api/v0/contratista_timeline/${email_contratista}`,
        request,
      );
      console.log(response);
      let responseJson = await response.json();
      //console.log(responseJson)
      return responseJson;
    } catch (error) {
      return null;
      console.log(`Error is ${error}`);
    }
  },
  getPlantaTimeline: async function(Token, email_contratista) {
    try {
      //let token = await login()
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `JWT ${Token}`);

      var request = {
        headers: myHeaders,
        //body: formData,
        method: 'GET',
      };

      console.log(request);
      let response = await fetch(
        `${api_url}/api/v0/planta_timeline/${email_contratista}`,
        request,
      );
      //  console.log(response);
      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      return null;
      console.log(`Error is ${error}`);
    }
  },
};

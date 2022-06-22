export default class ApiService {
  static async get(url) {
    const response = await fetch(url, {
      mode: "cors",
    });
    if (response.status < 400) {
      return await response.json();
    }

    throw response;
  }

  static async put(url, body = {}) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.status < 400) {
      return await response.json();
    }

    throw response;
  }
}

export default class BookApiService {
  _domain = "https://629d9e2d3dda090f3c05f35a.mockapi.io/isbn";

  getToken = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const { token } = JSON.parse(user);
      return `Token ${token}`;
    }
    return "";
  };

  async getResource(url, options) {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: this.getToken(),
      },
      body: JSON.stringify(options.body),
      method: options.method,
    };

    return fetch(`${url}`, requestOptions)
      .then((res) => res.json())
      .catch((e) => {
        throw new Error(`Возникла ошибка ${e.name}`);
      });
  }

  getBooksData = async () =>
    this.getResource(`${this._domain}`, { method: "GET" });

  getBook = async (id) =>
    this.getResource(`${this._domain}/${id}`, { method: "GET" });

  createBook = async (data) =>
    this.getResource(`${this._domain}`, {
      method: "POST",
      body: data,
    });

  updateBook = async (data, id) =>
    this.getResource(`${this._domain}/${id}`, {
      method: "PUT",
      body: data,
    });

  deleteBook = async (id) =>
    this.getResource(`${this._domain}/${id}`, { method: "DELETE" });
}

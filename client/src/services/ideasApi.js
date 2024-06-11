import axios from 'axios';

class IdeasApi {
  constructor() {
    this._apiUrl = 'http://localhost:4000/api/ideas';
  }
  // this returns a Promise
  getIdeas() {
    return axios.get(this._apiUrl);
  }

  createIdea(data) {
    // make post request
    return axios.post(this._apiUrl, data);
  }

  updateIdea(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }

  deleteIdea(id) {
    // get the username from the localStorage if it's there if not set the variable to empty string
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    // use delete method on axios and pass the url (http://localhost:4000/api/ideas/id) and the object where data equals our username variable
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        username,
      },
    });
  }
}

// we can initialize this class here, so we can start using it
export default new IdeasApi();

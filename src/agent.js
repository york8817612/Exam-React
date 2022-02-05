import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

// eslint-disable-next-line no-undef
const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://localhost:7140/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
  superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
  superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
  superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
  superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).withCredentials().then(responseBody)
};

const Auth = {
    current: () =>
      requests.get('/user'),
    login: (email, password) =>
      requests.post('/users/login', { user: { email, password } }),
    register: (username, email, password) =>
      requests.post('/users', { user: { username, email, password } }),
    save: user =>
      requests.put('/user', { user })
};

const ExamItems = {
    list: () =>
        requests.get('/ExamItems'),
    add: (name, enable) => 
        requests.post('/ExamItems', { name: name, enable: enable }),
    save: exam => 
        requests.put(`/ExamItems/${exam.id}`, exam),
};

const QuestionItems = {
  list: id =>
      requests.get(`/QuestionItems/${id}`),
  add: (id, type, text, items) => 
      requests.post('/QuestionItems', { examItemId: id, questionType: type, text: text, anwserItems: items }),
  save: exam => 
      requests.put(`/QuestionItems/${exam.id}`, exam),
};

export default {
    ExamItems,
    QuestionItems,
    Auth,
    setToken: _token => { token = _token; }
  };
import axios, { Method } from 'axios';
import gitHubAuth from '../../config/gitHubAuth'

interface RequestParams {
  method?: Method
  url: string
  data?: object | string,
  params?: object,
  headers?: object
}

const { personalAccessToken } = gitHubAuth;
const BASE_URL = 'https://api.github.com/';

class GitHubApiService {  
  public makeRequest = <T = any>({ method = 'GET', url, data, params }: RequestParams)  => {
    const headers = {
      Authorization: `token ${personalAccessToken}`,
      Accept: 'application/vnd.github.squirrel-girl-preview'
    }

    return axios.request<T>({
      method,
      url: `${BASE_URL}${url}`,
      data,
      params,
      headers
    });
  }
  
  

}

export default new GitHubApiService();

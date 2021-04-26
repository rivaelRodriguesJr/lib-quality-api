import knex from '../../config/database/connection';
import IssuesService from './IssuesService';

class CronService {

  public saveIssues = async () => {
    const repositoriesIds = (await knex('users_repositories').distinct('repository_id')).map(({ repository_id }) => repository_id);
    const repositories = await knex.select('*').from('repositories').whereIn('id', repositoriesIds);

    for (const repository of repositories) {
      await IssuesService.saveSearch(repository);
    }
  }
}

export default new CronService();

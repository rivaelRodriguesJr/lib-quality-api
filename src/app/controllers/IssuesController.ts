import { Request, Response } from 'express';
import moment from 'moment';
import { tb_issue_searches } from '../models/IssueSearch';

import { Repository } from '../models/Repositoy';
import IssuesService from '../services/IssuesService';
import knex from '../../config/database/connection';

class IssuesController {

  public find = async (request: Request, response: Response) => {
    const { userId } = (request as any);

    const dateStart = moment().startOf('day').toDate();
    const dateEnd = moment().endOf('day').toDate();

    const issueSearches: tb_issue_searches[] = await knex.select('issue_searches.*', 'repositories.name as repository_name', 'repositories.owner as repository_owner')
      .from<tb_issue_searches>('issue_searches')
      .join('users_repositories', 'issue_searches.repository_id', '=', 'users_repositories.repository_id')
      .join('repositories', 'issue_searches.repository_id', '=', 'repositories.id')
      .whereBetween('moment', [dateStart, dateEnd])
      .andWhere('users_repositories.user_id', userId);

    issueSearches.forEach(issue => issue.moment = new Date(issue.moment));

    return response.json(issueSearches);
  }

  public refresh = async (request: Request, response: Response) => {
    const { userId } = (request as any);

    const repositories = await knex('repositories')
      .join('users_repositories', 'repositories.id', '=', 'users_repositories.repository_id')
      .where('users_repositories.user_id', userId)
      .select<Repository[]>('repositories.*');


    for (const repository of repositories) {
      await IssuesService.saveSearch(repository).then(res => console.log(res));
    }

    return response.json({ ok: true });
  }

  public history = async (request: Request, response: Response) => {
    const { userId } = (request as any);

    const repositories = await knex('repositories')
      .join('users_repositories', 'repositories.id', '=', 'users_repositories.repository_id')
      .where('users_repositories.user_id', userId)
      .select<Repository[]>('repositories.*');

    const repositoriesIds = repositories.map(({ id }) => id);

    const issueSearches: tb_issue_searches[] = await knex.select('issue_searches.*')
      .from<tb_issue_searches>('issue_searches')
      .whereIn('repository_id', repositoriesIds).orderBy('moment', 'desc');

    issueSearches.forEach(issue => issue.moment = new Date(issue.moment));


    const result = repositories.map(repository => {
      return {
        ...repository,
        issueSearches: issueSearches.filter(issueSearch => issueSearch.repository_id === repository.id)
      }
    })


    return response.json(result);
  }

}

export default new IssuesController();

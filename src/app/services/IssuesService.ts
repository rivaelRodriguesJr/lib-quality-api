import moment from 'moment';

import knex from '../../config/database/connection';
import { GitHubIssue } from '../models/GitHubIssue';
import { GitHubRepository } from '../models/GitHubRepository';
import { tb_issue_searches } from '../models/IssueSearch';
import { Repository } from '../models/Repositoy';
import GitHubApiService from './GitHubApiService';

class IssuesService {

  public saveSearch = async (repository: Repository) => {
    const { id: repositoryId, owner, name: repo } = repository;

    console.log({ repository });

    const { data } = await this.getRepository(owner, repo);

    const issuesQtd: number = data.open_issues_count;
    const moments = (await this.getIssues(owner, repo, issuesQtd)).map(issue => issue.moment);

    const issuesAverage: number = this.getAverage(moments);
    const issuesStandartDeviation: number = this.getStandardDeviation(moments, issuesAverage);

    const dateStart = moment().startOf('day').toDate();
    const dateEnd = moment().endOf('day').toDate();

    const [issueSearch] = await knex.select('*').from<tb_issue_searches>('issue_searches')
      .whereBetween('moment', [dateStart, dateEnd])
      .andWhere('repository_id', repositoryId);

    const issue: tb_issue_searches = {
      issues_qtd: issuesQtd,
      issues_average: issuesAverage,
      issues_standart_deviation: issuesStandartDeviation,
      moment: moment().toDate(),
      repository_id: repositoryId
    }

    console.log({ issue, issueSearch });

    const trx = await knex.transaction();
    if (issueSearch) {
      await trx('issue_searches').where('id', issueSearch.id).update(issue)
    } else {
      await trx('issue_searches').insert(issue);
    }
    await trx.commit();

    return { issuesQtd, issuesAverage, issuesStandartDeviation };
  }

  private getRepository = (owner: string, repo: string) => {
    return GitHubApiService.makeRequest<GitHubRepository>({
      method: `GET`,
      url: `repos/${owner}/${repo}`
    })
  }

  private getIssues = async (owner: string, repo: string, openIssues: number) => {
    const issues: GitHubIssue[] = [];

    let page = 1

    while (issues.length < openIssues) {
      const { data } = await GitHubApiService.makeRequest<GitHubIssue[]>({
        method: `GET`,
        url: `repos/${owner}/${repo}/issues`,
        params: {
          per_page: 100,
          page
        }
      });

      issues.push(...data.map(issue => ({
        id: issue.id,
        title: issue.title,
        created_at: issue.created_at,
        moment: moment().diff(issue.created_at, 'milliseconds')
      })));

      page++;
    }

    return issues;
  }

  private getAverage = (array: number[]) => {
    return array.reduce((acc, curr) => acc + curr) / array.length;
  }

  private getStandardDeviation = (array: number[], average: number) => {
    return Math.sqrt(array.map(x => Math.pow(x - average, 2)).reduce((acc, curr) => acc + curr) / array.length);
  }

}

export default new IssuesService();

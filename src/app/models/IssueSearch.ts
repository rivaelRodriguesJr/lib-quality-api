import Repository from "./Repositoy";

export interface IssueSearch {
  id: number;
  issuesQtd: number;
  issuesAverage: number;
  issuesStandartDeviation: number;
  moment: Date;
  repository: Repository
}

export interface tb_issue_searches {
  id?: number;
  issues_qtd: number;
  issues_average: number
  issues_standart_deviation: number,
  moment: Date;
  repository_id: number;
}

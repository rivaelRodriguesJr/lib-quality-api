import {IssueSearch} from "./IssueSearch";

export interface Repository {
  id: number;
  owner: string;
  name: string;

  issueSearches: IssueSearch[];
}

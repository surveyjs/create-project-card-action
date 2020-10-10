import {Octokit} from '@technote-space/github-action-helper/dist/types';
import {Utils} from '@technote-space/github-action-helper';
import {Logger} from '@technote-space/github-action-log-helper';
import {SLEEP} from '../constant';

export const getColumnIds = async(projectIds: Array<number>, columnName: string, logger: Logger, octokit: Octokit): Promise<Array<number>> => {
  const columnIds: Array<number> = [];
  for (const projectId of projectIds) {
    const columnId = (await octokit.paginate(
      octokit.projects.listColumns,
      {'project_id': projectId},
    )).find(item => item.name === columnName)?.id;
    if (undefined !== columnId) {
      columnIds.push(columnId);
    }
    await Utils.sleep(SLEEP);
  }

  return columnIds;
};
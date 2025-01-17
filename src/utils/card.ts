import {Octokit} from '@technote-space/github-action-helper/dist/types';
import {Utils} from '@technote-space/github-action-helper';
import {Logger} from '@technote-space/github-action-log-helper';
import {SLEEP} from '../constant';

const createCard = async(columnId: number, contentId: number, contentType: string, logger: Logger, octokit: Octokit): Promise<boolean> => {
  try {
    await octokit.rest.projects.createCard({
      'column_id': columnId,
      'content_id': contentId,
      'content_type': contentType,
    });
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    logger.warn(error.message);
    return false;
  } finally {
    await Utils.sleep(SLEEP);
  }

  return true;
};

export const createCards = async(columnIds: Array<number>, contentId: number, contentType: string, logger: Logger, octokit: Octokit): Promise<{ total: number; succeeded: number; failed: number }> => {
  const results: Array<boolean> = [];
  for (const columnId of columnIds) {
    results.push(await createCard(columnId, contentId, contentType, logger, octokit));
  }

  return {
    total: results.length,
    succeeded: results.filter(result => result).length,
    failed: results.filter(result => !result).length,
  };
};

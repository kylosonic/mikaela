export enum AppStage {
  INTRO = 'INTRO',
  VALENTINE_QUESTION = 'VALENTINE_QUESTION',
  DATE_QUESTION = 'DATE_QUESTION',
  SUCCESS = 'SUCCESS'
}

export interface PoemResponse {
  poem: string;
}

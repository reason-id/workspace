/*
    "rescript-820": "npm:bs-platform@8.2.0",
    "rescript-902": "npm:bs-platform@9.0.2",
    "rescript-912": "npm:rescript@9.1.2",
*/

export interface BuildExecutorSchema {
  compilerVersion: '820' | '902' | '912';
  watch?: boolean;
  ws?: string;
} // eslint-disable-line

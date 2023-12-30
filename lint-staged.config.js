/* eslint-disable @typescript-eslint/no-unused-vars */
module.exports = {
  'src/**/*.ts': () => 'tsc --noEmit',

  '*.ts': ['eslint --fix', 'prettier --write'],
};

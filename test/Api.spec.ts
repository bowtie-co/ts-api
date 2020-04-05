import { Api, ApiResource, Build } from '../';

// const token = '6ea512c5b23725f1963c4eaacb10c035d04a2182';

describe('Build', () => {
  it('exists', () => {
    expect(Build).toBeDefined();
    expect(Build).toBeInstanceOf(ApiResource);
  });

  it('can config api', () => {
    Build.config({
      root: 'https://sls-ci.ngrok.io',
      stage: 'dev',
      prefix: 'api',
      version: 'v1',
      authorization: 'Bearer',
      secureOnly: false,
      verbose: false
    });

    expect(Build.api).toBeDefined();
  });

  // it('can authorize api', () => {
  //   Build.api.authorize({ token });

  //   expect(Build.api).toBeDefined();
  // });

  it('can get all', async () => {
    const token = '6ea512c5b23725f1963c4eaacb10c035d04a2182';
    Build.api.authorize({ token });
    const builds = await Build.all();

    expect(builds.length).toBeDefined();
    console.log(builds.length, 'Builds', builds);

    if (builds.length > 0) {
      expect(builds[0]).toBeInstanceOf(Build);
    }
  });
});

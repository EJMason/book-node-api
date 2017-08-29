import * as pgp from 'pg-promise';

/**
 * We can use abstract classes here since
 * models will share a lot of the same properties
 */

abstract class DbModel {
  protected host: string;
  protected port: number | string;
  protected database?: string;
  protected user: string;
  // const db: <IDatabase<IExtensions> & IExtensions>pgp(config);
}

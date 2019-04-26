import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private dbname : string 		= "toddlytic.db";
  private databaseReady: BehaviorSubject<boolean>;

  constructor(public http: HttpClient, public sqlitePorter: SQLitePorter, 
    public storage: Storage, private sqlite: SQLite, private platform: Platform) {
    console.log('Hello DatabaseProvider Provider');

    this.databaseReady = new BehaviorSubject(false);
    /*
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.dbname,
        location: 'local_default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
    */
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  fillDatabase() {
    this.http.get('assets/sql/startup.sql')
      .map(res => res.toString())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }

  /**
  * @public
  * @method dataExistsCheck
  * @param tableName    {String}          Name of table we want to check for data
  * @description          Checks that data exists within the specified SQLite table
  * @return {Promise}
  */
  dataExistsCheck(tableName : string) {
    return new Promise((resolve, reject) =>{
      this.database.executeSql('SELECT count(*) AS numRows FROM ' + tableName, [])
      .then((data : any) => {
        var numRows = data.rows.item(0).numRows;
        resolve(numRows);
      })
      .catch((e) => {
        reject(e);
      });
    });
  }

  /**
  * @public
  * @method insertRecord
  * @param columns    {String}          The list of columns with comma separator
  * @param values    {String}           The value or values comma separated
  * @param table    {String}            The table to insert to
  * @description          Inserts all records from the technologies SQLite table
  * @return {Promise}
  */
  insertRecord(columns : string, values : string, table : string){
    return new Promise((resolve, reject) =>  {
      let stm = "INSERT INTO "+ table + " (" + columns + ") " + values ;
      this.database.executeSql(stm, [])
      .then((data : any) => {
        resolve(data);
      })
      .catch((error : any) =>
      {
        reject(error);
      });
    });
   } 

  /**
   * @public
   * @method updateRecord
   * @param query    {String}          The update criteria based on the table
   * @param setter    {String}         The column name and value comma separated e.g. name='casey jones',desc='';
   * @param table    {String}            The table to update
   * @description          Inserts all records from the technologies SQLite table
   * @return {Promise}
   */
  updateRecord(query : string, setter : string, table : string){
    return new Promise((resolve, reject) =>  {
      let stm = "UPDATE "+ table + " SET " + setter + " WHERE " + query ;
      this.database.executeSql(stm, [])
      .then((data : any) => {
        resolve(data);
      })
      .catch((error : any) =>
      {
        reject(error);
      });
    });
  }

  /**
   * @public
   * @method deleteRecord
   * @param query    {String}          The update criteria based on the table
   * @param table    {String}            The table to update
   * @description          Inserts all records from the technologies SQLite table
   * @return {Promise}
   */
  deleteRecord(query : string, table : string){
    return new Promise((resolve, reject) =>  {
      let stm = "DELETE FROM "+ table + " WHERE " + query ;
      this.database.executeSql(stm, [])
      .then((data : any) => {
        resolve(data);
      })
      .catch((error : any) =>
      {
        reject(error);
      });
    });
  } 

  /**
   * @public
   * @method retrieveAllRecords
   * @description          Retrieves all stored records from the technologies SQLite table
   * @return {Promise}
   */
  retrieveAllRecords(query : string, table : string){
    return new Promise((resolve, reject) =>  {
      let stm = "SELECT * FROM " + table + " WHERE " + query;
      this.database.executeSql(stm, [])
      .then((data : any) => {
        resolve(data);
      })
      .catch((error : any) =>
      {
        reject(error);
      });
    });
  }


  /**
  * @public
  * @method importSQL
  * @param sql    {String}          The SQL data to be imported
  * @description          Imports the supplied SQL data to the application database
  * @return {Promise}
  */
  importSQL(sql	: any) {
    return new Promise((resolve, reject) => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
    });
  }




  /**
  * @public
  * @method exportAsSQL
  * @description          Exports SQL data from the application database
  * @return {Promise}
  */
  exportAsSQL()  {
    return new Promise((resolve, reject) => {
      this.sqlitePorter
      .exportDbToSql(this.database)
      .then((data) =>  {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
    });
  }


  /**
  * @public
  * @method importJSON
  * @param json    {String}          The JSON data to be imported
  * @description          Imports the supplied JSON data to the application database
  * @return {Promise}
  */
  importJSON(json : any) {
    return new Promise((resolve, reject) => {
        this.sqlitePorter
        .importJsonToDb(this.database, json)
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }


  /**
  * @public
  * @method clear
  * @description          Removes all tables/data from the application database
  * @return {Promise}
  */
  clear() {
    return new Promise((resolve, reject) => {
        this.sqlitePorter
        .wipeDb(this.database)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

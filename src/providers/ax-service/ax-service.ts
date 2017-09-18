import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { Storage } from '@ionic/storage';

@Injectable()

export class AxServiceProvider {

  public server: any;
  public port: any;
  //public url = 'http://' + this.server +':' + this.port + '/MattexWebAPI/';
  public url = 'http://192.168.0.182:9090/MattexWebAPI/';
  
  private loginURL = this.url + 'checkuser';  // URL to web api
  private prodListURL = this.url + 'getProdOrders';  // URL to web api
  private postProdURL = this.url + 'postProdOrder';;  // URL to web api
  private saleListURL = this.url + 'getSalesOrders';;  // URL to web api
  private soRegistrationURL = this.url + 'getSORegistration';;  // URL to web api

  public parmWorkerID:string;
  public parmServerAddress:string;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello AxServiceProvider Provider');      
  }

  setServerPort(){    
    this.storage.ready().then(() => {
      this.storage.get("whmsserver").then((data) => {
        this.server = data;
        console.log(this.server);
      });
      this.storage.get("whmsport").then((data) => {
        this.port = data;
      });
    });
  }

    auth(user:string, password: string): Observable<any>{ 
      this.setServerPort(); 
      let body = {UserId: user, Password: password};
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.loginURL,JSON.stringify(body), options)
      .map(this.extractData)
      .catch(this.handleError);
    }

    getProdList(employeeID:string): Observable<any>{ 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.prodListURL + '/'+ employeeID, options)
      .map(this.extractData)
      .catch(this.handleError);
    }

    getSalesOrderList(employeeID:string) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      
      return this.http.get(this.saleListURL + '/'+ employeeID, options)
      .map(this.extractData)
      .catch(this.handleError);
    }

    getSORegistration(salesId:string) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      
      return this.http.get(this.soRegistrationURL + '/'+ salesId, options)
      .map(this.extractData)
      .catch(this.handleError);
    }

    postProdOrder(prodOrder:string, quantity:number): Observable<any>{ 
      let body = {prodId: prodOrder, quantity: quantity};
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.postProdURL, JSON.stringify(body), options)
      .map(this.extractData)
      .catch(this.handleError);
    }

    private extractData(res: Response) { 
      console.log( res.json() );
      return res.json() || { };
    }
    
    private handleError (error: Response | any) { 
    let errMsg: string;
    if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
    errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
    } 
    
}

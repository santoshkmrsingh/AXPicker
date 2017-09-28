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
  public camBarCode : Boolean;
  public url;
  public user;
  public axUser;
  public company: any;
  public userImage;
  public axWorkerId;
  private loginURL;
  private companyURL;
  private prodListURL;
  private postProdURL;
  private saleListURL;
  private soRegistrationURL;
  private soPickingDetailsURL;
  private soDeliveryNoteURL;

  public parmWorkerID:string;
  public pickingDone:boolean;
  
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello AxServiceProvider Provider');  
    this.server = "192.168.0.182";
    this.port = "9090";
    this.setURL();    
    console.log('Urls initialized')
    console.log( 'LoginUrl  ' + this.loginURL);
    //this.setServerPort(); //required for production build     
  }

  setServerPort(){ 
    this.storage.ready().then(() => {
      this.storage.get("whmsserver").then((data) => {
        this.server = data;
        this.setURL();            
      });
      this.storage.get("whmsport").then((data) => {
        this.port = data;
        this.setURL(); 
      });
      this.storage.get("camBarCode").then((data) => {
        this.camBarCode = data;
        this.setURL();
      });
    });

    this.setURL();
  }

  setURL(){
    this.url = 'http://'+this.server+':'+this.port+'/MattexWebAPI/';
    this.loginURL = this.url + 'checkuser';
    this.prodListURL = this.url + 'getProdOrders';
    this.postProdURL = this.url + 'postProdOrder';
    this.saleListURL = this.url + 'getSalesOrders';
    this.soRegistrationURL = this.url + 'getSORegistration';
    this.soPickingDetailsURL = this.url + 'getPickingDetails';
    this.companyURL = this.url + 'getCompanyList';    
    this.soDeliveryNoteURL = this.url + 'postDeliveryNoteNew';
  }

  auth(user:string, password: string): Observable<any>{
    let body = {UserId: user, Password: password};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.loginURL,JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getCompanyList(): Observable<any>{ 
    let body = {AxUser: this.axUser};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.companyURL, JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getPickingDetails(saleId:string, lineNum:number): Observable<any>{   
    let body = {salesId: saleId, lineNum: lineNum, DataArea: {DataAreaId: this.company}, Worker: {AxUser: this.axUser}};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.soPickingDetailsURL,JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getProdList(employeeID:string): Observable<any>{ 
    let body = {UserId: this.user,DataArea: {DataAreaId: this.company}, Worker: {AxUser: this.axUser}};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.prodListURL,JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getSalesOrderList(employeeID:string) {
    let body = {UserId: this.user,DataArea: {DataAreaId: this.company}, Worker: {AxUser: this.axUser}};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });    
    return this.http.post(this.saleListURL,JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getSORegistration(salesId:string) {
    let body = {salesId: salesId,DataArea: {DataAreaId: this.company}, Worker: {AxUser: this.axUser}};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(this.soRegistrationURL,JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  postProdOrder(prodOrder:string, quantity:number): Observable<any>{ 
    let body = {prodId: prodOrder, quantity: quantity,DataArea: {DataAreaId: this.company}, Worker: {AxUser: this.axUser, PersonnelNumber: this.axWorkerId}};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.postProdURL, JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  startProdOrder(prodOrder:string){
    let body = {prodId: prodOrder, DataArea: {DataAreaId: this.company}, Worker: {AxUser: this.axUser, PersonnelNumber: this.axWorkerId}};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + 'startProdOrder', JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);  
  }

  completeProdOrder(prodOrder:string){
    let body = {prodId: prodOrder, DataArea: {DataAreaId: this.company}, Worker: {AxUser: this.axUser, PersonnelNumber: this.axWorkerId}};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + 'completeProdOrder', JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);  
  }

  confirmDelivery(soLineList:object): Observable<any>{ 
    let body = {SORegContract : soLineList, DataAreaId: this.company, Worker: {AxUser: this.axUser, PersonnelNumber: this.axWorkerId}};
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.soDeliveryNoteURL, JSON.stringify(body), options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) { 
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

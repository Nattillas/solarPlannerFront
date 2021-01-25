import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient) { }

  subscribePanel(panel: any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })

    };
    console.log(this.apiUrl, panel, httpOptions);
    return this.http.post(this.apiUrl+'/panel/new',panel,httpOptions);  

  }

  getAllPanels()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })

    };
       return this.http.get<any>(this.apiUrl+'/panel/',httpOptions);
  }

  deletePanel(id)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })

    };
       return  this.http.delete<any>(this.apiUrl+'/panel/delete/${id}',httpOptions);
      
  }

  globals()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })

    };
       return  this.http.get<any>(this.apiUrl+'/panel/globals',httpOptions);
  }

  myPanels()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })

    };
       return  this.http.get<any>(this.apiUrl+'/panel/myPanels',httpOptions);
  }
}

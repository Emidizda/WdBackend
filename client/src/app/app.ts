import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private http = inject(HttpClient);
  protected  title = "Wd backend";
  protected members = signal<any>([])


  async ngOnInit() {
    // this.http.get('https://localhost:5050/api/members').subscribe({
    //   next: Response => this.members.set(Response),
    //   error: error => console.log(error),
    //   complete: () => console.log('Completed the http request')
    // })
    this.members.set(await this.getMembers())
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5050/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
}

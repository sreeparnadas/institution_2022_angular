import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-java-tokens',
  templateUrl: './java-tokens.component.html',
  styleUrls: ['./java-tokens.component.scss'],
  providers: [MessageService]
})
export class JavaTokensComponent implements OnInit {
  name = 'Kissht';
  KisshtHtml: any;

  constructor(private messageService: MessageService, private sanitizer:DomSanitizer, private http:HttpClient) {
    this.http.get('http://127.0.0.1:4200/#/',{responseType:'text'}).subscribe(res=>{
      this.KisshtHtml = this.sanitizer.bypassSecurityTrustHtml(res);
      console.log(this.KisshtHtml);
    })
  }

  ngOnInit(): void {
  }

  onTabOpen(event: any) {
    const tabNames: string[] = ['DGET Function', 'DSUM Function','DAVERAGE Function','DCOUNT Function'];
    this.messageService.add({key: 'myKey1', severity:'info', summary:'VENV Explaining', detail: 'Function: ' + tabNames[event.index]});
  }

  onReject() {
    this.messageService.clear();
  }

}

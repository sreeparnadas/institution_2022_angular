import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {HttpClient, HttpHeaders} from "@angular/common/http";



@Component({
  selector: 'app-java-tokens',
  templateUrl: './java-tokens.component.html',
  styleUrls: ['./java-tokens.component.scss'],
  providers: [MessageService]
})
export class JavaTokensComponent implements OnInit {
  programCode1 = `
  import java.util.Scanner;
  public class ReverseNumber {
      public static void main(String[] args) {
          Scanner sn;
          sn=new Scanner(System.in);
          System.out.print("Enter a number: ");
          int x=sn.nextInt();        
          int ans=0;        
          do{
              int r=x%10;
              x=x/10;
              ans=ans*10+r;
          }while(x>0);
          System.out.print("Reverse number is: "+ans);
          sn.close();
      }
  }`


  constructor(private messageService: MessageService) {



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

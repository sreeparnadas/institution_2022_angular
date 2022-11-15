import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  Validators, FormBuilder, FormControl, FormGroup }  from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {ConfirmationService, MenuItem, MessageService, PrimeNGConfig} from "primeng/api";
import { CommonService } from 'src/app/services/common.service';
import { TransactionServicesService } from 'src/app/services/transaction-services.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-fees-charge',
  templateUrl: './fees-charge.component.html',
  styleUrls: ['./fees-charge.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class FeesChargeComponent implements OnInit {
  isDeviceXS = false;
  checked = false;
  isSave=false;
  tr_date : Date = new Date();
  studentId:any;
  transactionDate:any;
  totalFees:number=0;
  studentName:any;
  courseName:any;
  comment:any;
  transactionId:any;
  showTableRow:boolean=false;
  disabled = false;
  hiddenPopup:boolean=false;
  hiddenInput: boolean = false ;
  showBox:boolean=true;
  isShown: boolean = false ; // hidden by default
  isPopupButton:boolean=false;
  isCashReceived:boolean=false;
  referenceTransactionMasterId:number=0;
  studentsCharge: any[] = [];
  studentToCourseId:any;
  studentNameList: any[] = [];
  FeesChargeFormGroup : FormGroup | any;
  BankReceivedFormGroup : FormGroup | any;
  feesNameList:any[]=[];
  CourseId:any;
  courseNameList:any=[];
  transactionList:any=[];
  tempFeesArray:any=[];
  feesReceivedArray:any=[];
  feesChargeDetailsArray:any=[];
  tempItemObj!:object;
  tempGetActiveCourseObj!:object;
  tempSaveItemObj!:object;
  tempObj!:object;
  tempChargeObj!:object;
  tempCashChargeObj!:object;
  courses: any[] = [];
  popUpRestultArray:any[]=[];
  getCourseIdArray:any[]=[];
  ledgerId:number=0;
  amount:number=0;
  event:number=0;
  tempTotalAmount:number=0;
  totalAmount:number=0;
  removeTotalAmount:number=0;
  showErrorMessage: boolean | undefined;
  errorMessage: any;
  msgs: { severity: string; summary: string; detail: string; }[] | undefined;
  animal: any;
  datepipe!: DatePipe;

  constructor(private transactionServicesService: TransactionServicesService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public commonService: CommonService,
    public dialog: MatDialog) {
    this.activatedRoute.data.subscribe((response: any) => {
      this.studentNameList = response.feesChargeResolver.studentsCharge.data;
      this.feesNameList = response.feesChargeResolver.feesNames.data;
      });
    this.isDeviceXS=commonService.getDeviceXs();
    }

    ngOnInit(): void {
      const now = new Date();
      let val = formatDate(now, 'yyyy-MM-dd', 'en');

      //this.date=new Date();
      //transactionDate :this.datepipe.transform(this.date, 'yyyy-MM-dd');
      this.FeesChargeFormGroup = new FormGroup({

        studentId : new FormControl(1, [Validators.required]),
        transactionId : new FormControl(0, [Validators.required]),
        comment : new FormControl(null),
        amount : new FormControl(null, [Validators.required]),
        transactionDate : new FormControl(val),
        studentToCourseId:new FormControl(1, [Validators.required]),
        ledgerId : new FormControl(7, [Validators.required]),
      })

      this.BankReceivedFormGroup = new FormGroup({
        accountNo : new FormControl(null, [Validators.required]),
        ifscNo : new FormControl(null, [Validators.required]),
        branch : new FormControl(null, [Validators.required])
      })

       this.transactionServicesService.fetchAllFeesName().subscribe(response=>{
         this.feesNameList=response.data;
      })
      this.transactionServicesService.fetchAllStudentName().subscribe(response=>{
        this.studentNameList=response.data;
     })
      this.getAllReceivedFees();

    }
  selectedIndex=0;
  onTabChanged(event:any){
    this.event=event;
    console.log(this.event);
    //if(event===1)
  }
  onClickedOutside(e: Event) {
    if(this.showBox===false){
    this.showBox = !this.showBox;}
  else{
    this.showBox = false;}
  }
  onClickedRowShow(data:any) {
    this.totalFees=0;
    this.studentName=data.studentName;
    this.courseName=data.courseName;
     this.transactionServicesService.fetchFeesChargeDetailsById(data.studentCourseRegistrationId).subscribe(response=>{
      this.feesChargeDetailsArray=response.data;
      for (let val of this.feesChargeDetailsArray) {
        this.totalFees+=val.amount;
      }
    })
    if(this.showTableRow===false){
    this.showTableRow = !this.showTableRow;}
  else{
    this.showTableRow = false;}
  }
  getAllReceivedFees(){
    this.transactionServicesService.fetchAllFeesCharged().subscribe(response=>{
      this.feesReceivedArray=response.data;
    })
  }

  onAddFees(){
    //const now = new Date();
      //let val = formatDate(now, 'yyyy-MM-dd', 'en');
    //this.tr_date= new Date();
    //this.studentId = this.FeesChargeFormGroup.get('studentId')?.value;
    //this.transactionDate =this.FeesChargeFormGroup.get('transactionDate')?.value;
   /*  this.tr_date=this.FeesChargeFormGroup.get('transactionDate')?.value;
    this.transactionDate = formatDate(this.tr_date, 'yyyy-MM-dd', 'en');
    this.studentToCourseId = this.FeesChargeFormGroup.get('studentToCourseId')?.value;
    this.comment=this.FeesChargeFormGroup.get('comment')?.value; */
      
       //console.log("transactionDate:",this.transactionDate);
    this.ledgerId=this.FeesChargeFormGroup.get('ledgerId')?.value;
    this.amount=this.FeesChargeFormGroup.get('amount')?.value;
    this.totalAmount=Number(this.totalAmount)+Number(this.amount);
    const tempItem=this.FeesChargeFormGroup.value;
    let index=this.feesNameList.findIndex((x:{id:any;})=>x.id===tempItem.ledgerId);
    this.tempItemObj={
      ledgerId:this.ledgerId,
      transactionTypeId:2,
      feesName:this.feesNameList[index].ledger_name,
      amount:this.amount
    }
    this.tempFeesArray.push(this.tempItemObj);
    this.tempTotalAmount= this.totalAmount;
    this.isSave=true;
    this.FeesChargeFormGroup = new FormGroup({
      amount : new FormControl(null, [Validators.required]),
      ledgerId : new FormControl(null, [Validators.required])
    })
  }

  onDelete(index: any){

    const x=this.tempFeesArray[index];
    this.totalAmount=this.totalAmount-x.amount;
    this.tempTotalAmount= this.totalAmount;
    this.tempFeesArray.splice(index,1);

  }
  clearFeesReceived(){
    this.isShown = false;
    this.hiddenPopup=false;
    const now = new Date();
    let val = formatDate(now, 'yyyy-MM-dd', 'en');
    this.FeesChargeFormGroup = new FormGroup({
      transactionId : new FormControl(0, [Validators.required]),
      studentId : new FormControl(1, [Validators.required]),
      comment : new FormControl(null, [Validators.required]),
      amount : new FormControl(null, [Validators.required]),
      transactionDate : new FormControl(val),
      studentToCourseId:new FormControl(1, [Validators.required]),
      ledgerId : new FormControl(7, [Validators.required])
    })
    this.BankReceivedFormGroup = new FormGroup({
      accountNo : new FormControl(null, [Validators.required]),
      ifscNo : new FormControl(null, [Validators.required]),
      branch : new FormControl(null, [Validators.required])
    })
    this.isCashReceived=false;
    this.tempFeesArray=[];
    this.totalAmount=0;
  }
  changeCourseId(){
    this.studentId = this.FeesChargeFormGroup.get('studentId')?.value;
   this.transactionDate = this.FeesChargeFormGroup.get('transactionDate')?.value;
  let comment = this.FeesChargeFormGroup.get('comment')?.value;
  console.log("studentId:",this.studentId);
  console.log("transactionDate:",this.transactionDate);
  console.log("comment:",comment);
    this.courseNameList=[];
    this.transactionServicesService.fetchAllStudentToCourses(this.studentId).subscribe(response=>{
      this.courseNameList=response.data;
    })
  }

  editFeesReceived(feeDetails:any){
    this.selectedIndex=0;
    this.hiddenPopup=false;
    this.event=0;
    this.onTabChanged(this.event);
    this.isShown = true;
    this.tempFeesArray=[];
    this.totalAmount=0;
    this.transactionServicesService.fetchAllTransaction(feeDetails.id).subscribe(response=>{
      this.transactionList=response.data;
      this.transactionServicesService.fetchAllStudentToCourses(response.data[0].student_id).subscribe(response=>{
        this.courseNameList=response.data;
      })
      this.FeesChargeFormGroup.patchValue({transactionId: response.data[0].id});
      this.FeesChargeFormGroup.patchValue({studentId: response.data[0].student_id});
      this.FeesChargeFormGroup.patchValue({studentToCourseId: response.data[0].student_course_registration_id});
      this.FeesChargeFormGroup.patchValue({comment: response.data[0].comment});
      this.FeesChargeFormGroup.patchValue({transactionDate: response.data[0].transaction_date});
      this.studentId=response.data[0].student_id;
      this.studentToCourseId=response.data[0].student_course_registration_id;
      this.transactionId=response.data[0].id;
      let tr_date=response.data[0].transaction_date;
       this.transactionDate = formatDate(tr_date, 'yyyy-MM-dd', 'en');
      this.comment=response.data[0].comment;

      for(let val of this.transactionList){
        this.tempItemObj={
          ledgerId:val.ledger_id,
          transactionTypeId:2,
          feesName:val.ledger_name,
          amount:val.amount

        }
        this.tempFeesArray.push(this.tempItemObj);
        this.totalAmount=Number(this.totalAmount)+Number(val.amount);
      }

    })
  }

  onUpdate(){
    this.hiddenPopup=false;
    this.confirmationService.confirm({
     message: 'Do you want to Save this record?',
     header: 'Delete Confirmation',
     icon: 'pi pi-info-circle',
     accept: () => {


       //let transactionId=this.FeesChargeFormGroup.get('transactionId')?.value;
       //let studentId = this.FeesChargeFormGroup.get('studentId')?.value;
       //let studentToCourseId = this.FeesChargeFormGroup.get('studentToCourseId')?.value;
       //let tr_date=this.FeesChargeFormGroup.get('transactionDate')?.value;
       //let transactionDate = formatDate(tr_date, 'yyyy-MM-dd', 'en');
       //let comment=this.FeesChargeFormGroup.get('comment')?.value;
       let feesYear=new Date().getFullYear();
       let feesMonth=new Date().getMonth().toString();
       this.tempChargeObj={
         ledgerId:this.studentId,
         transactionTypeId:1,
         amount:this.totalAmount
       }
       this.tempFeesArray.push(this.tempChargeObj);

       this.tempObj={
           transactionMaster:{
           userId:1,
           studentCourseRegistrationId:this.studentToCourseId,
           transactionDate:this.transactionDate,
           comment:this.comment,
           feesYear:feesYear,
           feesMonth:feesMonth
         },
         transactionDetails: Object.values(this.tempFeesArray)
       }
       this.transactionServicesService.updateFeesCharge(this.transactionId,this.tempObj).subscribe(response => {
         if (response.success === 1){
           this.getAllReceivedFees();
           this.tempFeesArray=[];
           this.totalAmount=0;
           this.clearFeesReceived();
           this.FeesChargeFormGroup.reset();
           this.showSuccess("Record Updated successfully");
         }

       },error=>{
         this.showErrorMessage = true;
         this.errorMessage = error.message;

         setTimeout(()=>{
           this.showErrorMessage = false;
         }, 20000);

       })

     },
     reject: () => {
       this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
     }
   });

 }

getActiveCourse(){
  this.hiddenPopup=true;
  this.totalFees=0;
  let studentId = this.FeesChargeFormGroup.get('studentId')?.value;
  this.studentToCourseId = this.FeesChargeFormGroup.get('studentToCourseId')?.value;


  console.log("studentId:",studentId);
  

  this.transactionServicesService.fetchFeesChargeDetailsById(this.studentToCourseId).subscribe(response=>{
    this.feesChargeDetailsArray=response.data;
    for (let val of this.feesChargeDetailsArray) {
      this.totalFees+=val.amount;
    }
  })
this.transactionServicesService.fetchCourseId(this.studentToCourseId).subscribe(response=>{
  this.getCourseIdArray=response.data;
  this.CourseId=response.data[0].course_id;
    //end code
    this.tempGetActiveCourseObj={
      ledger_id: studentId,
      course_id: this.CourseId
  };
  this.transactionServicesService.fetchAllActiveCourse(this.tempGetActiveCourseObj).subscribe(response=>{
    this.popUpRestultArray=response.data;
      //end code

      })

    })


  }
  onBankReceived(){
    let studentId = this.FeesChargeFormGroup.get('studentId')?.value;
    let transactionDate = this.FeesChargeFormGroup.get('transactionDate')?.value;
    let comment = this.FeesChargeFormGroup.get('comment')?.value;
    console.log("studentId:",studentId);
    console.log("transactionDate:",transactionDate);
    console.log("comment:",comment);
    //this.hiddenPopup=false;
    /* this.confirmationService.confirm({
      message: 'Do you want to Save this record?',
      header: 'Save Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        let studentId = this.FeesChargeFormGroup.get('studentId')?.value;
        let transactionDate=this.FeesChargeFormGroup.get('transactionDate')?.value;
        let comment=this.FeesChargeFormGroup.get('comment')?.value;
        this.tempChargeObj=[{
          ledgerId:2,
          transactionTypeId:1,
          amount:this.tempTotalAmount
        },
        {
          ledgerId:studentId,
          transactionTypeId:2,
          amount:this.tempTotalAmount
        }];
       // this.tempFeesArray.push(this.tempChargeObj);

        this.tempObj={
          transactionMaster:{
          userId:1,
          referenceTransactionMasterId: this.referenceTransactionMasterId,
          transactionDate:transactionDate,
          comment:comment
            },
          transactionDetails: Object.values(this.tempChargeObj)
        }
        this.transactionServicesService.saveFeesReceive(this.tempObj).subscribe(response => {
         this.referenceTransactionMasterId=response.data.transactionMasterId;
         this.isCashReceived=false;
            if (response.success === 1){
              //this.getAllReceivedFees();
              this.tempFeesArray=[];
              this.tempTotalAmount=0;
              this.clearFeesReceived();
              this.showSuccess("Record added successfully");
            }

        },error=>{
          this.showErrorMessage = true;
          this.errorMessage = error.message;

          setTimeout(()=>{
            this.showErrorMessage = false;
          }, 20000);

        })

      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    }); */


  }
  onCashReceived(){
    this.confirmationService.confirm({
      message: 'Do you want to Save this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
       /*  let studentId = this.FeesChargeFormGroup.get('studentId')?.value;
        let transactionDate=this.FeesChargeFormGroup.get('transactionDate')?.value; */
        let comment=this.FeesChargeFormGroup.get('comment')?.value;
        this.tempChargeObj=[{
          ledgerId:1,
          transactionTypeId:1,
          amount:this.tempTotalAmount
        },
        {
          ledgerId:this.studentId,
          transactionTypeId:2,
          amount:this.tempTotalAmount
        }];
       // this.tempFeesArray.push(this.tempChargeObj);

        this.tempObj={
          transactionMaster:{
          userId:1,
          referenceTransactionMasterId: this.referenceTransactionMasterId,
          transactionDate:this.transactionDate,
          comment:this.comment
            },
          transactionDetails: Object.values(this.tempChargeObj)
        }
        this.transactionServicesService.saveFeesReceive(this.tempObj).subscribe(response => {
         this.referenceTransactionMasterId=response.data.transactionMasterId;
         this.isCashReceived=false;
            if (response.success === 1){
              //this.getAllReceivedFees();
              this.tempFeesArray=[];
              this.tempTotalAmount=0;
              this.clearFeesReceived();
              this.showSuccess("Record added successfully");
            }

        },error=>{
          this.showErrorMessage = true;
          this.errorMessage = error.message;

          setTimeout(()=>{
            this.showErrorMessage = false;
          }, 20000);

        })

      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });


  }

  onSave(){
   
     this.confirmationService.confirm({
     message: 'Do you want to Save this record?',
     header: 'Delete Confirmation',
     icon: 'pi pi-info-circle',
     accept: () => {
        
      let feesYear=new Date().getFullYear();
      let feesMonth=new Date().getMonth().toString();
       this.tempChargeObj={
         ledgerId:this.studentId,
         transactionTypeId:1,
         amount:this.totalAmount
       }
       this.tempFeesArray.push(this.tempChargeObj);
       this.tempObj={
         transactionMaster:{
         userId:1,
         studentCourseRegistrationId:this.studentToCourseId,
         transactionDate:this.transactionDate,
         feesYear:feesYear,
         feesMonth:feesMonth
       },
         transactionDetails: Object.values(this.tempFeesArray)
       }
       this.transactionServicesService.feesCharge(this.tempObj).subscribe(response => {
        this.referenceTransactionMasterId=response.data.transactionMasterId;
           if (response.success === 1){
             this.isCashReceived=true;
             this.getAllReceivedFees();
             this.tempFeesArray=[];
             this.totalAmount=0;
             this.clearFeesReceived();
             this.FeesChargeFormGroup.reset();
             this.showSuccess("Record added successfully");
           }

       },error=>{
         this.showErrorMessage = true;
         this.errorMessage = error.message;

         setTimeout(()=>{
           this.showErrorMessage = false;
         }, 20000);

       })

     },
     reject: () => {
       this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
     }
   }); 

 }
 showSuccess(arg0: string) {
   throw new Error('Method not implemented.');
 }

}

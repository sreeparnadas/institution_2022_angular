import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService, PrimeNGConfig } from "primeng/api";
import { CommonService } from 'src/app/services/common.service';
import { TransactionServicesService } from 'src/app/services/transaction-services.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToWords } from 'to-words';
import { Table } from 'primeng/table/table';

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: { // can be used to override defaults for the selected locale
      name: 'Rupee',
      plural: 'Rupees',
      symbol: '₹',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    }
  }
});

@Component({
  selector: 'app-fees-received',
  templateUrl: './fees-received.component.html',
  styleUrls: ['./fees-received.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class FeesReceivedComponent implements OnInit {
  checked = false;
  isDeviceXS = false;
  indeterminate = false;
  totalCourseDue:number=0;
  courseNameBoolean: boolean = false;
  transactionNoBoolean: boolean = false;
  feeNameBoolean: boolean = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  transactionMasterId: number = 0;
  hiddenPopup: boolean = false;
  selectedIndex: number = 0;
  totalRecepitAmount: number = 0;
  totalFees: number = 0;
  feesDueListArray: any[] = [];
  feesReceivedDetailsArray:any[]=[];
  hiddenInput: boolean = false;
  showBox: boolean = true;
  showReceipt: boolean = false;
  isShown: boolean = false; // hidden by default
  isPopupButton: boolean = false;
  isCashReceived: boolean = false;
  referenceTransactionMasterId: number = 0;
  students: any[] = [];

  studentToCourseId: any;
  pay_amount: number = 0;

  totalBilledAmount: number = 0;
  totalReceivedAmount: number = 0;
  totalDiscount: number = 0;
  netDueAmount: number = 0;
  netDueAmountValidation: number = 0;
  totalDuedAmount: number = 0;
  totalDuefeesByLedgerId: number = 0;
  studentNameList: any[] = [];
  FeesReceivedFormGroup: FormGroup | any;
  BankReceivedFormGroup: FormGroup | any;
  feesNameList: any[] = [];
  courseNameList: any = [];
  transactionList: any = [];
  tempFeesReceivedArray: any = [];
  feesReceivedArray: any = [];
  feesDiscountArray: any = [];
  dueFeesLedgerArray: any = [];

  tranMasterIdArray: any[] = [];
  discountTranIDArray: any[] = [];
  singleBillReceiptArray: any[] = [];
  allBillReceiptArray: any[] = [];
  rupeeInWords: string = '';
  tempFeesArray: any[] = [];
  comment: any;
  studentId: any;
  transactionDate: any;
  tempItemObj!: object;
  tempSaveItemObj!: object;
  tempObj!: object;
  tempChargeObj!: object;
  tempReceicedObj!: object;
  tempCashChargeObj!: object;
  courses: any[] = [];
  popUpRestultArray: any[] = [];
  ledgerId: number = 0;
  amount: number = 0;
  event: number = 0;
  tempTotalAmount: number = 0;
  totalAmount: number = 0;
  removeTotalAmount: number = 0;
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
      this.studentNameList = response.feesReceivedResolver.students.data;
      this.feesNameList = response.feesReceivedResolver.feesNames.data;
    });
    this.isDeviceXS=commonService.getDeviceXs();

  }

  ngOnInit(): void {
    const now = new Date();
    let val = formatDate(now, 'yyyy-MM-dd', 'en');
    this.FeesReceivedFormGroup = new FormGroup({
      pay_amount: new FormControl(0, [Validators.required]),
      comment: new FormControl(null),
      studentId: new FormControl(1, [Validators.required]),
      transactionMasterId: new FormControl(1, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      transactionDate: new FormControl(val),
      studentToCourseId: new FormControl(1, [Validators.required]),
      ledgerId: new FormControl(null, [Validators.required]),
    })

    this.BankReceivedFormGroup = new FormGroup({
      accountNo: new FormControl(null, [Validators.required]),
      ifscNo: new FormControl(null, [Validators.required]),
      branch: new FormControl(null, [Validators.required])
    })



    this.getAllReceivedFees();

  }
  receivedAmount: number = 0;
  receivedComment: string = 'Fees Received';
  active = 0;
  onTabChanged(event: any) {
    this.event = event;
    //console.log("Tab id:",event.tab);
    console.log("Tab id:", this.event)
    //if(event===1)
  }
  onClickedReceiptVoucher(fees: any) {
    this.totalRecepitAmount = 0;
    this.rupeeInWords = '';
    this.showReceipt = true;
    this.selectedIndex = 2;
    console.log("id:", fees.student_course_registration_id);
    this.transactionServicesService.fetchAllReceipt(fees.student_course_registration_id).subscribe(response => {
      this.allBillReceiptArray = response.data;
      console.log("Array:", this.allBillReceiptArray);
      for (let val of this.allBillReceiptArray) {
        this.totalRecepitAmount = Number(this.totalRecepitAmount) + Number(val.temp_total_received);
      }
      this.rupeeInWords = toWords.convert(this.totalRecepitAmount);
    })

  }
  onClickedClosed() {
    this.selectedIndex = 1;
  }
  onClickedSingleReceipt(feeDetails: any) {
    if (this.showBox === false) {
      this.showBox = !this.showBox;
      this.event = 0;
    }
    else {
      this.showBox = false;
      console.log("id:", feeDetails.id);
      this.transactionServicesService.fetchSingleReceipt(feeDetails.id).subscribe(response => {
        this.singleBillReceiptArray = response.data;
        console.log("Array:", this.singleBillReceiptArray);
        this.rupeeInWords = toWords.convert(this.singleBillReceiptArray[0].temp_total_received);
      })

    }
  }
  getAllReceivedFees() {
    this.transactionServicesService.fetchAllFeesReceived().subscribe(response => {
      this.feesReceivedArray = response.data;
    })
  }

  getAllStudent() {
    this.transactionServicesService.fetchAllStudentName().subscribe(response => {
      this.studentNameList = response.data;
    })
  }
  clear(table: Table) {
    table.clear();
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  onAddFees() {
    this.ledgerId = this.FeesReceivedFormGroup.get('ledgerId')?.value;
    this.amount = this.FeesReceivedFormGroup.get('amount')?.value;
    this.totalAmount = Number(this.totalAmount) + Number(this.amount);
    const tempItem = this.FeesReceivedFormGroup.value;
    let index = this.feesNameList.findIndex((x: { id: any; }) => x.id === tempItem.ledgerId);
    this.tempItemObj = {
      ledgerId: this.ledgerId,
      transactionTypeId: 2,
      feesName: this.feesNameList[index].ledger_name,
      amount: this.amount
    }
    this.tempFeesArray.push(this.tempItemObj);
    this.tempTotalAmount = this.totalAmount;
  }
  onDelete(index: any) {

    const x = this.tempFeesArray[index];
    this.totalAmount = this.totalAmount - x.amount;
    this.tempTotalAmount = this.totalAmount;
    this.tempFeesArray.splice(index, 1);

  }
  clearFeesReceived() {
    this.hiddenPopup = false;
    this.studentNameList = [];
    this.courseNameList = [];
    this.tranMasterIdArray = [];
    this.feesDueListArray = [];
    this.courseNameBoolean = false;
    this.transactionNoBoolean = false;
    this.feeNameBoolean = false;
    this.isShown = false;
    const now = new Date();
    let val = formatDate(now, 'yyyy-MM-dd', 'en');
    this.FeesReceivedFormGroup = new FormGroup({
      transactionId: new FormControl(0, [Validators.required]),
      studentId: new FormControl(1, [Validators.required]),
      comment: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      transactionDate: new FormControl(val),
      studentToCourseId: new FormControl(1, [Validators.required]),
      ledgerId: new FormControl(null, [Validators.required])
    })
    this.BankReceivedFormGroup = new FormGroup({
      accountNo: new FormControl(null, [Validators.required]),
      ifscNo: new FormControl(null, [Validators.required]),
      branch: new FormControl(null, [Validators.required])
    })
    this.tempFeesArray = [];
    this.totalAmount = 0;
  }
  changeCourseId() {
    this.courseNameBoolean = true;

    let studentId = this.FeesReceivedFormGroup.get('studentId')?.value;
    this.courseNameList = [];
    this.transactionServicesService.fetchAllStudentToCourses(studentId).subscribe(response => {
      this.courseNameList = response.data;
    })
  }

  editFeesReceived(feeDetails: any) {
    console.log("id:", feeDetails.id);
    this.event = 0;
    this.onTabChanged(this.event);
    this.isShown = true;
    this.tempFeesArray = [];
    this.totalAmount = 0;
    this.transactionServicesService.fetchAllTransaction(feeDetails.id).subscribe(response => {
      this.transactionList = response.data;
      console.log("array", this.transactionList);
      this.transactionServicesService.fetchAllStudentToCourses(response.data[0].student_id).subscribe(response => {
        this.courseNameList = response.data;
      })
      this.FeesReceivedFormGroup.patchValue({ transactionId: response.data[0].id });
      this.FeesReceivedFormGroup.patchValue({ studentId: response.data[0].student_id });
      this.FeesReceivedFormGroup.patchValue({ studentToCourseId: response.data[0].student_course_registration_id });
      this.FeesReceivedFormGroup.patchValue({ comment: response.data[0].comment });
      this.FeesReceivedFormGroup.patchValue({ transactionDate: response.data[0].transaction_date });

      for (let val of this.transactionList) {
        this.tempItemObj = {
          ledgerId: val.ledger_id,
          transactionTypeId: 2,
          feesName: val.ledger_name,
          amount: val.amount

        }
        this.tempFeesArray.push(this.tempItemObj);
        this.totalAmount = Number(this.totalAmount) + Number(val.amount);
      }

    })
  }

  onUpdate() {

    this.confirmationService.confirm({
      message: 'Do you want to Save this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {


        let transactionId = this.FeesReceivedFormGroup.get('transactionId')?.value;
        let studentId = this.FeesReceivedFormGroup.get('studentId')?.value;
        let studentToCourseId = this.FeesReceivedFormGroup.get('studentToCourseId')?.value;
        let tr_date = this.FeesReceivedFormGroup.get('transactionDate')?.value;
        let transactionDate = formatDate(tr_date, 'yyyy-MM-dd', 'en');
        let comment = this.FeesReceivedFormGroup.get('comment')?.value;
        let feesYear = new Date().getFullYear();
        let feesMonth = new Date().getMonth().toString();
        this.tempChargeObj = {
          ledgerId: studentId,
          transactionTypeId: 1,
          amount: this.totalAmount
        }
        this.tempFeesArray.push(this.tempChargeObj);

        this.tempObj = {
          transactionMaster: {
            userId: 1,
            studentCourseRegistrationId: studentToCourseId,
            transactionDate: transactionDate,
            comment: comment,
            feesYear: feesYear,
            feesMonth: feesMonth
          },
          transactionDetails: Object.values(this.tempFeesArray)
        }
        console.log("tran:", transactionId);
        this.transactionServicesService.updateFeesCharge(transactionId, this.tempObj).subscribe(response => {
          if (response.success === 1) {
            this.getAllReceivedFees();
            this.tempFeesArray = [];
            this.totalAmount = 0;
            this.clearFeesReceived();
            this.showSuccess("Record Updated successfully");
          }

        }, error => {
          this.showErrorMessage = true;
          this.errorMessage = error.message;

          setTimeout(() => {
            this.showErrorMessage = false;
          }, 20000);

        })

      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });

  }



  onBankReceived() {
    let studentId = this.FeesReceivedFormGroup.get('studentId')?.value;
    let transactionDate = this.FeesReceivedFormGroup.get('transactionDate')?.value;
    let comment = this.FeesReceivedFormGroup.get('comment')?.value;
    console.log("studentId:", studentId);
    console.log("transactionDate:", transactionDate);
    console.log("comment:", comment);
    /* this.confirmationService.confirm({
      message: 'Do you want to Save this record?',
      header: 'Save Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        let studentId = this.FeesReceivedFormGroup.get('studentId')?.value;
        let transactionDate = this.FeesReceivedFormGroup.get('transactionDate')?.value;
        let comment = this.FeesReceivedFormGroup.get('comment')?.value;
        this.tempChargeObj = [{
          ledgerId: 2,
          transactionTypeId: 1,
          amount: this.tempTotalAmount
        },
        {
          ledgerId: studentId,
          transactionTypeId: 2,
          amount: this.tempTotalAmount
        }];
        // this.tempFeesArray.push(this.tempChargeObj);

        this.tempObj = {
          transactionMaster: {
            userId: 1,
            referenceTransactionMasterId: this.referenceTransactionMasterId,
            transactionDate: transactionDate,
            comment: comment
          },
          transactionDetails: Object.values(this.tempChargeObj)
        }
        this.transactionServicesService.saveFeesReceive(this.tempObj).subscribe(response => {
          this.referenceTransactionMasterId = response.data.transactionMasterId;
          this.isCashReceived = false;
          if (response.success === 1) {
            //this.getAllReceivedFees();
            this.tempFeesArray = [];
            this.tempTotalAmount = 0;
            this.clearFeesReceived();
            this.showSuccess("Record added successfully");
          }

        }, error => {
          this.showErrorMessage = true;
          this.errorMessage = error.message;

          setTimeout(() => {
            this.showErrorMessage = false;
          }, 20000);

        })

      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    }); */


  }
  onCashReceived() {
    this.confirmationService.confirm({
      message: 'Do you want to Save this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        let studentId = this.FeesReceivedFormGroup.get('studentId')?.value;
        let transactionDate = this.FeesReceivedFormGroup.get('transactionDate')?.value;
        let comment = this.FeesReceivedFormGroup.get('comment')?.value;
        this.tempChargeObj = [{
          ledgerId: 1,
          transactionTypeId: 1,
          amount: this.tempTotalAmount
        },
        {
          ledgerId: studentId,
          transactionTypeId: 2,
          amount: this.tempTotalAmount
        }];
        // this.tempFeesArray.push(this.tempChargeObj);

        this.tempObj = {
          transactionMaster: {
            userId: 1,
            referenceTransactionMasterId: this.referenceTransactionMasterId,
            transactionDate: transactionDate,
            comment: comment
          },
          transactionDetails: Object.values(this.tempChargeObj)
        }
        this.transactionServicesService.saveFeesReceive(this.tempObj).subscribe(response => {
          this.referenceTransactionMasterId = response.data.transactionMasterId;
          this.isCashReceived = false;
          if (response.success === 1) {
            //this.getAllReceivedFees();
            this.tempFeesArray = [];
            this.tempTotalAmount = 0;
            this.clearFeesReceived();
            this.showSuccess("Record added successfully");
          }

        }, error => {
          this.showErrorMessage = true;
          this.errorMessage = error.message;

          setTimeout(() => {
            this.showErrorMessage = false;
          }, 20000);

        })

      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });


  }
  onSave() {
    this.tempReceicedObj = {};
    this.tempFeesReceivedArray = [];
    this.transactionMasterId = this.FeesReceivedFormGroup.get('transactionMasterId')?.value;


    this.confirmationService.confirm({
      message: 'Do you want to Save this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.amount = this.FeesReceivedFormGroup.get('amount')?.value;
        this.ledgerId = this.FeesReceivedFormGroup.get('ledgerId')?.value;
        console.log("TrId.", this.transactionMasterId);
        console.log("amount.", this.amount);
        console.log("ledgerId.", this.ledgerId);
        this.studentId = this.FeesReceivedFormGroup.get('studentId')?.value;

        let tr_date = this.FeesReceivedFormGroup.get('transactionDate')?.value;
        this.transactionDate = formatDate(tr_date, 'yyyy-MM-dd', 'en');
        this.comment = this.FeesReceivedFormGroup.get('comment')?.value;
        let feesYear = new Date().getFullYear();
        let feesMonth = new Date().getMonth().toString();
        this.tempChargeObj = {
          ledgerId: this.studentId,
          transactionTypeId: 2,
          amount: this.amount
        }
        this.tempReceicedObj = {
          ledgerId: this.ledgerId,
          transactionTypeId: 1,
          amount: this.amount
        }

        this.tempFeesReceivedArray.push(this.tempReceicedObj);


        this.tempFeesReceivedArray.push(this.tempChargeObj);
        this.tempObj = {
          transactionMaster: {
            userId: 1,
            referenceTransactionMasterId: this.studentToCourseId,
            transactionDate: this.transactionDate,
            comment: this.comment,
            feesYear: feesYear,
            feesMonth: feesMonth
          },
          transactionDetails: Object.values(this.tempFeesReceivedArray)
        }
        this.transactionServicesService.saveFeesReceive(this.tempObj).subscribe(response => {
          if (response.success === 1) {
            this.FeesReceivedFormGroup.reset();
            //this.getActiveCourseUpdate();
            this.clearFeesReceived();
            this.getAllReceivedFees();
            this.feesDueListArray = [];

            this.totalAmount = 0;
            this.getAllStudent();
            this.showSuccess("Record Updated successfully");
          }

        }, error => {
          this.showErrorMessage = true;
          this.errorMessage = error.message;

          setTimeout(() => {
            this.showErrorMessage = false;
          }, 20000);

        })

      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });


  }
  showSuccess(arg0: string) {
    throw new Error('Method not implemented.');
  }
  getTranMasterId() {
    this.transactionNoBoolean = true;
    this.hiddenPopup=true;
    this.totalReceivedAmount=0;
    this.totalCourseDue=0;
    let studentToCourseId = this.FeesReceivedFormGroup.get('studentToCourseId')?.value;
    console.log("studentToCourseId:", studentToCourseId);
    this.tranMasterIdArray = [];
    this.transactionServicesService.fetchAllTranMasterId(studentToCourseId).subscribe(response => {
      this.tranMasterIdArray = response.data;
      console.log(this.tranMasterIdArray);
    }) 
    
    this.transactionServicesService.fetchFeeReceivedDetailsList(studentToCourseId).subscribe(response => {
      this.feesReceivedDetailsArray = response.data;
      console.log("feesReceivedDetailsArray:",this.feesReceivedDetailsArray);
      for (let val of this.feesReceivedDetailsArray) {
          this.totalReceivedAmount = this.totalReceivedAmount + val.temp_total_received;
      }
    })

  }
  getCourseFeeById(id: any) {
    console.log("id", id);
    this.totalFees = 0;
    this.totalDuefeesByLedgerId = id.total_billed - id.total_received;
    this.receivedAmount = this.totalDuefeesByLedgerId;
    this.totalFees = this.totalDuefeesByLedgerId;
    this.comment = this.receivedComment;
  }
  getActiveCourse(id: any) {

    /*  let studentToCourseId = this.FeesReceivedFormGroup.get('studentToCourseId')?.value;
     //console.log("studentToCourseId:",studentToCourseId);
     this.transactionServicesService.fetchFeesDueListId(studentToCourseId).subscribe(response => {
       this.feesDueListArray = response.data;
        console.log("fees Due list:",this.feesDueListArray);
        for (let val of this.feesDueListArray) {
         console.log("total_billed:",val.total_billed);
         console.log("total_received:",val.total_received);
        
        
       } 
     }) */
    this.feeNameBoolean = true;
    this.studentToCourseId = id.id;
    console.log("total_received:", id);
    this.hiddenPopup = true;
    this.totalFees = 0;
    this.totalBilledAmount = 0;
    this.totalReceivedAmount = 0;
    this.totalDuedAmount = 0;
    this.totalDiscount = 0;
    this.netDueAmount = 0;
    this.netDueAmountValidation = 0;
    this.feesDueListArray = [];
    //let studentId = this.FeesChargeFormGroup.get('studentId')?.value;
    let transactionMasterId = id.id;
    console.log("transactionMasterId:", transactionMasterId);
    this.transactionServicesService.fetchFeesDueListId(id.id).subscribe(response => {
      this.feesDueListArray = response.data;
      console.log("fees Due list:", this.feesDueListArray);
      for (let val of this.feesDueListArray) {
        this.totalBilledAmount = this.totalBilledAmount + val.total_billed;
        this.totalReceivedAmount = this.totalReceivedAmount + val.total_received;
        console.log("total_billed:", val.total_billed);
        console.log("total_received:", val.total_received);

      }
      this.transactionServicesService.fetchDiscountByTranId(transactionMasterId).subscribe(response => {
        this.discountTranIDArray = response.data;
        this.totalDiscount = this.discountTranIDArray[0].temp_total_discount;
        this.netDueAmount = this.totalDuedAmount - this.totalDiscount;
        this.netDueAmountValidation = this.netDueAmount - 1;
        console.log("discountTranIDArray:", this.discountTranIDArray);
      })
      this.totalDuedAmount = this.totalBilledAmount - this.totalReceivedAmount;
      this.netDueAmount = this.totalDuedAmount;
      this.netDueAmountValidation = this.netDueAmount - 1;
    })
  }
  getActiveCourseUpdate() {

    /*  let studentToCourseId = this.FeesReceivedFormGroup.get('studentToCourseId')?.value;
     //console.log("studentToCourseId:",studentToCourseId);
     this.transactionServicesService.fetchFeesDueListId(studentToCourseId).subscribe(response => {
       this.feesDueListArray = response.data;
        console.log("fees Due list:",this.feesDueListArray);
        for (let val of this.feesDueListArray) {
         console.log("total_billed:",val.total_billed);
         console.log("total_received:",val.total_received);
        
        
       } 
     }) */
    this.transactionMasterId = this.FeesReceivedFormGroup.get('transactionMasterId')?.value;
    console.log("transactionMasterId:", this.studentToCourseId);
    this.hiddenPopup = true;
    this.totalFees = 0;
    this.totalBilledAmount = 0;
    this.totalReceivedAmount = 0;
    this.totalDuedAmount = 0;
    this.totalDiscount = 0;
    this.netDueAmount = 0;
    //let studentId = this.FeesChargeFormGroup.get('studentId')?.value;
    //let transactionMasterId = id.id;
    //console.log("transactionMasterId:", transactionMasterId);
    this.transactionServicesService.fetchFeesDueListId(this.transactionMasterId).subscribe(response => {
      this.feesDueListArray = response.data;
      console.log("fees Due list:", this.feesDueListArray);
      for (let val of this.feesDueListArray) {
        this.totalBilledAmount = this.totalBilledAmount + val.total_billed;
        this.totalReceivedAmount = this.totalReceivedAmount + val.total_received;
        console.log("total_billed:", val.total_billed);
        console.log("total_received:", val.total_received);

      }
      this.transactionServicesService.fetchDiscountByTranId(this.transactionMasterId).subscribe(response => {
        this.discountTranIDArray = response.data;
        this.totalDiscount = this.discountTranIDArray[0].temp_total_discount;
        this.netDueAmount = this.totalDuedAmount - this.totalDiscount;
        console.log("discountTranIDArray:", this.discountTranIDArray);
      })
      this.totalDuedAmount = this.totalBilledAmount - this.totalReceivedAmount;
      this.netDueAmount = this.totalDuedAmount;
    })
  }
}

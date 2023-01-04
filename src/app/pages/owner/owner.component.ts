import { Component, OnInit } from '@angular/core';
import { BijoyaRegistration } from 'src/app/models/bijoya-regitration.model';
import { BijoyaRegistrationService } from 'src/app/services/bijoya-registration.service';
import { CommonService } from 'src/app/services/common.service';
import { LitElement, html} from 'lit-element';
import 'fa-icons';
import { ReportService } from 'src/app/services/report.service';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { CourseService } from 'src/app/services/course.service';
import { StudentToCourseService } from 'src/app/services/student-to-course.service';
import { Table } from 'primeng/table/table';
import { TransactionServicesService } from 'src/app/services/transaction-services.service';
import { ToWords } from 'to-words';

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
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  allIncomeArray: any = [];
  allBillReceiptArray: any = [];
  showReceipt:boolean=false;
  selectedIndex: number = 0;
  rupeeInWords:string='';
  totalRecepitAmount:number=0;
  birthdayArray:any=[];
  upcomingDueListArray:any=[];
  studentRegistrationHistoryArray:any=[];
  workingEndDate:any;
  workingDescription:string='';
  dateDifference:number=0;
  totalNoCourse:number=0;
  totalNoActiveStudent:number=0;
  totalMonthlyCash:number=0;
  totalMonthlyBank:number=0;
  totalYearlyBank:number=0;
  totalYearlyCash:number=0;
  totalMonthlyIncome:number=0;
  totalYearlyIncome:number=0;
  registratedData: BijoyaRegistration[]=[];
  showMessage:boolean=false;
  isDeviceXS = false;

  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
 
  constructor( private reportService: ReportService
              , private commonService: CommonService
              , private courseService: CourseService
              , private studentToCourseService: StudentToCourseService
              , private transactionServicesService: TransactionServicesService

    ) {
      this.getAllIncome();
      this.getTotalCourse();
      this.getTotalActiveStudent();
      this.getWorkingDays();
      this.getStudentBirthDay();
      this.getStudentUpcomingDueList();
      this.getStudentToCourseRegistrationList();
    this.isDeviceXS=commonService.getDeviceXs();
   
   }

  ngOnInit(): void {
   
  }
  onClickedReceiptVoucher(id: any) {
    this.totalRecepitAmount = 0;
    this.rupeeInWords = '';
    this.showReceipt = true;
    this.selectedIndex = 2;
    console.log("id:", id);
    this.transactionServicesService.fetchAllReceipt(id).subscribe(response => {
      this.allBillReceiptArray = response.data;
      console.log("Array:", this.allBillReceiptArray);
      for (let val of this.allBillReceiptArray) {
        this.totalRecepitAmount = Number(this.totalRecepitAmount) + Number(val.temp_total_received);
      }
      this.rupeeInWords = toWords.convert(this.totalRecepitAmount);
    })

  }
  onClickedClosed() {
    this.selectedIndex = 0;
  }
  active=0;
  onTabChanged(event:any){
    console.log(event)
  }
  clear(table: Table) {
    table.clear();
  } 
  getEventValue($event:any) :string {
    return $event.target.value;
  }
   getAllIncome(){
    this.reportService.fetchAllReceiptIncomeReport().subscribe(response=>{
      this.allIncomeArray=response.data;
      this.totalMonthlyCash=this.allIncomeArray[0].total_monthly_cash;
      this.totalMonthlyBank=this.allIncomeArray[0].total_monthly_bank;
      this.totalYearlyBank=this.allIncomeArray[0].total_yearly_bank;
      this.totalYearlyCash=this.allIncomeArray[0].total_yearly_cash;
      this.totalMonthlyIncome=this.allIncomeArray[0].total_monthly_income;
      this.totalYearlyIncome=this.allIncomeArray[0].total_yearly_income;
      console.log("all Income TS:",this.allIncomeArray);
    })
  }

  getTotalCourse(){
    this.courseService.fetchAllTotalCourse().subscribe(response => {
      this.totalNoCourse = response.data[0].totalCourse;
      console.log("Monthly totalNoCourse:",this.totalNoCourse);
    })
  }
  getTotalActiveStudent(){
    this.studentToCourseService.fetchAllTotalActiveStudent().subscribe(response => {
      this.totalNoActiveStudent = response.data[0].totalActiveStudent;
      console.log("Monthly totalNoCourse:",this.totalNoActiveStudent);
    })
  }
  getStudentBirthDay(){
    this.reportService.fetchStudentBirthDayDaysReport().subscribe(response => {
      this.birthdayArray=response.data;
      console.log("birthdayArray:",this.birthdayArray);
    })
  }
  getStudentUpcomingDueList(){
    this.reportService.fetchStudentUpcomingDueListReport().subscribe(response => {
      this.upcomingDueListArray=response.data;
      console.log("UpcomingDueList:",this.upcomingDueListArray);
    })
  }
  getWorkingDays(){
    this.reportService.fetchWorkingDaysReport().subscribe(response => {
      this.workingEndDate = response.data[0].end_date;
      this.workingDescription = response.data[0].description;
      this.dateDifference = response.data[0].date_difference;
      if(this.dateDifference<=3){
        this.showMessage=true;
      }else{
        this.showMessage=false;
      }
      console.log("dateDifference Days:",this.dateDifference);
    })
  }
  getStudentToCourseRegistrationList(){
    this.reportService.fetchStudentToCourseRegistrationReport().subscribe(response => {
      this.studentRegistrationHistoryArray=response.data;
      console.log("StudentToCourseRegistration:",this.studentRegistrationHistoryArray);
    })
  }
}

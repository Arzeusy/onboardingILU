import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {TemplateService} from 'src/app/services/template.service';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import TemplateInterface from 'src/app/interfaces/template.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit,AfterViewInit  {

  step = 0;
  form!: FormGroup;
  id:string ="";
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<TemplateInterface> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private templateService:TemplateService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ){
    let id = this.route.snapshot.paramMap.get('id');
    this.id = id ?? "";

    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl("", [Validators.minLength(10), Validators.maxLength(50), Validators.required]),
      description: new FormControl("", [Validators.maxLength(300)]),
      position: new FormControl(null, [Validators.required]),
    });

    
  }

   ngOnInit(): void {
    if(this.id != null || this.id != ""){
      this.spinner.show();
      this.templateService.getIdTemplates(this.id).then(
        res => {
          this.form.setValue(res);
          this.spinner.hide();
        }
      ).catch( err =>{
        this.spinner.hide();
      })
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async onSubmit(){
    if (!this.form.invalid){
      const response = await this.templateService.addTemplate(
        this.form.value
      );
      console.log(response);

    }
  }


  hasError(control: string):boolean {
    if (this.form.get(control)?.errors != null) {
      return true;
    }
    return false;
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
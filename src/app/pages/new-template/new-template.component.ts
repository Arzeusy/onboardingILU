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
import parameterTypeEnum from '../../enums/parameter-type.enum';
import parameterGroupEnum from '../../enums/parameter-group.enum';
import { ParametersService } from 'src/app/services/parameters.service';
import IParameter from 'src/app/interfaces/parameter.interface';

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.scss']
})
export class NewTemplateComponent implements OnInit,AfterViewInit  {

  step = 0;
  form!: FormGroup;
  formParams: FormGroup= new FormGroup({});
  id:string ="";
  displayedColumns: string[] = ['no', 'name', 'group', 'options'];
  actualGroup:number = parameterGroupEnum.objetivosDesempeño;
  dataSource: MatTableDataSource<IParameter> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private templateService:TemplateService,
    private parameterService:ParametersService,
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
    
    this.newformParam();
    
  }

  newformParam(){

    this.formParams = new FormGroup({
      // id: new FormControl(""),
      name: new FormControl("", [Validators.minLength(10), Validators.maxLength(50), Validators.required]),
      group: new FormControl(this.actualGroup.toString(), [Validators.required]),
      type: new FormControl(parameterTypeEnum.skill, [Validators.required]),
      templateId: new FormControl(this.id, [Validators.required]),
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
      });

      this.listParameter();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async onSubmit(){
    if (!this.form.invalid){
      this.spinner.show();
      if (this.id == ""){
        const response = await this.templateService.addTemplate(
          this.form.value
        );
        console.log(response);
        // this.listParameter();
      } else {
        const response = await this.templateService.updateTemplate(
          {...this.form.value, id: this.id}
        );
      }
      this.spinner.hide();

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

  async onSubmitParameter(){
    console.log(this.formParams);
    if (!this.formParams.invalid && !!this.id){
      this.spinner.show();
        await this.parameterService.addNew(
          this.formParams.value
        );
        this.listParameter();
        this.newformParam();
      this.spinner.hide();

    }
  }

  setGroup(event:any){
    this.actualGroup = event.value;
    this.listParameter();
  }

  async listParameter(){
    this.spinner.show();
    let params: IParameter[] = await this.parameterService.get(this.id);
    console.log(params)
    params = params.filter( a=> a.group == this.actualGroup); 
    this.dataSource = new MatTableDataSource(params);
    this.spinner.hide();
  }

  getLabelParameter(id:string){
    switch(id){
      case "1":
      return "Objetivo de aprendizaje";
      case "2":
        return "Desarrollo de competencia";
      case "3":
        return "Objetivos de desempeño";
      default:
        return "Objetivos de desempeño";
    }
  }


  async deleteParameter(data:IParameter){
    this.spinner.show();
    console.log(data, "delete")
     await this.parameterService.delete(data);
    this.spinner.hide();
    this.listParameter()
  }



}
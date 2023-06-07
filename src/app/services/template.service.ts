import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import TemplateInterface from '../interfaces/template.interface';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private firestore: Firestore
    ) {

   }

   addTemplate(template:TemplateInterface){
    const templateRef = collection(this.firestore, 'template');
    return addDoc(templateRef, template);
   }

   getTemplates():Observable<TemplateInterface[]>{
    const templateRef = collection(this.firestore, 'template');
    return collectionData(templateRef, {idField: 'id'}) as Observable<TemplateInterface[]>
   }



}

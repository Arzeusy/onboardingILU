import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, getDoc, doc, where, deleteDoc, fromRef } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import TemplateInterface from '../interfaces/template.interface';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private firestore: Firestore
    ) {}

  /**
  *  add new template to database 
  * @param template 
  * @returns 
  *  
  */
   addTemplate(template:TemplateInterface){
    const templateRef = collection(this.firestore, 'template');
    return addDoc(templateRef, template);
   }

   /**
    * @returns all the collections of template
    */
   getTemplates():Observable<TemplateInterface[]>{
    const templateRef = collection(this.firestore, 'template');
    return collectionData(templateRef, {idField: 'id'}) as Observable<TemplateInterface[]>
   }
   
   /**
    * 
    * @param id 
    * @returns return the documment related with id 
    */
    async getIdTemplates(id:string){
    const templateRef = doc(this.firestore, `template/${id}`);
    const docSnap = await getDoc(templateRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as TemplateInterface;
    } else {
      throw new Error("Error al recuperar la información")
    }
    
   }

   /**
    * 
    * @param tlp 
    * @returns delete the document related to id 
    */
   deleteTemplate(tlp: TemplateInterface){
    const templateRef = doc(this.firestore, `template/${tlp.id}`);
    return deleteDoc(templateRef);

   }

}

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, getDoc, doc, where, deleteDoc, fromRef, updateDoc, query, getDocs } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import IParameter from '../interfaces/parameter.interface';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(
    private firestore: Firestore
    ) {}

  /**
  *  add new template to database 
  * @param template 
  * @returns 
  *  
  */
  addNew(data:IParameter){
    const templateRef = collection(this.firestore, 'parameter');
    return addDoc(templateRef, data);
   }

   /**
    * @returns all the collections of template
    */
   async get(idTemplate:string){
    let res: IParameter[] =[];
    const templateRef = collection(this.firestore, 'parameter');
    const q = query(templateRef, where("templateId", "==", idTemplate));
    const querySnapshot =  await getDocs(q) ;
    await querySnapshot.forEach((doc) => {
      res.push({...doc.data(), id:doc.id} as IParameter);
    })
    return  res ;
   }
   
   /**
    * 
    * @param id 
    * @returns return the documment related with id 
    */
    async getById(id:string){
    const templateRef = doc(this.firestore, `parameter/${id}`);
    const docSnap = await getDoc(templateRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as IParameter;
    } else {
      throw new Error("Error al recuperar la información")
    }
    
   }

   /**
    * 
    * @param tlp 
    * @returns delete the document related to id 
    */
   delete(data: IParameter){
    const templateRef = doc(this.firestore, `parameter/${data.id}`);
    return deleteDoc(templateRef);

   }

     /**
    * 
    * @param tlp 
    * @returns delete the document related to id 
    */
     update(data: IParameter){
      const templateRef = doc(this.firestore, `parameter/${data.id}`);
      return updateDoc(templateRef, {...data});
     }




}

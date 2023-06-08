import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, getDoc, doc, where, deleteDoc, fromRef, updateDoc, query, getDocs } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import ISuplie from '../interfaces/suplie.interface';

@Injectable({
  providedIn: 'root'
})
export class SuplieService {

  constructor(
    private firestore: Firestore
    ) {}


  /**
  *  add new template to database 
  * @param template 
  * @returns 
  *  
  */
  addNew(data:ISuplie){
    const templateRef = collection(this.firestore, 'suplie');
    return addDoc(templateRef, data);
   }

   /**
    * @returns all the collections of template
    */
   async get(idTemplate:string){
    let res: ISuplie[] =[];
    const templateRef = collection(this.firestore, 'suplie');
    const q = query(templateRef, where("templateId", "==", idTemplate));
    const querySnapshot =  await getDocs(q) ;
    await querySnapshot.forEach((doc) => {
      res.push({...doc.data(), id:doc.id} as ISuplie);
    })
    return  res ;
   }
   
   /**
    * 
    * @param id 
    * @returns return the documment related with id 
    */
    async getById(id:string){
    const templateRef = doc(this.firestore, `suplie/${id}`);
    const docSnap = await getDoc(templateRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as ISuplie;
    } else {
      throw new Error("Error al recuperar la información")
    }
    
   }

   /**
    * 
    * @param tlp 
    * @returns delete the document related to id 
    */
   delete(data: ISuplie){
    const templateRef = doc(this.firestore, `suplie/${data.id}`);
    return deleteDoc(templateRef);

   }

     /**
    * 
    * @param tlp 
    * @returns update the document related to id
    */
     update(data: ISuplie){
      const templateRef = doc(this.firestore, `suplie/${data.id}`);
      return updateDoc(templateRef, {...data});
     }



}

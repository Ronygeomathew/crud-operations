import { Component } from '@angular/core';
import { Firestore,
        collection,
        addDoc,
        collectionData,
        doc,
        updateDoc,
        deleteDoc
 } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firenew';
  userData!: Observable<any>;

constructor(private firestore: Firestore){
  this.getData();
}



// add data query 

  addData(f: any){

    // console.log(f.value); 

    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, f.value)
    .then(() =>{
      console.log('Data saved successfully');
    })
    .catch((err)=> {
      console.log(err);
    })
  }

// read data query
getData() {
  const collectionInstance = collection(this.firestore, 'users');
  collectionData(collectionInstance, { idField: 'id'})
  .subscribe(val => {
    console.log(val);
  })
  this.userData = collectionData(collectionInstance, { idField: 'id'});
}

// update query

updateData(id: string){
  const docInstance = doc(this.firestore, 'users', id);
const updateData = {
  name: 'updatedName'
}
updateDoc (docInstance, updateData)
.then(()=> {
  console.log('Data updated');
})
.catch((err)=> {
  console.log(err);
})
}

// delete query

deleteData (id:string){
  const docInstance = doc(this.firestore, 'users', id);
  deleteDoc(docInstance)
  .then(()=> {
    console.log('Data Deleted')
  })
}

}

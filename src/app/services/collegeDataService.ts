import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from 'rxjs/operators/map';
import { UniversityModel } from "../viewModels/universityModel";

@Injectable({ providedIn: 'root' })

export class CollegeDataService{

    constructor(private database : AngularFireDatabase){}

    getAllStates(){
        // return this.database.list('estados').snapshotChanges()
        // .pipe(
        //     map(r => { return r.map(c => 
        //              ({ key: c.payload.key, ...c.payload.val()  })
        //     )})
        // );

        return this.database.list('universidades').snapshotChanges();
        // .pipe(
        //     map(r => { return r.map(c => 
        //              ({ key: c.payload.key, ...c.payload.val()  })
        //     )})
        // );
    }

    getUniversity(): UniversityModel[] {
            var universities: UniversityModel[] = [];
            var ref = this.database.database.ref("universidades");
            ref.once("value").then(function(snapshot) {
                            snapshot.forEach(function(childSnapshot) {
                                var childData = childSnapshot.val();
                                universities.push(childData)
                        });
                });

            return universities;
    }
}
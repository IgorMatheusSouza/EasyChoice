import { Component, OnInit } from '@angular/core';
import { DataModel } from 'src/app/searchEngine/dataModel';
import { SearchModel } from 'src/app/searchEngine/searchModel';
import { SearchAlgorithm } from 'src/app/searchEngine/serachAlgorithm';
import { CollegeDataService } from 'src/app/services/collegeDataService';
import { ExternalService } from 'src/app/services/externalApiService';
import { StaticData } from 'src/app/staticData/staticData';
import { CollegeResultModel } from 'src/app/viewModels/collegeResultModel';
import { CourseModel } from 'src/app/viewModels/courseModel';
import { DataFormModel } from 'src/app/viewModels/dataFormModel';
import { SearchFormModel } from 'src/app/viewModels/searchFormModel';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.less']
})

export class CollegeComponent implements OnInit {

  public dataForm : DataFormModel = new DataFormModel();
  public searchForm : SearchFormModel = new SearchFormModel();
  public resultData :  CollegeResultModel [];
  
  constructor(private collegeDataService : CollegeDataService, private staticData : StaticData, private externalService: ExternalService, private searchAlgorithm: SearchAlgorithm) {

   }

  ngOnInit(): void {
    this.dataForm.states = this.staticData.getAllStates();
    this.loadUniversities();
  }

  loadUniversities() {
    this.dataForm.universities = this.collegeDataService.getUniversity();
  }

  async loadCities(){
    if(this.searchForm.uf){
        var cities = await this.externalService.getCitiesByUf(this.searchForm.uf);
        console.log((cities as string[]).sort());
        this.dataForm.cities = cities.sort();
        
    }
  }

  async loadCourses(){
    var fields = this.searchForm.field.toLowerCase().trim().split("-");
    this.dataForm.courses = [];

    await this.dataForm.universities.forEach(university => {
      fields.forEach(filed => {
              var cursos = university?.cursos?.filter(x => x.nome.toLowerCase().includes(filed.trim().toLowerCase()))
              if(cursos && cursos.length > 0)
                this.dataForm.courses.push(...cursos);
         })
         const uniqueArray = [...new Set(this.dataForm.courses.map(item => item.nome.toLowerCase()))];
         this.dataForm.coursesNames = uniqueArray;
      });
  }

  async processeSearchForm(){
      var data = DataModel.mapUniversityModelToDataModel(this.dataForm.universities);
      var searchForm = SearchModel.mapSearchFormToSearchModel(this.searchForm);
      let processedData = await this.searchAlgorithm.processSearchform(data, searchForm);
      this.resultData = DataModel.mapDataModelModelToCollegeModel(processedData).splice(0, 100);
  }
}
import { CollegeResultModel } from "../viewModels/collegeResultModel";
import { UniversityModel } from "../viewModels/universityModel";

export class DataModel {

    public prop1: any;
    public prop2: any;
    public prop3: any;
    public prop4: any;
    public prop5: any;
    public prop6: any;
    public prop7: any;
    public prop8: any;
    public prop9: any;
    public prop10: any;

    public percentage: number = 0;


    public static mapUniversityModelToDataModel(universityModel: UniversityModel[]) : DataModel[] {
        let dataResult: DataModel[] = [];
        universityModel.forEach(u => {
            u.cursos?.forEach(c => {
                var data = new DataModel();
                data.prop1 = c?.nome;
                data.prop2 = c?.nivel;
                data.prop3 = c?.turno;
                data.prop4 = u.nome;
                data.prop5 = u.Cidade;
                data.prop6 = u.Estado;
                data.prop7 = u.tipoInstituicao;
                data.prop8 = c?.nome;
                dataResult.push(data);
            })
        });

        return dataResult;
    }

    public static mapDataModelModelToCollegeModel (dataModel: DataModel[]) : CollegeResultModel[] {
        let dataResult: CollegeResultModel[] = [];
        dataModel.forEach(data => {
                var result = new CollegeResultModel();
                result.courseName =  data.prop1;
                result.level =  data.prop2;
                result.shift =  data.prop3;
                result.collegeName =  data.prop4;
                result.city =  data.prop5;
                result.state =  data.prop6;
                result.type =  data.prop7;
                result.perc = data.percentage;
                dataResult.push(result);
        });

        return dataResult;
    }
}

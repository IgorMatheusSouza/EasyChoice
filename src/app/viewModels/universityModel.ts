import { CourseModel } from "./courseModel";

export class UniversityModel {

    public nome : string;
    public tipoInstituicao : string;
    public Estado: string;
    public Cidade: string;
    public Endereço: string;
    public cursos: CourseModel[] = [];

}

import { CourseModel } from "./courseModel";
import { UniversityModel } from "./universityModel";

export class DataFormModel{

    public states : string[] = [];
    public cities : string[] = [];
    public universities: UniversityModel[];
    public courses: CourseModel[] = [];
    public coursesNames: string[] = [];
}
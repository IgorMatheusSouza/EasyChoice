import { SearchFormModel } from "../viewModels/searchFormModel";

export class SearchModel {

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

    public static mapSearchFormToSearchModel(search: SearchFormModel) {
        let result = new SearchModel();
        result.prop1 = search.field;
        result.prop2 = search.level;
        result.prop3 = search.shift;
        result.prop4 = false;
        result.prop5 = search.city;
        result.prop6 = search.uf;
        result.prop7 = search.type;
        result.prop8 = search.course;
        return result;
    }
}

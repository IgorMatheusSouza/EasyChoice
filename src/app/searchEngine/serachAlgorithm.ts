import { Injectable } from "@angular/core";
import { DataModel } from "./dataModel";
import { SearchModel } from "./searchModel";

@Injectable({ providedIn: 'root' })

export class SearchAlgorithm {

    private data: DataModel[];
    private searchForm: SearchModel;
    private totalFormColumns: number;
    private percentageValue: number;

    public async processSearchform(data: DataModel[], searchForm: SearchModel): Promise<DataModel[]> {
        this.data = data;
        this.searchForm = searchForm;

        this.countColumns();
        this.processComparison();

        return this.data.sort((a, b) => b.percentage - a.percentage);
    }

    private countColumns(): void {
        this.totalFormColumns = 0;
        this.percentageValue = 0
        let keys = Object.keys(this.searchForm);

        for (let index = 0; index < keys.length; index++) {
            this.totalFormColumns += this.searchForm[keys[index]] ? 1 : 0;
        }
        this.percentageValue = 100 / this.totalFormColumns;
    }

    private async processComparison() {
        this.data.forEach(d => {
            this.compareValues(d);
        })
    }

    private async compareValues(data: DataModel) {
        let keys = Object.keys(this.searchForm);

        for (let index = 0; index < keys.length; index++) {
            let dataIndex = data[keys[index]];
            if (dataIndex && (dataIndex as string).toLowerCase().includes((this.searchForm[keys[index]] as string).toLowerCase()))
                data.percentage += this.percentageValue;
            if(index == 7)
                this.searchForm[keys[index]]?.forEach(element => {
                    if(dataIndex && (dataIndex as string).toLowerCase() == (element as string).toLowerCase())
                    {
                        data.percentage += this.percentageValue;
                    }
                });
        }
    }
}
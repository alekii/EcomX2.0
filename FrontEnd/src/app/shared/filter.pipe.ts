import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name : 'filter'
})

export class FilterPipe implements PipeTransform{
    transform(value: any[], filterString:string,propName:string): any[] { 
      const result: any=[];

      if(!value || filterString==='' || propName ===''){
          return value;
      }
      value.forEach((cat:any) =>{
          if((cat.category).trim().toLowerCase().includes(filterString).trim().toLowerCase()){
            result.push(cat); 
          }
      });
      console.log(result)
      return result;
    }

}
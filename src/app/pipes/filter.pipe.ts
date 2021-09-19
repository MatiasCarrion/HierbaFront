import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    if (arg === '' || arg.length < 3) return value;
    
    const resultProd = [];

    for(const prod of value){

      if((prod.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) || (prod.categoria.toLowerCase().indexOf(arg.toLowerCase()) > -1)){
        resultProd.push(prod);
      }

    }
    return resultProd;

  }

}

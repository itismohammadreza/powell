import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'ngFilter'
})
export class FilterPipe implements PipeTransform {
	transform(value: any[], keys: string, term: string): any[] {
		if (!term) {
			return value;
		}
		return (value || []).filter((item: any) =>
			keys
				.split(',')
				.some(
					(key: string) =>
						item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])
				)
		);
	}
}

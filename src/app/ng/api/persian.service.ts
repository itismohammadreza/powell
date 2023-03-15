import {Injectable} from '@angular/core';

class NumberToPersianWord {
  private s_0_9 = [
    'صفر',
    'یک',
    'دو',
    'سه',
    'چهار',
    'پنج',
    'شش',
    'هفت',
    'هشت',
    'نه'
  ];
  private s_10_19 = [
    'ده',
    'یازده',
    'دوازده',
    'سیزده',
    'چهارده',
    'پانزده',
    'شانزده',
    'هفده',
    'هجده',
    'نوزده'
  ];
  private s_20_90 = [
    'بیست',
    'سی',
    'چهل',
    'پنجاه',
    'شصت',
    'هفتاد',
    'هشتاد',
    'نود'
  ];
  private s_100_900 = [
    'صد',
    'دویست',
    'سیصد',
    'چهارصد',
    'پانصد',
    'ششصد',
    'هفتصد',
    'هشتصد',
    'نهصد'
  ];
  private s_Parts = ['هزار', 'میلیون', 'میلیارد', 'تريليون'];
  private splitter = ' و ';
  private veryBig = 'تعریف نشده';
  private negative = 'منفی';

  convertNumberToString(inputNumber: string | number) {
    const tempNumber = Math.abs(+inputNumber).toString();
    if (tempNumber.length == 0) {
      return '';
    }
    if (tempNumber === '0') {
      return this.s_0_9[0];
    }
    const partCount = Math.ceil(parseInt(tempNumber).toString().length / 3);
    if (this.s_Parts.length < partCount) {
      return this.veryBig;
    }

    const partFullString = [];

    for (let i = 0; i < partCount; i++) {
      let numberLength3: string;
      let lengthToSelectFirstPart: number = 0;
      if (i == 0) {
        lengthToSelectFirstPart = tempNumber.length - (partCount - 1) * 3;
        numberLength3 = tempNumber.substr(i * 3, lengthToSelectFirstPart);
      } else {
        numberLength3 = tempNumber.substr(
          lengthToSelectFirstPart + (i - 1) * 3,
          3
        );
      }

      const partInWord = this.getPart(numberLength3);
      const partIndex = partCount - 2 - i;
      let partPreFix = this.s_Parts[partIndex];

      if (i == partCount - 1) {
        partPreFix = '';
      }

      if (i == 0) {
        if (partInWord != '') {
          partFullString[i] = partInWord + ' ' + partPreFix;
        } else {
          partFullString[i] = '';
        }
      } else {
        if (partFullString[i - 1] != '') {
          if (partInWord != '') {
            partFullString[i] = this.splitter + partInWord + ' ' + partPreFix;
          } else {
            partFullString[i] = '';
          }
        } else {
          if (partInWord != '') {
            partFullString[i] = this.splitter + partInWord + ' ' + partPreFix;
          } else {
            partFullString[i] = '';
          }
        }
      }
    }

    let outString = '';

    for (let i = 0; i < partFullString.length; i++) {
      outString += partFullString[i];
    }

    if (inputNumber.toString().substr(0, 1) == '-') {
      outString = this.negative + ' ' + outString;
    }

    return outString;
  }

  private getPart(numberIn3: string) {
    if (numberIn3.length > 3) {
      return '';
    }

    let number = numberIn3.toString();

    switch (number.length) {
      case 1:
        number = '00' + number;
        break;
      case 2:
        number = '0' + number;
        break;
    }

    let outString = '';

    const n1 = parseInt(number.substr(0, 1));
    const n2 = parseInt(number.substr(1, 1));
    const n3 = parseInt(number.substr(2, 1));

    if (n1 != 0) {
      switch (n2) {
        case 0:
          if (n3 != 0) {
            outString = this.s_100_900[n1 - 1] + this.splitter + this.s_0_9[n3];
          } else {
            outString = this.s_100_900[n1 - 1];
          }
          break;
        case 1:
          outString = this.s_100_900[n1 - 1] + this.splitter + this.s_10_19[n3];
          break;
        default:
          if (n3 != 0) {
            outString =
              this.s_100_900[n1 - 1] +
              this.splitter +
              this.s_20_90[n2 - 2] +
              this.splitter +
              this.s_0_9[n3];
          } else {
            outString =
              this.s_100_900[n1 - 1] + this.splitter + this.s_20_90[n2 - 2];
          }
      }
    } else {
      switch (n2) {
        case 0:
          if (n3 != 0) {
            outString = this.s_0_9[n3];
          } else {
            outString = '';
          }
          break;
        case 1:
          outString = this.s_10_19[n3];
          break;
        default:
          if (n3 != 0) {
            outString = this.s_20_90[n2 - 2] + this.splitter + this.s_0_9[n3];
          } else {
            outString = this.s_20_90[n2 - 2];
          }
      }
    }

    return outString;
  }
}

@Injectable()
export class PersianService {
  replaceArabicLettersWithPersianLetters(inputStr: string): string {
    if (inputStr == undefined) {
      return '';
    }
    inputStr = inputStr.replace(/ي/g, 'ی');
    inputStr = inputStr.replace(/ك/g, 'ک');
    return inputStr;
  }

  isPersianNumber(num: number | string): boolean {
    const regexp = new RegExp('^[\u06F0-\u06F9]+$');
    return regexp.test(num as string);
  }

  toPersianNumber(num: number | string): string {
    return this.arabicNumberToPersian(this.engNumberToPersian(num as string));
  }

  toEngNumber(num: string): number {
    const engNumber = +this.persianNumberToEng(num);
    if (isNaN(engNumber)) {
      throw new Error(`${num} is not valid persian Number`);
    }
    return engNumber;
  }

  toPersianWord(num: number | string): string {
    return new NumberToPersianWord().convertNumberToString(
      this.toEngNumber(num as string)
    );
  }

  engNumberToPersian(num: string): string {
    if (num == undefined) {
      return '';
    }
    let str = num.toString().trim();
    if (str === '') {
      return '';
    }
    str = str.replace(/0/g, '۰');
    str = str.replace(/1/g, '۱');
    str = str.replace(/2/g, '۲');
    str = str.replace(/3/g, '۳');
    str = str.replace(/4/g, '۴');
    str = str.replace(/5/g, '۵');
    str = str.replace(/6/g, '۶');
    str = str.replace(/7/g, '۷');
    str = str.replace(/8/g, '۸');
    str = str.replace(/9/g, '۹');
    return str;
  }

  arabicNumberToPersian(num: string): string {
    if (num == undefined) {
      return '';
    }
    let str = num.toString().trim();
    if (str === '') {
      return '';
    }
    str = str.replace(/٤/g, '۴');
    str = str.replace(/٥/g, '۵');
    str = str.replace(/٦/g, '۶');
    return str;
  }

  persianNumberToEng(num: string) {
    if (num == undefined) {
      return NaN;
    }
    let str = num.toString().trim();
    if (str === '') {
      return NaN;
    }
    str = str.replace(/۰/g, '0');
    str = str.replace(/۱/g, '1');
    str = str.replace(/۲/g, '2');
    str = str.replace(/۳/g, '3');
    str = str.replace(/۴/g, '4');
    str = str.replace(/۵/g, '5');
    str = str.replace(/۶/g, '6');
    str = str.replace(/۷/g, '7');
    str = str.replace(/۸/g, '8');
    str = str.replace(/۹/g, '9');
    return str;
  }
}

import {Injectable} from '@angular/core';

@Injectable()
export class PersianService {
  replaceArabicLettersWithPersianLetters(input: string) {
    if (input == undefined) {
      return '';
    }
    input = input.replace(/ي/g, 'ی');
    input = input.replace(/ك/g, 'ک');
    return input;
  }

  isPersianNumber(num: number | string) {
    const regexp = /^[\u06F0-\u06F9]+$/;
    return regexp.test(num as string);
  }

  engNumberToPersian(num: string) {
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

  arabicNumberToPersian(num: string) {
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

  toPersianWord(input: string | number) {
    if (input == undefined || input == '') {
      return '';
    }
    const delimiter = ' و ';
    const zero = 'صفر';
    const negative = 'منفی ';
    const letters = [
      ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
      ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست'],
      ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
      ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
      [
        '',
        ' هزار',
        ' میلیون',
        ' میلیارد',
        ' بیلیون',
        ' بیلیارد',
        ' تریلیون',
        ' تریلیارد',
        ' کوآدریلیون',
        ' کادریلیارد',
        ' کوینتیلیون',
        ' کوانتینیارد',
        ' سکستیلیون',
        ' سکستیلیارد',
        ' سپتیلیون',
        ' سپتیلیارد',
        ' اکتیلیون',
        ' اکتیلیارد',
        ' نانیلیون',
        ' نانیلیارد',
        ' دسیلیون',
        ' دسیلیارد'
      ],
    ];
    const decimalSuffixes = [
      '',
      'دهم',
      'صدم',
      'هزارم',
      'ده‌هزارم',
      'صد‌هزارم',
      'میلیونوم',
      'ده‌میلیونوم',
      'صدمیلیونوم',
      'میلیاردم',
      'ده‌میلیاردم',
      'صد‌‌میلیاردم'
    ];
    const convertDecimalPart = (num: string) => {
      num = num.replace(/0*$/, "");
      if (num === '') {
        return '';
      }
      if (num.length > 11) {
        num = num.substring(0, 11);
      }
      return ' ممیز ' + this.toPersianWord(num) + ' ' + decimalSuffixes[num.length];
    };
    const tinyNumToWord = (num: string) => {
      if (parseInt(num, 0) === 0) {
        return '';
      }
      const parsedInt = parseInt(num, 0);
      if (parsedInt < 10) {
        return letters[0][parsedInt];
      }
      if (parsedInt <= 20) {
        return letters[1][parsedInt - 10];
      }
      if (parsedInt < 100) {
        const one = parsedInt % 10;
        const ten = (parsedInt - one) / 10;
        if (one > 0) {
          return letters[2][ten] + delimiter + letters[0][one];
        }
        return letters[2][ten];
      }
      const one = parsedInt % 10;
      const hundreds = (parsedInt - (parsedInt % 100)) / 100;
      const ten = (parsedInt - ((hundreds * 100) + one)) / 10;
      const out = [letters[3][hundreds]];
      const secondPart = ((ten * 10) + one);
      if (secondPart === 0) {
        return out.join(delimiter);
      }
      if (secondPart < 10) {
        out.push(letters[0][secondPart]);
      } else if (secondPart <= 20) {
        out.push(letters[1][secondPart - 10]);
      } else {
        out.push(letters[2][ten]);
        if (one > 0) {
          out.push(letters[0][one]);
        }
      }

      return out.join(delimiter);
    };
    const prepareNumber = (num: string | number) => {
      let out = num;
      if (typeof out === 'number') {
        out = out.toString();
      }
      if (out.length % 3 === 1) {
        out = `00${out}`;
      } else if (out.length % 3 === 2) {
        out = `0${out}`;
      }
      return out.replace(/\d{3}(?=\d)/g, '$&*').split('*');
    };

    input = input.toString().replace(/[^0-9.-]/g, '');
    let isNegative = false;
    const floatParse = parseFloat(input);
    if (isNaN(floatParse)) {
      return zero;
    }
    if (floatParse === 0) {
      return zero;
    }
    if (floatParse < 0) {
      isNegative = true;
      input = input.replace(/-/g, '');
    }
    let decimalPart = '';
    let integerPart = input;
    let pointIndex = input.indexOf('.');
    if (pointIndex > -1) {
      integerPart = input.substring(0, pointIndex);
      decimalPart = input.substring(pointIndex + 1, input.length);
    }
    if (integerPart.length > 66) {
      return 'خارج از محدوده';
    }
    const slicedNumber = prepareNumber(integerPart);
    const out = [];
    for (let i = 0; i < slicedNumber.length; i += 1) {
      const converted = tinyNumToWord(slicedNumber[i]);
      if (converted !== '') {
        out.push(converted + letters[4][slicedNumber.length - (i + 1)]);
      }
    }
    if (decimalPart.length > 0) {
      decimalPart = convertDecimalPart(decimalPart);
    }
    return (isNegative ? negative : '') + out.join(delimiter) + decimalPart;
  };
}

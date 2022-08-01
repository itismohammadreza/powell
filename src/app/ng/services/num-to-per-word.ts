export class NumberToPersianWord {
  private s_0_9 = new Array(
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
  );
  private s_10_19 = new Array(
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
  );
  private s_20_90 = new Array(
    'بیست',
    'سی',
    'چهل',
    'پنجاه',
    'شصت',
    'هفتاد',
    'هشتاد',
    'نود'
  );
  private s_100_900 = new Array(
    'صد',
    'دویست',
    'سیصد',
    'چهارصد',
    'پانصد',
    'ششصد',
    'هفتصد',
    'هشتصد',
    'نهصد'
  );
  private s_Parts = new Array('هزار', 'میلیون', 'میلیارد', 'تريليون');
  private splitter = ' و ';
  private veryBig = 'تعریف نشده';
  private negative = 'منفی';

  public convertNumberToString(inputNumber) {
    var tempNumber = Math.abs(inputNumber).toString();

    if (tempNumber.length == 0) {
      return '';
    }

    if (tempNumber === '0') {
      return this.s_0_9[0];
    }

    var partCount = Math.ceil(parseInt(tempNumber).toString().length / 3);

    if (this.s_Parts.length < partCount) {
      return this.veryBig;
    }

    var partFullString = new Array();

    for (var i = 0; i < partCount; i++) {
      var numberLength3;

      var lengthToSelectFirtPart;
      if (i == 0) {
        lengthToSelectFirtPart = tempNumber.length - (partCount - 1) * 3;
        numberLength3 = tempNumber.substr(i * 3, lengthToSelectFirtPart);
      } else {
        numberLength3 = tempNumber.substr(
          lengthToSelectFirtPart + (i - 1) * 3,
          3
        );
      }

      var partInWord = this.getPart(numberLength3);

      var partIndex = partCount - 2 - i;
      var partPreFix = this.s_Parts[partIndex];

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

    var outString = '';

    for (var i = 0; i < partFullString.length; i++) {
      outString += partFullString[i];
    }

    if (inputNumber.toString().substr(0, 1) == '-') {
      outString = this.negative + ' ' + outString;
    }

    return outString;
  }

  private getPart(numberIn3) {
    if (numberIn3.length > 3) {
      return '';
    }

    var number = numberIn3.toString();

    switch (number.length) {
      case 1:
        number = '00' + number;
        break;
      case 2:
        number = '0' + number;
        break;
    }

    var outString = '';

    var n1 = parseInt(number.substr(0, 1));
    var n2 = parseInt(number.substr(1, 1));
    var n3 = parseInt(number.substr(2, 1));

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

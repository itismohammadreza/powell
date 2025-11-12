import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";

export const helpers = {
  startPolling: <T>(apiFn: () => Promise<T>, interval: number, onResult: (result: T) => void, onError?: (err: SafeAny) => void) => {
    let stopped = false;
    let timeoutId: number;

    async function poll() {
      if (stopped) return;
      try {
        const result = await apiFn();
        onResult(result);
      } catch (err) {
        onError?.(err);
      } finally {
        if (!stopped) {
          timeoutId = setTimeout(poll, interval);
        }
      }
    }

    poll();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      stopped = true;
    };
  },

  getDirtyControls: (form: FormGroup) => {
    const result = {};
    const isDirty = (control: AbstractControl): boolean => {
      if (control instanceof FormGroup) {
        return Object.values(control.controls).some(c => c.dirty && isDirty(c))
      }
      if (control instanceof FormControl) {
        return !!(control.value && control.dirty)
      }
      if (control instanceof FormArray) {
        return control.controls.some(g => isDirty(g))
      }
      return false;
    }
    const fillResult = (group: FormGroup, res: SafeAny) => Object.entries(group.controls).forEach(([name, control]) => {
      if (control instanceof FormControl && isDirty(control)) {
        if (Array.isArray(res)) {
          res.push({[name]: control.value})
        } else {
          res[name] = control.value;
        }
      } else if (control instanceof FormGroup && isDirty(control)) {
        res[name] = {};
        fillResult(control, res[name])
      } else if (control instanceof FormArray && isDirty(control)) {
        res[name] = [];
        control.controls.forEach(g => {
          if (isDirty(g)) {
            fillResult(g as FormGroup, res[name])
          }
        })
      }
    })
    fillResult(form, result);
    if (JSON.stringify(result) == '{}') {
      return null;
    }
    return result;
  },

  convertToTimeFormat: (seconds: number) => {
    const hrs = Math.floor((seconds / 3600));
    const mins = Math.floor(((seconds % 3600) / 60));
    const secs = Math.floor(seconds % 60);
    let result = '';
    if (hrs > 0) {
      result += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    result += '' + mins + ':' + (secs < 10 ? '0' : '');
    result += '' + secs;
    return result;
  },

  getTypeClass: (fileType: string) => {
    return fileType.substring(0, fileType.indexOf('/'));
  },

  isWildcard: (fileType: string) => {
    return fileType.indexOf('*') !== -1;
  },

  checkConnectionSpeed(callback: SafeAny) {
    const imageUrl = 'https://via.placeholder.com/2000x2000';
    const downloadSize = 4995374;
    let startTime: number;
    let endTime: number;
    const download = new Image();
    download.onload = () => {
      endTime = (new Date()).getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = downloadSize * 8;
      const speedBps = +(bitsLoaded / duration).toFixed(2);
      const speedKbps = +(speedBps / 1024).toFixed(2);
      const speedMbps = +(speedKbps / 1024).toFixed(2);
      callback(speedMbps);
    };
    startTime = (new Date()).getTime();
    const cacheBuster = '?nnn=' + startTime;
    download.src = imageUrl + cacheBuster;
  },

  fileToBase64: (file: File) => {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result!);
      };
      reader.onerror = (error) => reject(error);
    });
  },

  urlToBase64: (url: string) => {
    return fetch(url, {
      headers: new Headers({
        Origin: '*',
      }),
    })
    .then((response) => response.blob())
    .then((blob) => helpers.fileToBase64(blob as File));
  },

  base64toFile: (dataUrl: SafeAny, filename: string) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  },

  blobToFile: (blob: Blob, fileName: string) => {
    const b = blob as SafeAny;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return blob as File;
  },

  getFileExtension: (file: File) => {
    return '.' + file.name.split('.').pop()?.toLowerCase();
  },

  isFileTypeValid: (file: File, acceptList: string, separator: string = ',') => {
    if (!acceptList) return true;
    const fileType = file.type;
    const fileExt = helpers.getFileExtension(file);
    const acceptableTypes = acceptList.split(separator).map(t => t.trim().toLowerCase());
    for (const type of acceptableTypes) {
      if (type.endsWith('/*')) {
        const baseType = type.split('/')[0];
        if (fileType.startsWith(baseType + '/')) {
          return true;
        }
      } else if (type.includes('/')) {
        if (fileType === type) {
          return true;
        }
      } else {
        const normalized = type.startsWith('.') ? type : '.' + type;
        if (fileExt === normalized) {
          return true;
        }
      }
    }
    return false;
  },

  isFileSizeValid: (file: File, max: number, min?: number) => {
    const size = file.size;
    const supportMin = min ? size >= min : true;
    const supportMax = size <= max;
    return supportMin && supportMax;
  },

  isImage: (value: SafeAny) => {
    if (!value) {
      return false;
    }

    const isImageUrl = (url: string) => {
      return /\.(jpeg|jpg|gif|png)$/.exec(url) != undefined;
    }

    const isImageFile = (file: File) => {
      return file.type.split('/')[0] === 'image' || /^image\//.test(file.type);
    }

    const isImageBase64 = (url: string) => {
      const ext = url.substring(url.indexOf('/') + 1, url.indexOf(';base64'));
      return ['png', 'jpg', 'jpeg', 'gif', 'tif', 'tiff'].indexOf(ext) > -1;
    }

    let result = false;
    if (Array.isArray(value)) {
      if (!value.length) {
        return false;
      }
      if (value.every((item) => item instanceof File && isImageFile(item))) {
        result = true;
      }
      if (value.every((item) => typeof item == 'string' && (isImageUrl(item) || isImageBase64(item)))) {
        result = true;
      }
    } else if (value instanceof File && isImageFile(value)) {
      result = true;
    } else if (typeof value == 'string' && (isImageUrl(value) || isImageBase64(value))) {
      result = true;
    } else if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        if (isImageFile(value.item(i)!)) {
          result = true;
        } else {
          result = false;
          break;
        }
      }
    }
    return result;
  },

  isValidURL: (url: string) => {
    const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  },

  joinArraysWithoutDuplicates: (array1: SafeAny[], array2: SafeAny[], field: string) => {
    const set1 = new Set(array1.map(x => x[field]));
    return [...array1, ...array2.filter(x => !set1.has(x[field]))]
  },

  setFieldValue: (obj: SafeAny, path: string, value: SafeAny) => {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    current[keys[keys.length - 1]] = value;
  },

  buildObjectFromPath: (path: string, value: SafeAny) => {
    return path.split('.').reverse().reduce((acc, key) => ({[key]: acc}), value);
  },

  copyToClipboard: (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  },

  toggleFullScreen: (elem: any, activate: boolean) => {
    if (activate) {
      let methodToBeInvoked =
        elem.requestFullscreen ||
        elem["webkitRequestFullScreen"] ||
        elem["mozRequestFullscreen"] ||
        elem["msRequestFullscreen"];
      if (methodToBeInvoked) methodToBeInvoked.call(elem);
    } else {
      const doc: any = document;
      if (doc.fullscreenElement) {
        if (doc.exitFullscreen) {
          doc.exitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          doc.mozCancelFullScreen();
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      }
    }
  }
}


export function getActivityID(pathName: string) {
    return pathName.split('/')[pathName.split('/').length - 1];
  }
export function timeElapsed(createdTime: string): string {
 const now: Date = new Date();
 const createdDate: Date = new Date(createdTime);
 const elapsed: number = now.getTime() - createdDate.getTime();

 const seconds: number = Math.floor(elapsed / 1000);
 const minutes: number = Math.floor(seconds / 60);
 const hours: number = Math.floor(minutes / 60);
 const days: number = Math.floor(hours / 24);
 const weeks: number = Math.floor(days / 7);

 const monthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
 ];

 if (weeks > 0) {
  if (weeks === 1) {
   return '1 week ago';
  } else {
   const month: string = monthNames[createdDate.getMonth()];
   const day: number = createdDate.getDate();
   const year: number = createdDate.getFullYear();
   return `${month} ${day}, ${year}`;
  }
 } else if (days > 0) {
  return days === 1 ? '1 day ago' : `${days} days ago`;
 } else if (hours > 0) {
  return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
 } else if (minutes > 0) {
  return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
 } else {
  return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
 }
}

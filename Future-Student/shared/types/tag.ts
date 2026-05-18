export class Tag {
  tagID: number;
  title: string;
}

export function toString(e: Tag): string {
  return e.title;
}
export type Trainer = {
  id?: string;
  lastName: string;
  firstName: string;
  groups: string[]; // todo: add group type, arr of group ids
  imgUrl: string;
};

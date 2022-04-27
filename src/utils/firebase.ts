import { User } from "../models/user";

export const formatResp = (
  collection: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
) => {
  let array: (User & { id: string })[] = [];
  collection.forEach((element) => {
    array.push({ id: element.id, ...element.data() } as User & { id: string });
  });
  return array;
};

export const formatGeneralResp = <T>(
  collection: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
) => {
  let array: (T & { id: string })[] = [];
  collection.forEach((element) => {
    array.push({ id: element.id, ...element.data() } as T & { id: string });
  });
  return array;
};

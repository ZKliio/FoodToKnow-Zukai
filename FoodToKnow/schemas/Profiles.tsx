import { Realm, createRealmContext } from "@realm/react";

import { BSON } from "realm";


// Define your object model
export class Profiles extends Realm.Object {
    _id!: BSON.ObjectId;
    name!: string;

    static schema = {
      name: 'Profile',
      properties: {
        _id: 'objectId',
        description: 'string',
      },
      primaryKey: '_id',
    };
  }

const RealmContext = createRealmContext({
  schema: [Profiles],
});

export default RealmContext
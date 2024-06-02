import { Realm } from "realm";
import { BSON, ObjectSchema } from "realm";


// Define your object model
export class FoodModel extends Realm.Object<FoodModel> {
    _id!: BSON.ObjectId;
    name!: string;

    static schema: ObjectSchema = {
      name: 'foodName',
      properties: {
        _id: 'objectId',
        name: {type: 'string', indexed: 'full-text'},
        calories: 'int?',
      },
      primaryKey: '_id',
      
    };
  }
import React from 'react';
import { useRealm, useQuery } from '@realm/react';
import { BSON } from 'realm';
import { Profiles } from '../../schemas/Profiles.tsx';

const RestOfApp = () => {
  const realm = useRealm();
  const profiles = useQuery(Profiles);

  // Create a new profile
  const createProfile = () => {
    realm.write(() => {
      realm.create('Profile', {
        _id: new BSON.ObjectId(),
        name: 'John Doe'
      });
    });
  };

  // Update a profile
  const updateProfile = (id: unknown, newName: unknown) => {
    realm.write(() => {
      const profile = realm.objectForPrimaryKey('Profile', id);
      if (profile) {
        profile.name = newName;
      }
    });
  };

  // Delete a profile
  const deleteProfile = (id: unknown) => {
    realm.write(() => {
      const profile = realm.objectForPrimaryKey('Profile', id);
      if (profile) {
        realm.delete(profile);
      }
    });
  };

  return (
    <div>
      <button onClick={createProfile}>Create Profile</button>
      <ul>
        {profiles.map((profile) => (
          <li key={profile._id.toString()}>
            {profile.name}
            <button onClick={() => updateProfile(profile._id, 'Jane Doe')}>Update</button>
            <button onClick={() => deleteProfile(profile._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestOfApp;

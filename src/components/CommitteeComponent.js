import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RoleComponent } from './RoleComponent';

export const CommitteeComponent = (props) => {
  const [committeeMetaData, setCommitteeMetaData] = useState({});
  const [committeeMembers, setCommitteeMembers] = useState([]);

  useEffect(() => {
    const loadCommittee = async () => {
      let result;

      try {
        result = await axios.get(`https://www.greyjcr.co.uk/api/jcr/committee/${props.committeeId}`);
      } catch (error) {
        alert("Unable to load the basic committee data");
        console.log({ error });
        return;
      }

      const { committee, committeeMembers: roles } = result.data;

      const destructuredRoles = roles.map(entry => entry.JCRRole);

      setCommitteeMembers(destructuredRoles);
      setCommitteeMetaData(committee);
    }

    loadCommittee();
  }, [props.committeeId])

  const displayCommitteeMetaData = () => {
    const { name, description } = committeeMetaData;

    return (
      <>
        <h2>{name}</h2>
        <p>{description}</p>
      </>
    )
  }

  const displayCommitteeMembers = () => (
    <div className="committee-members">
      {
        committeeMembers.map((role, i) => (
          role.JCRRoleUserLinks.map((member, j) => (
            <RoleComponent
              key={`${role.name}-${j}`}
              name={role.name}
              description={role.description}
              email={role.email}
              holderFirstNames={member.User.firstNames}
              holderSurname={member.User.surname}
              holderProfilePicture={member.User.profilePicture}
            />
          ))
        ))
      }
    </div>
  )

  return (
    <div className="committee-container">
      { displayCommitteeMetaData() }
      { displayCommitteeMembers() }
    </div>
  )
}

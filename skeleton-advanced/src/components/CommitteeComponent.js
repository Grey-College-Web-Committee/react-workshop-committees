import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RoleComponent } from './RoleComponent';

export const CommitteeComponent = (props) => {
  const [committeeMetaData, setCommitteeMetaData] = useState({});
  const [committeeMembers, setCommitteeMembers] = useState([]);

  /*
  * When the selected committee is changed, request the data from the server for this committee
  * Note the dependencies of this effect are [props.committeeId], this automatically calls the effect
  * when the prop is changed!
  * 
  * We could improve this by caching the responses but this would be a very minor gain in this case,
  * the response associated with the Executive Committee is the largest and even that is only 2.4KB.
  */
  useEffect(() => {
    const loadCommittee = async () => {
      let result;

      // Use axios again to perform a GET request, the address is dynamic allowing us to select
      // different committees easily
      try {
        result = await axios.get(`https://www.greyjcr.co.uk/api/jcr/committee/${props.committeeId}`);
      } catch (error) {
        alert("Unable to load the basic committee data");
        console.log({ error });
        return;
      }

      // Destructure the results, if you look at the network traffic in Developer Tools you'll be able
      // to see that the JSON returned has two top-level keys. .data accesses the content of the response
      // rather than the additional data such as headers etc sent with the response
      const { committee, committeeMembers: roles } = result.data;

      // This line does two things:
      // 1. Sort the roles by their position on the committee (e.g. we want Pres -> FACSO -> VP -> ...)
      // as the order for the Executive Committee, this is done using the position attribute
      // 2. We then discard the metadata about the role (such as the position in the committee) and map
      // directly to the attribute that we are interested in
      const destructuredRoles = roles.sort((a, b) => a.position - b.position).map(entry => entry.JCRRole);

      // Update the state, automatically triggering a re-render
      setCommitteeMembers(destructuredRoles);
      setCommitteeMetaData(committee);
    }

    // We can't use the async keyword with useEffect because we can't block the rendering process.
    // Instead, since React will render when the state is updated, we don't even need to block.
    // Just let the function run and once it is done React will do the rest for us.
    loadCommittee();
  }, [props.committeeId])

  // Display the name and description of the committee
  const displayCommitteeMetaData = () => {
    const { name, description } = committeeMetaData;

    return (
      <>
        <h2>{name}</h2>
        <p>{description}</p>
      </>
    )
  }

  /*
  * .map is a key function when working with React, it lets you produce dynamic HTML when the size
  * of the response is not predetermined. It is important to include the 'key' attribute otherwise
  * you will get rendering artifacts (try it, you'll see the images aren't removed until the new
  * ones are fetched from the server causing inaccurate results).
  * 
  * We pass data to the RoleComponent in the form of props just like we did with the component.
  */
  const displayCommitteeMembers = () => (
    <div className="committee-members">
      {
        committeeMembers.map((role, i) => {
          // No users => role is currently vacant
          if(role.JCRRoleUserLinks.length === 0) {
            return (
              <RoleComponent
                key={`${role.name}`}
                name={role.name}
                description={role.description}
                email={role.email}
                vacant={true}
              />
            )
          } else {
            // We have to map again as there can be multiple people in a role
            // e.g. 2 Senior Welfare Officers
            return (
              role.JCRRoleUserLinks.map((member, j) => (
                <RoleComponent
                  key={`${role.name}-${j}`}
                  name={role.name}
                  description={role.description}
                  email={role.email}
                  vacant={false}
                  holderFirstNames={member.User.firstNames}
                  holderSurname={member.User.surname}
                  holderProfilePicture={member.User.profilePicture}
                />
              ))
            )
          }
        })
      }
    </div>
  )

  // Put it all together and display it in a div
  return (
    <div className="committee-container">
      { displayCommitteeMetaData() }
      { displayCommitteeMembers() }
    </div>
  )
}

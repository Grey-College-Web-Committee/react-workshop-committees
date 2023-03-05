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
      /*
      * You will need to use axios to fetch the data from the server.
      * The data can be retrieved via a GET request from https://www.greyjcr.co.uk/api/jcr/committee/{committeeId}
      * For example, try opening https://www.greyjcr.co.uk/api/jcr/committee/1 in your browser
      */
      let result;

      // Use axios again to perform a GET request, the address is dynamic allowing us to select
      // different committees easily. You can see an example of an 
      try {
        // [TODO]: result = ?
      } catch (error) {
        alert("Unable to load the basic committee data");
        console.log({ error });
        return;
      }

      // Once you have fetched the data, you'll need to destructure the results.
      // If you look at the network traffic in Developer Tools you'll be able to see
      // that the JSON returned has two top-level keys. .data accesses the content of 
      // the response rather than the additional data such as headers etc sent with the response

      // [TODO]: Destructure the results
      
      // This line does two things:
      // 1. Sort the roles by their position on the committee (e.g. we want Pres -> FACSO -> VP -> ...)
      // as the order for the Executive Committee, this is done using the position attribute
      // 2. We then discard the metadata about the role (such as the position in the committee) and map
      // directly to the attribute that we are interested in

      // [TODO]: Uncomment the line below once you have the data
      // const destructuredRoles = roles.sort((a, b) => a.position - b.position).map(entry => entry.JCRRole);

      // [TODO]: Finally, can you update the state and trigger a re-render
    }

    // We can't use the async keyword with useEffect because we can't block the rendering process.
    // Instead, since React will render when the state is updated, we don't even need to block.
    // Just let the function run and once it is done React will do the rest for us.
    loadCommittee();
  }, [props.committeeId])

  /*
  * Can you display the name and description of the committee?
  */
  const displayCommitteeMetaData = () => {
    return (
      <>
        <h2>[Committee Name]</h2>
        <p>[Committee Description]</p>
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
          // [TODO] No users => role is currently vacant, can you use the RoleComponent to display
          // a vacant role?
          if(role.JCRRoleUserLinks.length === 0) {
            return (
              <></>
            )
          } else {
            // [TODO] Can you use the RoleComponent to display the person who is in the role?
            // We have to map again as there can be multiple people in a role
            // e.g. 2 Senior Welfare Officers
            return (
              role.JCRRoleUserLinks.map((member, j) => (
                <></>
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

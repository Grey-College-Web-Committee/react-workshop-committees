import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CommitteeComponent } from '../components/CommitteeComponent';
import { LoadingHolder } from '../components/common/LoadingHolder';

export const CommitteePage = () => {
  const [allCommitteesData, setAllCommitteesData] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState(1);

  /*
  * This useEffect is called when the page loads. It loads all of basic data (id and name)
  * for each committee. We can then use this information to fetch further information about
  * the committees individually when we need it (see ../components/CommitteeComponent.js)
  */
  useEffect(() => {
    const loadInitialData = async () => {
      let result;

      // axios is a common npm package that lets us fetch data from a source
      // In this case, we perform a GET request to the main website
      try {
        result = await axios.get("https://www.greyjcr.co.uk/api/jcr/committees/basic");
      } catch (error) {
        // Should the request fail you will be notified by an alert box and the actual error
        // will be logged to the developer console
        alert("Unable to load the basic committee data");
        console.log({ error });
        return;
      }
  
      // Update the state, React will automatically re-render for us
      setAllCommitteesData(result.data.committees);
    }

    loadInitialData();
  }, []);

  // This is called when the selected item in the select input is changed
  const updateSelectedCommittee = (event) => {
    setSelectedCommittee(event.target.value);
  }

  // If we don't have any data then display a loading spinner while we wait for it be fetched
  if(allCommitteesData.length === 0) {
    return (
      <LoadingHolder />
    )
  }

  // Display the content for the page
  // The committee dynamically updates when you select a different committee from the dropdown
  return (
    <div className="lg:committee-page committee-page">
      <h1>Committees</h1>
      <p>Select the committee from the dropdown below and it will automatically display below!</p>
      <div className="aligned-input">
        <span>Committee:</span>
        <select
          className="select-committee"
          onChange={updateSelectedCommittee}
        >
          {
            allCommitteesData.map((committee, i) => (
              <option 
                key={i}
                value={committee.id}
              >{committee.name}</option>
            ))
          }
        </select>
      </div>
      <div>
        <CommitteeComponent
          committeeId={selectedCommittee}
        />
      </div>
    </div>
  )
}

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
      // We first retrieve the data from the server, try clicking the link to see the raw data 
      // axios is a common npm package that lets us fetch data from a source
      // In this case, we perform a GET request to the main website
      // API: https://www.greyjcr.co.uk/api/jcr/committees/basic
      // You'll need to use axios and set the allCommitteesData state
    }

    loadInitialData();
  }, []);

  // This is called when the selected item in the select input is changed
  const updateSelectedCommittee = (event) => {
    // Need to update the selectedCommittee state here
    // Find out some more about what is returned in the event argument
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
            // [TODO]: Can you display all of the returned committees?
            // You'll need to loop all of the committees and display an <option>
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

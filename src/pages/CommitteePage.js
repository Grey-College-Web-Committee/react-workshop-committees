import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CommitteeComponent } from '../components/CommitteeComponent';
import { LoadingHolder } from '../components/common/LoadingHolder';

export const CommitteePage = () => {
  const [allCommitteesData, setAllCommitteesData] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState(1);

  useEffect(() => {
    const loadInitialData = async () => {
      let result;

      try {
        result = await axios.get("https://www.greyjcr.co.uk/api/jcr/committees/basic");
      } catch (error) {
        alert("Unable to load the basic committee data");
        console.log({ error });
        return;
      }
  
      setAllCommitteesData(result.data.committees);
    }

    loadInitialData();
  }, []);

  const updateSelectedCommittee = (event) => {
    setSelectedCommittee(event.target.value);
  }

  if(allCommitteesData.length === 0) {
    return (
      <LoadingHolder />
    )
  }

  return (
    <div className="lg:committee-page committee-page">
      <h1>Committees</h1>
      <p>Select the committee from the dropdown below and it will automatically display below!</p>
      <p>Selected: {selectedCommittee}</p>
      <div>
        <span>Committee:</span>
        <select
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

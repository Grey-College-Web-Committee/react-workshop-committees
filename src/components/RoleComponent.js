import React from 'react'

export const RoleComponent = (props) => {
  const displayProfilePicture = () => {
    let url = "";

    // If they don't have a profile picture or the role is vacant, use a default image
    // Otherwise we select their actual profile picture for display
    if(!props.holderProfilePicture || props.vacant) {
      url = "https://www.greyjcr.co.uk/images/default_avatar.png";
    } else {
      url = `https://www.greyjcr.co.uk/uploads/images/profile/${props.holderProfilePicture}`;
    }

    // Lazy load the images, this is a non-blocking technique that makes the page usable earlier
    return (
      <img 
        className="profile-picture"
        alt="Role Holder"
        src={url}
        loading={'lazy'}
      />
    )
  }

  const displayName = () => {
    // If the role is vacant there are no names to process
    if(props.vacant) {
      return (
        <span>Vacant</span>
      )
    }
    
    /* 
    There are two formats of names on the website. For users who signed up prior to the University
    removing our access to student data, their names are in block captials and includes middle names
    in a comma-separated list. 

    For users who signed up post-data removal, it could be in any format that they typed it in.
    */
    let firstName = props.holderFirstNames;

    // Don't display middle names
    if(firstName.includes(",")) {
      firstName = firstName.split(",")[0];
    }

    // Capitalise the first letter and lowercase the rest
    // Doesn't handle cases such as McDonald -> Mcdonald
    const basicCasingFix = (str) => str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();

    firstName = basicCasingFix(firstName);
    const surname = basicCasingFix(props.holderSurname)

    return (
      <span>{firstName} {surname}</span>
    )
  }

  // Display the data about the role along with the profile picture
  return (
    <div className="centred-column role-container">
      { displayProfilePicture() }
      <div className="role-details">
        <span className="role-name">{props.name}</span>
        { displayName() }
      </div>
    </div>
  )
}

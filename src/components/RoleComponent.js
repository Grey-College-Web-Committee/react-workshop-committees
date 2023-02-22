import React from 'react'

export const RoleComponent = (props) => {
  const displayProfilePicture = () => {
    let url = `https://www.greyjcr.co.uk/uploads/images/profile/${props.holderProfilePicture}`;

    if(!props.holderProfilePicture) {
      url = "https://www.greyjcr.co.uk/images/default_avatar.png";
    }

    

    return (
      <img 
        className="profile-picture"
        alt="Role Holder"
        src={url}
        loading={'lazy'}
      />
    )
  }

  return (
    <div className="centred-column role-container">
      { displayProfilePicture() }
      <div className="role-name">
        <span>{props.name}</span>
        <span>{props.holderFirstNames} {props.holderSurname}</span>
      </div>
    </div>
  )
}

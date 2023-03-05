import React from 'react'

export const RoleComponent = (props) => {
  const displayProfilePicture = () => {
    /*
    * This function currently loads a placeholder picture.
    * Can you load the profile picture from the website and display it on the page?
    * You need to consider a couple of things:
    * 1. What if the user does not have a profile picture set?
    * 2. What if the role is currently vacant?
    * 3. What information do you need to retrieve a profile picture? (Hint: Look at the GET response in the CommitteeComponent)
    * The website provides a default picture at: https://www.greyjcr.co.uk/images/default_avatar.png
    * Actual pictures can be retrieved from https://www.greyjcr.co.uk/uploads/images/profile/<picture_id>
    */

    // Lazy load the images, this is a non-blocking technique that makes the page usable earlier
    return (
      <img 
        className="profile-picture"
        alt="Role Holder"
        src="https://www.greyjcr.co.uk/images/default_avatar.png"
        loading={'lazy'}
      />
    )
  }

  const displayName = () => {
    /*
    * This function currently display 'TODO' in place of the name.
    * Can you display the name of the actual person(s) who hold the role?
    * You'll again need to consider:
    * 1. What if the role is currently vacant?
    * 2. What if the name has middle names? (Hint: just display them without worrying about this to start!)
    * 3. Can you handle capitalisation of the names appropriately?
    */

    return (
      <span>Todo</span>
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

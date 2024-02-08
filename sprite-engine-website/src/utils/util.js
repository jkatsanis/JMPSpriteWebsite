export function Link({ icon, content, website }) {
    return (
      <div className="centered-div">
        <h1>Get started now</h1>
        <a href={website} target="_blank">
          <img src={icon} alt="Icon" width="30" height="30"/>
          <span className="link">{content}</span>
        </a>
      </div>
    );
  }
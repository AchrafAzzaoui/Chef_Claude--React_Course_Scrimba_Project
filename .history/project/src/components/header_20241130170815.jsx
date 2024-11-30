import chefClaudeIcon from "../assets/chef_claude_icon.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={chefClaudeIcon} alt="Chef Claude Icon" />
      </div>
      <div className="title">
        <h2>Chef Claude</h2>
      </div>
    </header>
  );
}

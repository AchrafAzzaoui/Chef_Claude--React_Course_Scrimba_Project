import chefClaudeIcon from "../assets/chef_claude_icon.svg";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src={chefClaudeIcon} alt="Chef Claude Icon" />
      </div>
      <div className="title">
        <h1>Chef Claude</h1>
      </div>
    </header>
  );
}

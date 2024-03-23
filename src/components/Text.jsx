import { Link } from "react-router-dom"

export const TextLink = ({ to, text, linkText, textColor = 'text-[#095D78]', hoverColor = 'hover:text-[#0D7A9D]' }) => {
  return (
    <p className={`text-sm text-gray-300 ${textColor}`}>
      {text} 
      <Link to={to} className={`${textColor} font-bold underline ${hoverColor}`}> {linkText}</Link>
    </p>
  )
}

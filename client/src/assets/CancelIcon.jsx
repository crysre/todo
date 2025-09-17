function CancelIcon({className, onClick, name}){
    return <svg
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
  className={className}
  onClick={onClick}
  name={name}
>
  <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
  <path d="M12 10l4 4m0 -4l-4 4" />
</svg>

}

export default CancelIcon;
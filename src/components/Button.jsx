import PropTypes from 'prop-types';

export default function Button({ label, Icon, bgHoverColor, borderColor, textColor, handleClick, visibleContent }){

  return (
      <button
        name={label.toLowerCase()}
        onClick={() => handleClick && handleClick(label.toLowerCase())} 
        className={`flex-1 hover:${bgHoverColor} active:${bgHoverColor} border-b-2 ${borderColor} ${visibleContent[label.toLowerCase()]} ? bgHoverColor : '' ${textColor} font-bold rounded-t-lg p-3 flex items-center justify-center gap-2`}
        
      >
        <span className="text-2xl">
          <Icon />
        </span>
        {label}
      </button>
    );
};

Button.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  bgHoverColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  visibleContent: PropTypes.shape({
    readme: PropTypes.bool,
    code: PropTypes.bool,
    dependency: PropTypes.bool,
    dependents: PropTypes.bool,
    versions: PropTypes.bool,
  }).isRequired,
};
  

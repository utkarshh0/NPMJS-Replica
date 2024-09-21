import PropTypes from 'prop-types';

export default function Button({ label, Icon, handleClick, styles }){

  return (
      <button
        name={label.toLowerCase()}
        onClick={() => handleClick && handleClick(label.toLowerCase())} 
        className={` ${styles} flex-1 border-b-2 font-bold rounded-t-lg p-3 flex items-center justify-center gap-2`}
        
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
  styles: PropTypes.string,
  Icon: PropTypes.elementType.isRequired,
  
};
  

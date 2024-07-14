const CheckBox = ({ title, onChange }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <input 
          id={`checkbox-${title}`} 
          type="checkbox" 
          value={title} 
          onChange={onChange} 
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={`checkbox-${title}`} className="ml-2 text-sm font-medium text-gray-900">
          {title}
        </label>
      </div>
    </div>
  );
};

export default CheckBox;

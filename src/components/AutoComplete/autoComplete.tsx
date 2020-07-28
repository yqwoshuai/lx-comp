import React, { useState, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "../Input/input";
import Icon from '../Icon/icon'
interface DataSource {
  value?: string;
}

export type DataSourceType<T = {}> = T & DataSource;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading,setLoading] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          setLoading(false)
          setSuggestions(data);
        }).catch(()=> {
          
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const searchDropDown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                handleSelect(item);
              }}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="lx-comp-auto-complete" {...restProps}>
      <Input value={inputValue} onChange={handleChange}></Input>
      {loading && <Icon icon="spinner" spin></Icon>}
      {suggestions.length > 0 && searchDropDown()}
    </div>
  );
};

export default AutoComplete;

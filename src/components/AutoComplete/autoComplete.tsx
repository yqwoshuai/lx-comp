import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import classNames from "classnames";
import useDebounce from "../../hooks/usedebounce";
import useClickOutSide from "../../hooks/useClickOutSide";
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
  const [loading, setLoading] = useState(false);
  const [highLight, setHighLight] = useState(-1);
  const canGoSearch = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceValue = useDebounce(inputValue, 800);
  useClickOutSide(wrapperRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debounceValue && canGoSearch.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results
          .then((data) => {
            setLoading(false);
            setSuggestions(data);
          })
          .catch(() => {});
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceValue, fetchSuggestions]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    canGoSearch.current = true;
  };
  const changeHighLight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighLight(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestions[highLight]) {
          handleSelect(suggestions[highLight]);
        }
        break;
      //上箭头
      case 38:
        changeHighLight(highLight - 1);
        break;
      //下箭头
      case 40:
        changeHighLight(highLight + 1);
        break;
      // ESC
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    canGoSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const searchDropDown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const subClassNames = classNames("suggestion-item", {
            "item-highLighted": highLight === index,
          });
          return (
            <li
              key={index}
              onClick={() => {
                handleSelect(item);
              }}
              className={subClassNames}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="lx-comp-auto-complete" {...restProps} ref={wrapperRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></Input>
      {loading && <Icon icon="spinner" spin></Icon>}
      {suggestions.length > 0 && searchDropDown()}
    </div>
  );
};

export default AutoComplete;

import { IconButtonProps, TextFieldProps } from '@mui/material';
import { GridProps } from '@mui/system';
import { IColor, IHComponents } from '../HTable';

export type ISearchOptions = {
  searchInputProps?: TextFieldProps;
  clearBtnProps?: (searchText: string) => IconButtonProps | IconButtonProps;
  searchPlaceholder?: string;
  searchInputContainerProps?: GridProps;
  searchBtnProps?: (searchText: string) => IconButtonProps | IconButtonProps;
  onClearSearch?: (searchText: string) => void;
  onSearchClick?: (searchText: string) => void;
};

export type SearchBarProps = {
  searchOptions?: ISearchOptions;
  color?: IColor;
  searchText: string;
  setSearchTextValue: (searchText: string) => void;
  components: IHComponents;
};

export * from './SearchBar';
export { default } from './SearchBar';

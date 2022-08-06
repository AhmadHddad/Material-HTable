import { IconButtonProps, TextFieldProps } from '@mui/material';
import { GridProps } from '@mui/system';
import { IColor, IHTableComponents } from '../HTable';

export type ISearchOptions = {
  searchInputProps?: TextFieldProps;
  clearBtnProps?: (searchText: string) => IconButtonProps | IconButtonProps;
  searchPlaceholder?: string;
  searchInputContainerProps?: GridProps;
  searchBtnProps?: (searchText: string) => IconButtonProps | IconButtonProps;
  onClearSearch?: (searchText: string) => void;
  onSearchClick?: (searchText: string) => void;
};

export type HTableSearchBarProps = {
  searchOptions?: ISearchOptions;
  color?: IColor;
  searchText: string;
  setSearchTextValue: (searchText: string) => void;
  components: IHTableComponents;
};

export * from './HTableSearchBar';
export { default } from './HTableSearchBar';

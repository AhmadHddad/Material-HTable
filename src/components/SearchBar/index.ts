import {IconButtonProps, TextFieldProps} from "@mui/material";
import {GridProps} from "@mui/system";
import {IColor, IHComponents} from "components/HTable";

export type SearchBarProps = {
    searchOptions?: {
        searchInputProps?: TextFieldProps;
        clearBtnProps?: (searchText: string) => IconButtonProps | IconButtonProps;
        searchPlaceholder?: string;
        searchInputContainerProps?: GridProps;
        searchBtnProps?: (searchText: string) => IconButtonProps | IconButtonProps;
        onClearSearch?: (searchText: string) => void;
        onSearchClick?: (searchText: string) => void;
    };
    color?: IColor;
    searchText: string;
    setSearchTextValue: (searchText: string) => void;
    components: IHComponents;
};

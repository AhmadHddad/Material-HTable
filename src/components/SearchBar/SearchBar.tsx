import React from 'react';
import { ISearchOptions, SearchBarProps } from '.';
import { returnObjFromFunc, toObject } from '../../utils';


export default function SearchBar({ searchOptions, color, searchText, setSearchTextValue, components }: SearchBarProps) {
    const { SearchIcon, Grid, TextField, IconButton, ClearIcon } = components;
    const {
        searchInputProps,
        clearBtnProps,
        searchPlaceholder,
        searchInputContainerProps,
        searchBtnProps,
        onClearSearch,
        onSearchClick
    } = toObject(searchOptions) as ISearchOptions;

    return (
        <React.Fragment>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSearchClick?.(searchText);
                }}
            >
                <Grid
                    container
                    item
                    padding={1}
                    justifyContent={"flex-start"}
                    {...toObject(searchInputContainerProps)}
                >
                    <TextField
                        variant="standard"
                        placeholder={searchPlaceholder || "Search"}
                        color={color}
                        onChange={(e) => setSearchTextValue(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <IconButton
                                    title="Clear"
                                    type="submit"
                                    aria-label="Clear"
                                    size="small"
                                    onClick={function () {
                                        onSearchClick?.(searchText);
                                    }}
                                    {...returnObjFromFunc(searchBtnProps, searchText)}
                                >
                                    <SearchIcon fontSize="small" />
                                </IconButton>
                            ),
                            endAdornment: (
                                <IconButton
                                    title="Clear"
                                    aria-label="Clear"
                                    size="small"
                                    onClick={() => {
                                        setSearchTextValue("");
                                        onClearSearch?.(searchText);
                                    }}
                                    style={{ visibility: searchText ? "visible" : "hidden" }}
                                    {...returnObjFromFunc(clearBtnProps, searchText)}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            )
                        }}
                        {...returnObjFromFunc(searchInputProps)}
                    />
                </Grid>
            </form>
        </React.Fragment>
    );
}

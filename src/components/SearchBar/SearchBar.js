import React from 'react';
import { returnObjFromFunc, toObject } from 'utils';


export default function SearchBar({ searchOptions, searchText, setSearchTextValue, components }) {
    const { SearchIcon, Grid, TextField, IconButton, ClearIcon } = components;
    const {
        searchInputProps,
        clearBtnProps,
        searchPlaceholder,
        searchInputContainerProps,
        searchBtnProps,
        onClearSearch,
        onSearchClick
    } = toObject(searchOptions);

    const SearchIcn = <SearchIcon fontSize="small" />;
    return (
        <React.Fragment>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSearchClick?.(searchText);
                }}
            >
                <Grid
                    container
                    item
                    padding={1}
                    justifyContent={"flex-start"}
                    {...searchInputContainerProps}
                >
                    <TextField
                        variant="standard"
                        placeholder={searchPlaceholder || "Search"}
                        onChange={e => setSearchTextValue(e.target.value)}
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
                                    {SearchIcn}
                                </IconButton>
                            ),
                            endAdornment: (
                                <IconButton
                                    title="Clear"
                                    aria-label="Clear"
                                    size="small"
                                    onClick={() => {
                                        setSearchTextValue("");
                                        onClearSearch?.();
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
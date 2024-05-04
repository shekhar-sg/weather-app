"use client";
import {type UIEvent, useCallback, useEffect, useMemo, useRef, useState,} from "react";
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_RowVirtualizer,
    type MRT_SortingState,
    useMaterialReactTable,
} from "material-react-table";
import {IconButton, Stack, Typography} from "@mui/material";
import {GeoLocationLIstAPI} from "@/apiTypes/geo-location-list-api.type";
import useSWRInfinite from "swr/infinite";
import {fetcher} from "@/utils/swr";
import {geoLocationPath} from "@/constant";
import Link from "next/link";
import {BookmarkAdded, BookmarkBorder} from "@mui/icons-material";
import {useAppConfig} from "@c/layout";

const GeoLocationTable = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [sorting, setSorting] = useState<MRT_SortingState>([
        {
            id: "name",
            desc: false,
        },
    ]);

    const {data, isLoading, size, setSize, isValidating, error} =
        useSWRInfinite<GeoLocationLIstAPI>((pageIndex) => {
            return geoLocationPath({
                limit: fetchSize,
                offset: pageIndex * fetchSize,
                order_by: sorting
                    .map((sort) => `${sort.id} ${sort.desc ? "DESC" : "ASC"}`)
                    .join(","),
                select: columns.map((column) => column.accessorKey).join(","),
                where: globalFilter
                    ? `search(*,"${globalFilter}")`
                    : columnFilters
                        ? columnFilters
                            .map((filter) => {
                                return `search(${filter.id},"${filter.value}")`;
                            })
                            .join(" AND ")
                        : "",
            });
        }, fetcher);

    const flatData = useMemo(
        () => data?.flatMap((page) => page.results) ?? [],
        [data],
    );

    const totalDBRowCount = data?.[0]?.total_count ?? 0;
    const totalFetched = flatData.length;

    useEffect(() => {
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting, columnFilters, globalFilter]);

    const fetchMoreOnBottomReached = useCallback(
        async (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const {scrollHeight, scrollTop, clientHeight} = containerRefElement;
                if (
                    scrollHeight - scrollTop - clientHeight < 400 &&
                    !isValidating &&
                    totalFetched < totalDBRowCount
                ) {
                    await setSize(size + 1);
                }
            }
        },
        [isValidating, totalFetched, totalDBRowCount, setSize, size],
    );

    const table = useMaterialReactTable({
        columns,
        data: flatData,
        enablePagination: false,
        enableRowNumbers: true,
        enableRowVirtualization: true,
        manualFiltering: true,
        manualSorting: true,
        muiTableContainerProps: {
            ref: tableContainerRef,
            sx: {
                maxHeight: "600px",
            },
            onScroll: (event: UIEvent<HTMLDivElement>) =>
                fetchMoreOnBottomReached(event.target as HTMLDivElement), //add an event listener to the table container element
        },
        muiToolbarAlertBannerProps: error
            ? {
                color: "error",
                children: "Error loading data",
            }
            : undefined,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        renderTopToolbarCustomActions: () => (
            <Typography>
                Fetched {totalFetched} of {totalDBRowCount} total rows.
            </Typography>
        ),
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            showAlertBanner: error,
            showProgressBars: isValidating,
            sorting,
        },
        initialState: {
            sorting: [{id: "name", desc: false}],
        },
        rowVirtualizerInstanceRef,
        rowVirtualizerOptions: {overscan: 4},
    });

    return <MaterialReactTable table={table}/>;
};

export default GeoLocationTable;

const columns: MRT_ColumnDef<GeoLocationLIstAPI["results"][number]>[] = [
    {
        accessorKey: "name",
        header: "City Name",
        Cell: ({renderedCellValue, row}) => {
            const {coordinates, name} = row.original;
            const {lat, lon} = coordinates;
            const {toggleBookmark, bookMarks} = useAppConfig();
            const isBookmarked = bookMarks.some((b) => b.name === name);
            return (
                <Stack direction={"row"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography
                        variant={"body2"}
                        component={Link}
                        href={`${lat},${lon}`}
                        sx={{
                            color: "lightblue",
                            cursor: "pointer",
                        }}
                    >
                        {renderedCellValue}
                    </Typography>
                    <IconButton
                        onClick={() => {
                        toggleBookmark({name, coordinates})
                    }}
                        title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                    >
                        {isBookmarked ?
                            <BookmarkAdded/>
                            : <BookmarkBorder/>}
                    </IconButton>
                </Stack>
            );
        },
    },
    {
        accessorKey: "cou_name_en",
        header: "Country Name",
    },
    {
        accessorKey: "timezone",
        header: "Timezone",
    },
    {
        accessorKey: "country_code",
        header: "Country Code",
    },
    {
        accessorKey: "coordinates",
        accessorFn: (row) => `${row.coordinates.lat}, ${row.coordinates.lon}`,
        header: "Coordinates",
        enableColumnFilter: false,
    },
];

const fetchSize = 25;

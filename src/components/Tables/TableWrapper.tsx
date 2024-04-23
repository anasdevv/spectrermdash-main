import {
  Box,
  IconButton,
  Tab,
  TablePagination,
  Tabs,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Search } from '@mui/icons-material';

interface TableWrapperProps {
  ourData?: any;
  setData: any;
  title?: string;
  isTabs?: boolean;
  tabOptions?: string[];
  value?: string;
  handleChange?: (event: React.SyntheticEvent, newValue: string) => void;
  children: React.ReactNode;
  count: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allData?: any;
  handleSearchChange: any;
  placeholder?: string;
}

const TableWrapper = ({
  title,
  isTabs = false,
  tabOptions,
  value,
  handleChange,
  count,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  children,
  handleSearchChange,
  placeholder
}: TableWrapperProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
      <div className="flex justify-between items-center mb-6">
        {!isTabs ? (
          <h6 className="text-xxs font-semibold text-black dark:text-white">
            {title}
          </h6>
        ) : (
          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange}>
              {tabOptions?.map((item, index) => (
                <Tab key={index} value={item} label={item} />
              ))}
            </Tabs>
          </Box>
        )}

        <div className="flex items-end mb-5 w-[250px]">
          <TextField
            name="search"
            placeholder={placeholder || 'Search...'}
            fullWidth
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value)
              handleSearchChange?.(event.target.value)
            }}
            inputProps={{ style: { fontSize: '12px' } }}
            InputLabelProps={{ style: { fontSize: '12px' } }}
            variant="standard"
          />
          <IconButton style={{ padding: 1 }}>
            <Search />
          </IconButton>
        </div>
      </div>

      {children}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};

export default TableWrapper;

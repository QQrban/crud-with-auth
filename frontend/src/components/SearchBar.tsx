import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
	<Paper
		component="form"
		className='flex items-center absolute z-2'
	>
		<InputBase
			sx={{ ml: 1, flex: 1 }}
			placeholder="Search..."
			inputProps={{ 'aria-label': 'search database' }}
		/>
		<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
			<SearchIcon />
		</IconButton>
	</Paper>
  );
}

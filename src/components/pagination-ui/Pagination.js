import React from 'react';

const Pagination = props => {

	const itemPerPage = props.itemPerPage || 5;

	if (props.totalItems <= itemPerPage) {
		return null;
	}

	const range = [];
	for (let i = 0; i < Math.ceil(props.totalItems / itemPerPage); ++i) {
		range.push(i);
	}

	const setPage = page => props.onSetPage(page);

	return (
		<nav>
			<ul className="pagination">

				{
					range.map(v => {
						const isCurrent = v === props.currentPage;
						const onClick = ev => {
							ev.preventDefault();
							setPage(v + 1);
						};
						return (
							<li
								className={
								isCurrent ? 'pagination__page-item pagination__page-item--active':'pagination__page-item'
								 }
								onClick={onClick}
								key={v.toString()}>

								<a className="pagination__page-link" href="">{v + 1}</a>

							</li>
						);
					})
				}

			</ul>
		</nav>
	);
};

export default Pagination;
import React from 'react';
import '../Search.css'
import axios from 'axios';
import Loader from '../loader.gif';
import PageNavigation from './PageNavigation';
class Search extends  React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			query: '',
                        results: {},
                        loading: false,
                        message: '',
						loading: false,
						totalResults: 0,
						totalPages: 0,
						currentPageNo: 0,
		};
		this.cancel = '';

	}
	
	getPagesCount = (total, denominator) => {
	const divisible = total % denominator === 0;
	const valueToBeAdded = divisible ? 0 : 1;
	return Math.floor(total / denominator) + valueToBeAdded;
	};
	
	fetchSearchResults = (updatedPageNo = '', query ) => {
	const pageNo = updatedPageNo ? `&pageNo=${updatedPageNo}` : '';
	// By default the limit of results is 10
	const searchUrl = `http://localhost:8080/findCustomer?lastName=${query}${pageNo}`;
	//const searchUrl = `http://localhost:8080/findCustomer?lastName=${query}`;
	if (this.cancel) {
		// Cancel the previous request before making a new request
		this.cancel.cancel();
	}
	// Create a new CancelToken
	this.cancel = axios.CancelToken.source();
	axios
		.get(searchUrl, {
			cancelToken: this.cancel.token,
		})
		.then((res) => {
			const total = res.data.total;
		const totalPagesCount = this.getPagesCount( total, 10 );
		const resultNotFoundMsg = !res.data.hits.length
			? 'There are no more search results. Please try a new search.'
			: '';
		this.setState({
			results: res.data.hits,
			totalResults: res.data.total,
			currentPageNo: updatedPageNo,
			totalPages: totalPagesCount,
			message: resultNotFoundMsg,
			loading: false,
		});
		})
		.catch((error) => {
			if (axios.isCancel(error) || error) {
				this.setState({
					loading: false,
					message: 'Failed to fetch results.Please check network',
				});
			}
		});
};
	
	


	handleOnInputChange = (event) => {
	const query = event.target.value;
            if ( ! query ) {
		this.setState({ query, results: {}, message: '' } );
	} else {
		this.setState({ query, loading: true, message: '' }, () => {
			this.fetchSearchResults(1, query);
		});
	}
};

handlePageClick = (type) => {
	//event.preventDefault();
	const updatedPageNo =
		      'prev' === type
			      ? this.state.currentPageNo - 1
			      : this.state.currentPageNo + 1;
	if (!this.state.loading) {
		this.setState({ loading: true, message: '' }, () => {
			// Fetch previous 20 Results
			this.fetchSearchResults(updatedPageNo, this.state.query);
		});
	}
	};

renderSearchResults = () => {
	const {results} = this.state;
	if (Object.keys(results).length && results.length) {
		return (
			<div className="results-container">
				{results.map((result) => {
					return (
						<a key={result.id} href={result.previewURL} className="result-item">
							<div>{result.firstName}&nbsp;{result.lastName}</div>
						</a>
					);
				})}
			</div>
		);
	}
};

	render() {
	//const {query} = this.state;
	const { query, loading, message, currentPageNo, totalPages } = this.state;
// showPrevLink will be false, when on the 1st page, hence Prev link be shown on 1st page.
const showPrevLink = 1 < currentPageNo;
// showNextLink will be false, when on the last page, hence Next link wont be shown last page.
const showNextLink = totalPages > currentPageNo;
	console.warn(this.state);
		return (
			<div className="container">
				{/*Heading*/}
				<h2 className="heading">Acoustic assignment - full stack - Vinayak Awate</h2>

				{/*Search Input*/}
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						value={query}
						name="query"
						id="search-input"
						placeholder="Search..."
						onChange={this.handleOnInputChange}
					/>
					<i className="fa fa-search search-icon"/>
				</label>
				{/*Navigation Top*/}
<PageNavigation
	loading={loading}
	showPrevLink={showPrevLink}
	showNextLink={showNextLink}
	handlePrevClick={() => this.handlePageClick('prev')}
	handleNextClick={() => this.handlePageClick('next')}
/>
							{/*Result*/}
			{ this.renderSearchResults() }
		
	{/*Navigation Bottom*/}
<PageNavigation
	loading={loading}
	showPrevLink={showPrevLink}
	showNextLink={showNextLink}
	handlePrevClick={() => this.handlePageClick('prev')}
	handleNextClick={() => this.handlePageClick('next')}
/>			
			</div>
			)
	}
}

export default Search;
//#region Global Imports
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//#endregion Global Imports

//#region Interface Imports
import { IHomePage, IStore } from '@Interfaces';
import { Heading } from '@Components';
import { HomeActions } from '@Actions';
//#endregion Interface Imports

//#region Presentational Component
export class HomePage extends React.Component<IHomePage.IProps, IHomePage.IState> {
	
	componentDidMount() {
		this.props.FetchValues();
		console.log(this.props);
	}
	
	public render(): JSX.Element {
		return (
			<div className="title">
				Hello! {this.props['0']}
				<Heading text="World!" />
			</div>
		);
	}
}
//#endregion Presentational Component

//#endregion Container Component
const mapStateToProps = (state: IStore) => state.home;

const mapDispatchToProps = (dispatch: Dispatch) => (
	{
		Map: bindActionCreators(HomeActions.Map, dispatch),
		FetchValues: bindActionCreators(HomeActions.FetchValues, dispatch)
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
//#endregion Container Component
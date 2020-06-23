import React, { PropsWithChildren } from 'react'
import './index.scss'
import { connect } from "react-redux";
import actions from "src/store/actions/cart";
import { CombinedState, CartState } from 'src/typings';
import { RouteComponentProps } from 'react-router-dom';


interface Params {

}

type Props = PropsWithChildren<RouteComponentProps<Params>>
function Cart(props: Props) {
	return (
		<>
			Cart
		</>
	)
}

export default connect((state: CombinedState): CartState => state.cart, actions)(Cart)